"use client";
import React, { useState } from "react";

const teams = ["M80", "KRU"];
const maps = ["Ascent", "Bind", "Haven", "Split", "Lotus", "Sunset", "Icebox"];

const initialRounds = [
  {
    type: "Ban",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Ban",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Pick",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Pick",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Ban",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Ban",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
  {
    type: "Decider",
    map: "",
    by: "",
    defender: "",
    winner: "",
    score: { m80: 0, kru: 0 },
    status: "Pending",
  },
];

export default function MapBanBoard() {
  const [rounds, setRounds] = useState(initialRounds);

  const updateRound = (index, field, value) => {
    const newRounds = [...rounds];
    if (field === "scoreM80") newRounds[index].score.m80 = value;
    else if (field === "scoreKRU") newRounds[index].score.kru = value;
    else newRounds[index][field] = value;
    setRounds(newRounds);
  };

  return (
    <div className=" text-white">
      <h1 className="text-3xl font-bold mb-8 text-center neon-text">
        🗺️ Map Ban & Pick
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {rounds.map((r, idx) => (
          <div
            key={idx}
            className={`relative p-4 rounded-xl bg-black/60 backdrop-blur border border-fuchsia-500/40 shadow-[0_0_15px_rgba(255,0,255,0.5)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300`}
          >
            <h2 className="text-sm font-semibold mb-2 text-fuchsia-300 tracking-wide">
              {r.type} Map
            </h2>

            {/* Map select */}
            <label className="block text-xs text-fuchsia-400 mb-1">Maps</label>
            <select
              className="w-full rounded bg-transparent border border-cyan-500/50 px-2 py-1 mb-2 focus:ring-2 focus:ring-cyan-400 outline-none transition"
              value={r.map}
              onChange={(e) => updateRound(idx, "map", e.target.value)}
            >
              <option value="">Select</option>
              {maps.map((m) => (
                <option key={m} value={m} className="bg-[#0a001f] text-white">
                  {m}
                </option>
              ))}
            </select>

            {/* Ban/Pick By */}
            <label className="block text-xs text-fuchsia-400 mb-1">
              {r.type} By
            </label>
            <select
              className="w-full rounded bg-transparent border border-cyan-500/50 px-2 py-1 mb-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={r.by}
              onChange={(e) => updateRound(idx, "by", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t} className="bg-[#0a001f] text-white">
                  {t}
                </option>
              ))}
            </select>

            {/* Defender */}
            <label className="block text-xs text-fuchsia-400 mb-1">
              Defender
            </label>
            <select
              className="w-full rounded bg-transparent border border-cyan-500/50 px-2 py-1 mb-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={r.defender}
              onChange={(e) => updateRound(idx, "defender", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t} className="bg-[#0a001f] text-white">
                  {t}
                </option>
              ))}
            </select>

            {/* Winner */}
            <label className="block text-xs text-fuchsia-400 mb-1">
              Winner
            </label>
            <select
              className="w-full rounded bg-transparent border border-cyan-500/50 px-2 py-1 mb-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={r.winner}
              onChange={(e) => updateRound(idx, "winner", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t} className="bg-[#0a001f] text-white">
                  {t}
                </option>
              ))}
            </select>

            {/* Score */}
            <div className="flex items-center justify-between text-sm my-3">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">M80</span>
                <input
                  type="number"
                  className="w-12 rounded border border-cyan-500/40 bg-transparent text-center focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={r.score.m80}
                  onChange={(e) => updateRound(idx, "scoreM80", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400">KRU</span>
                <input
                  type="number"
                  className="w-12 rounded border border-cyan-500/40 bg-transparent text-center focus:ring-2 focus:ring-cyan-400 outline-none"
                  value={r.score.kru}
                  onChange={(e) => updateRound(idx, "scoreKRU", e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <label className="block text-xs text-fuchsia-400 mb-1">
              Status
            </label>
            <select
              className="w-full rounded bg-transparent border border-cyan-500/50 px-2 py-1 focus:ring-2 focus:ring-cyan-400 outline-none"
              value={r.status}
              onChange={(e) => updateRound(idx, "status", e.target.value)}
            >
              <option value="Pending" className="bg-[#0a001f] text-white">
                Pending
              </option>
              <option value="Completed" className="bg-[#0a001f] text-white">
                Completed
              </option>
            </select>
          </div>
        ))}
      </div>

      {/* Neon Glow CSS */}
      <style jsx>{`
        .neon-text {
          color: #fff;
          text-shadow: 0 0 10px #00fff7, 0 0 20px #ff00ff, 0 0 40px #ff00ff;
          animation: glow 3s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from {
            text-shadow: 0 0 10px #00fff7, 0 0 20px #ff00ff;
          }
          to {
            text-shadow: 0 0 25px #00fff7, 0 0 45px #ff00ff;
          }
        }
      `}</style>
    </div>
  );
}
