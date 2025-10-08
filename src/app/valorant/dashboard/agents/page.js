"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import agents from "./agents.json";
import JsonOutput from "./JsonOutput";
import { useWebSocket } from "@/app/context/WebSocketContext";
const teams = {
  G2: ["ETHAN", "MADA", "SOM", "BRAWK", "SKUBA"],
  Leviatan: ["KAAJAK", "ALFAJER", "CHRONICLE", "CRASHIES", "BOASTER"],
};

const roleColors = {
  Duelist: "border-pink-500 shadow-[0_0_10px_#ff007a50]",
  Controller: "border-green-400 shadow-[0_0_10px_#00ff7f50]",
  Sentinel: "border-yellow-400 shadow-[0_0_10px_#fff17650]",
  Initiator: "border-cyan-400 shadow-[0_0_10px_#00e0ff50]",
};

export default function AgentPickPage() {
  const defaultPicks = {};
  Object.values(teams)
    .flat()
    .forEach((player) => {
      defaultPicks[player] = { agent: "", role: "", status: "picking" };
    });

  const [picks, setPicks] = useState(defaultPicks);
  const [status, setStatus] = useState("paused");
  const [gameTime, setGameTime] = useState(180);
  const [activeTab, setActiveTab] = useState("pick");
  const intervalRef = useRef(null);
  const wsRef = useRef(null);

  const { ws, isConnected } = useWebSocket();
  useEffect(() => {
    if (isConnected && ws) {
      console.log("🔗 Using shared WebSocket connection");
    }
  }, [isConnected, ws]);

  useEffect(() => {
    if (status === "running" && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setGameTime((prev) => {
          const next = prev > 0 ? prev - 1 : 0;
          if (next === 0) setStatus("stopped");
          return next;
        });
        sendJsonData();
      }, 1000);
    } else if (status !== "running" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, picks, gameTime]);

  const generateJsonData = () => ({
    matchDetail: {
      gameTotal: 3,
      teamA_Score: 1,
      teamB_Score: 2,
      teamA_Name: "NRG",
      teamB_Name: "Fnatic",
      teamA_Color: "#1E90FF",
      teamB_Color: "#FF4C4C",
      teamA_Logo: "/valorant/teamlogo/nrg.png",
      teamB_Logo: "/valorant/teamlogo/fnatic.webp",
      gameTime,
      gameStatus: status,
    },
    mapPicked: "ASCENT",
    teamA: {
      name: "NRG",
      side: "DEF",
      agents: teams.G2.map((player) => ({
        player,
        agent: picks[player]?.agent || "",
        role: picks[player]?.role || "",
        status: picks[player]?.status || "picking",
      })),
    },
    teamB: {
      name: "Fnatic",
      side: "ATK",
      agents: teams.Leviatan.map((player) => ({
        player,
        agent: picks[player]?.agent || "",
        role: picks[player]?.role || "",
        status: picks[player]?.status || "picking",
      })),
    },
  });

  const sendJsonData = () => {
    if (ws && isConnected) {
      ws.send(JSON.stringify(generateJsonData()));
    }
  };

  const handlePick = (player, agent) => {
    const agentData = agents.find((a) => a.name === agent);
    setPicks((prev) => ({
      ...prev,
      [player]: { ...prev[player], agent, role: agentData?.role || "" },
    }));
  };

  const confirmPick = (player) => {
    setPicks((prev) => ({
      ...prev,
      [player]: { ...prev[player], status: "picked" },
    }));
  };

  const resetData = () => {
    setPicks(defaultPicks);
    setGameTime(180);
    setStatus("paused");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="min-h-screen text-gray-200 p-8">
      <h1 className="text-3xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_10px_#00e0ff]">
        ⚡ Agent Pick Panel
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 border-b border-cyan-800 pb-2">
        {["pick", "json"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t text-sm font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "bg-cyan-500 text-black shadow-[0_0_10px_#00e0ff]"
                : "bg-transparent text-cyan-300 hover:text-cyan-100"
            }`}
          >
            {tab === "pick" ? "Agent Pick" : "Game Data"}
          </button>
        ))}
      </div>

      {activeTab === "pick" ? (
        <>
          {/* Control buttons */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            {[
              {
                text: "Start",
                color: "emerald",
                fn: () => setStatus("running"),
              },
              { text: "Pause", color: "amber", fn: () => setStatus("paused") },
              { text: "Stop", color: "rose", fn: () => setStatus("stopped") },
              { text: "Reset", color: "sky", fn: resetData },
            ].map((b) => (
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 25px var(--tw-shadow-color)`,
                }}
                whileTap={{ scale: 0.95 }}
                key={b.text}
                onClick={b.fn}
                className={`
        relative px-6 py-2 font-bold uppercase tracking-wide rounded-xl 
        text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] 
        bg-gradient-to-br from-${b.color}-500/30 to-${b.color}-700/30
        border border-${b.color}-400/70
        hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
        hover:border-${b.color}-300
        backdrop-blur-md transition-all duration-300
      `}
                style={{
                  textShadow: `0 0 10px #fff, 0 0 20px var(--tw-shadow-color)`,
                  "--tw-shadow-color": `var(--tw-color-${b.color}-400)`,
                }}
              >
                {b.text}
              </motion.button>
            ))}

            <div className="ml-6 font-semibold text-cyan-300">
              ⏱ {gameTime}s | Status:{" "}
              <span
                className={
                  status === "running"
                    ? "text-emerald-400"
                    : status === "paused"
                    ? "text-amber-400"
                    : "text-rose-400"
                }
              >
                {status}
              </span>
            </div>
          </div>

          {/* Teams */}
          {Object.entries(teams).map(([teamName, players]) => (
            <div key={teamName} className="mb-10">
              <h2 className="text-xl mb-3 text-pink-400 drop-shadow-[0_0_6px_#ff007a]">
                {teamName}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                {players.map((player) => {
                  const pick = picks[player];
                  const borderClass = pick?.role
                    ? roleColors[pick.role]
                    : "border-zinc-600";
                  return (
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`p-4 rounded-xl border bg-[#0e0e1a]/80 backdrop-blur-sm flex flex-col items-center justify-between text-sm transition ${borderClass}`}
                      key={player}
                    >
                      <div className="font-semibold text-cyan-300 mb-2">
                        {player}
                      </div>
                      {pick.agent ? (
                        <>
                          <Image
                            src={`/valorant/agents/${pick.agent}.png`}
                            alt={pick.agent}
                            width={80}
                            height={80}
                            className="object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                          />
                          <div className="mt-2 font-semibold text-cyan-200">
                            {pick.agent}
                          </div>
                          <div className="text-xs text-gray-400">
                            {pick.role}
                          </div>
                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              pick.status === "picked"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {pick.status === "picked" ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                            {pick.status}
                          </div>
                        </>
                      ) : (
                        <div className="h-[100px] flex items-center justify-center text-gray-500">
                          No Agent
                        </div>
                      )}

                      <select
                        className="mt-3 w-full bg-[#1a1a2f] border border-cyan-700 rounded px-2 py-1 text-xs text-cyan-200 focus:ring-2 focus:ring-cyan-400"
                        value={pick.agent}
                        onChange={(e) => handlePick(player, e.target.value)}
                      >
                        <option value="">Select Agent</option>
                        {["Duelist", "Controller", "Sentinel", "Initiator"].map(
                          (role) => (
                            <optgroup key={role} label={role}>
                              {agents
                                .filter((a) => a.role === role)
                                .map((a) => (
                                  <option key={a.name} value={a.name}>
                                    {a.name}
                                  </option>
                                ))}
                            </optgroup>
                          )
                        )}
                      </select>

                      {pick.agent && pick.status === "picking" && (
                        <button
                          onClick={() => confirmPick(player)}
                          className="mt-2 w-full rounded bg-cyan-500 text-black text-xs py-1 font-semibold hover:bg-cyan-400 shadow-[0_0_10px_#00e0ff]"
                        >
                          Confirm
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      ) : (
        <JsonOutput data={generateJsonData()} />
      )}
    </div>
  );
}
