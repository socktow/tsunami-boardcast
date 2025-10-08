"use client";
import React, { useState } from "react";

const teams = ["M80", "KRU"];
const maps = ["Ascent", "Bind", "Haven", "Split", "Lotus", "Sunset", "Icebox"];

const initialRounds = [
  { type: "Ban", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Ban", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Pick", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Pick", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Ban", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Ban", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
  { type: "Decider", map: "", by: "", defender: "", winner: "", score: { m80: 0, kru: 0 }, status: "Pending" },
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Map Ban Setting</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {rounds.map((r, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
            <h2 className="text-sm font-semibold mb-2">{r.type} Map</h2>

            {/* Map select */}
            <label className="block text-xs text-gray-500 mb-1">Maps</label>
            <select
              className="w-full rounded border px-2 py-1 mb-2 bg-transparent dark:border-zinc-700"
              value={r.map}
              onChange={(e) => updateRound(idx, "map", e.target.value)}
            >
              <option value="">Select</option>
              {maps.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Ban/Pick By */}
            <label className="block text-xs text-gray-500 mb-1">{r.type} By</label>
            <select
              className="w-full rounded border px-2 py-1 mb-2 bg-transparent dark:border-zinc-700"
              value={r.by}
              onChange={(e) => updateRound(idx, "by", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Defender */}
            <label className="block text-xs text-gray-500 mb-1">Defender</label>
            <select
              className="w-full rounded border px-2 py-1 mb-2 bg-transparent dark:border-zinc-700"
              value={r.defender}
              onChange={(e) => updateRound(idx, "defender", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Winner */}
            <label className="block text-xs text-gray-500 mb-1">Winner</label>
            <select
              className="w-full rounded border px-2 py-1 mb-2 bg-transparent dark:border-zinc-700"
              value={r.winner}
              onChange={(e) => updateRound(idx, "winner", e.target.value)}
            >
              <option value="">Select</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Score */}
            <div className="flex items-center justify-between text-sm my-2">
              <div className="flex items-center gap-2">
                <span>M80</span>
                <input
                  type="number"
                  className="w-12 rounded border px-1 py-0.5 text-center dark:border-zinc-700 bg-transparent"
                  value={r.score.m80}
                  onChange={(e) => updateRound(idx, "scoreM80", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span>KRU</span>
                <input
                  type="number"
                  className="w-12 rounded border px-1 py-0.5 text-center dark:border-zinc-700 bg-transparent"
                  value={r.score.kru}
                  onChange={(e) => updateRound(idx, "scoreKRU", e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <select
              className="w-full rounded border px-2 py-1 bg-transparent dark:border-zinc-700"
              value={r.status}
              onChange={(e) => updateRound(idx, "status", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
