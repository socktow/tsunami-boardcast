"use client";
import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit3, Trash2 } from "lucide-react";

const sponsors = [
  { name: "HyperX", tier: "Title", budget: 50000 },
  { name: "SteelSeries", tier: "Gold", budget: 30000 },
  { name: "Nvidia", tier: "Silver", budget: 20000 },
];

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-8 text-white bg-gradient-to-br from-black via-[#0a001f] to-[#1b0033] relative overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,255,0.3),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(0,255,255,0.3),transparent_60%)] animate-pulse" />

      {/* header */}
      <div className="relative flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
          Sponsors
        </h1>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_35px_rgba(0,255,255,0.6)] transition-all"
        >
          <PlusCircle size={18} />
          Add Sponsor
        </motion.button>
      </div>

      {/* sponsor cards */}
      <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sponsors.map((s) => (
          <motion.div
            key={s.name}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-purple-500/40 shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,0,255,0.4)] transition-all duration-300"
          >
            <div className="rounded-2xl bg-black/70 backdrop-blur-md p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
                    {s.name}
                  </h2>
                  <p className="text-sm text-fuchsia-300/70">{s.tier} Partner</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Budget</p>
                  <p className="text-2xl font-bold text-emerald-400 drop-shadow-[0_0_6px_rgba(0,255,180,0.7)]">
                    ${s.budget.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-cyan-600/30 border border-cyan-500/40 hover:bg-cyan-500/40 transition-all"
                >
                  <Edit3 size={16} /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-rose-600/30 border border-rose-500/40 hover:bg-rose-500/40 transition-all"
                >
                  <Trash2 size={16} /> Remove
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* glow border effect */}
      <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 rounded-3xl shadow-[0_0_40px_rgba(255,0,255,0.15)]" />
    </motion.div>
  );
}
