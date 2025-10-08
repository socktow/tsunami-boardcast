"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import agents from "./agents.json";
import JsonOutput from "./JsonOutput";

const teams = {
  G2: ["ETHAN", "MADA", "SOM", "BRAWK", "SKUBA"],
  Leviatan: ["KAAJAK", "ALFAJER", "CHRONICLE", "CRASHIES", "BOASTER"],
};

const roleColors = {
  Duelist: "border-red-500 bg-red-50",
  Controller: "border-green-500 bg-green-50",
  Sentinel: "border-yellow-500 bg-yellow-50",
  Initiator: "border-blue-500 bg-blue-50",
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

  // connect WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/agentpick");
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ Connected to WebSocket server");
    ws.onclose = () => console.log("❌ Disconnected from WebSocket server");
    ws.onerror = (err) => console.error("⚠️ WebSocket error:", err);

    return () => {
      ws.close();
    };
  }, []);

  // countdown + auto send JSON data
  useEffect(() => {
    if (status === "running" && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setGameTime((prev) => {
          const nextTime = prev > 0 ? prev - 1 : 0;
          if (nextTime === 0) setStatus("stopped");
          return nextTime;
        });

        // gửi JSON data mỗi giây khi running
        sendJsonData();
      }, 1000);
    } else if (status !== "running" && intervalRef.current !== null) {
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

  const generateJsonData = () => {
    return {
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
    };
  };

  const sendJsonData = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify(generateJsonData()));
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

  const handleStart = () => setStatus("running");
  const handlePause = () => setStatus("paused");
  const handleStop = () => setStatus("stopped");

  return (
    <div className="p-6 space-y-10 min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      <h1 className="text-2xl font-bold text-zinc-800">Agent Picks</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("pick")}
          className={`px-4 py-2 rounded-t font-semibold ${
            activeTab === "pick"
              ? "bg-white border border-b-0 border-zinc-300"
              : "bg-zinc-200"
          }`}
        >
          Agent Pick
        </button>
        <button
          onClick={() => setActiveTab("json")}
          className={`px-4 py-2 rounded-t font-semibold ${
            activeTab === "json"
              ? "bg-white border border-b-0 border-zinc-300"
              : "bg-zinc-200"
          }`}
        >
          Game Data
        </button>
      </div>

      {activeTab === "pick" ? (
        <>
          {/* Control Buttons */}
          <div className="flex gap-3 mb-6 items-center">
            <button
              onClick={handleStart}
              disabled={status === "running"}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={handlePause}
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Pause
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Stop
            </button>
            <button
              onClick={resetData}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Reset Data
            </button>
            <div className="ml-6 font-semibold text-lg">
              Time Left: {gameTime}s | Status: {status}
            </div>
          </div>

          {/* Team grid */}
          {Object.entries(teams).map(([teamName, players]) => (
            <div key={teamName} className="space-y-4">
              <h2 className="text-lg font-semibold">{teamName}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {players.map((player) => {
                  const pick = picks[player];
                  const roleColor = pick?.role
                    ? roleColors[pick.role]
                    : "border-zinc-200 bg-white";

                  return (
                    <motion.div
                      key={player}
                      whileHover={{ scale: 1.03 }}
                      className={`rounded-xl p-4 border shadow-sm flex flex-col items-center justify-between transition ${roleColor}`}
                    >
                      <div className="font-medium mb-2">{player}</div>
                      {pick.agent ? (
                        <>
                          <Image
                            src={`/valorant/agents/${pick.agent}.png`}
                            alt={pick.agent}
                            width={72}
                            height={72}
                            className="object-contain"
                          />
                          <div className="mt-2 text-sm font-semibold text-zinc-700">
                            {pick.agent}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {pick.role}
                          </div>
                          <div
                            className={`flex items-center gap-1 text-xs mt-1 ${
                              pick.status === "picked"
                                ? "text-green-600"
                                : "text-orange-500"
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
                        <div className="h-[90px] flex items-center justify-center text-zinc-400">
                          No Agent
                        </div>
                      )}

                      <select
                        className="mt-3 w-full rounded border px-2 py-1 text-sm"
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
                          className="mt-2 w-full rounded bg-indigo-600 text-white text-sm py-1 hover:bg-indigo-700"
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
