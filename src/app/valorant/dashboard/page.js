"use client";
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, hint }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-5 rounded-xl border border-cyan-500/30 bg-black/30 shadow-[0_0_25px_rgba(0,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:border-cyan-400/60 backdrop-blur-md transition"
    >
      <div className="text-xs text-cyan-400/70 uppercase tracking-wide mb-1">
        {title}
      </div>
      <div className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
        {value}
      </div>
      {hint && (
        <div className="text-xs text-cyan-500/60 mt-1">{hint}</div>
      )}
    </motion.div>
  );
};

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-cyan-100 font-mono overflow-hidden relative"
    >
      {/* Neon glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-[pulse_5s_infinite]" />

      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <h1 className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
          Valorant Overview - Demo Data
        </h1>
        <button className="px-4 py-2 bg-cyan-600/30 hover:bg-cyan-500/40 text-white font-semibold rounded-lg border border-cyan-500/40 shadow-[0_0_10px_rgba(0,255,255,0.4)] transition">
          Refresh Data
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 grid gap-6">
        {/* Stats Row */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Live Viewers" value="12,430" hint="Across all platforms" />
          <StatCard title="Matches Today" value="4" hint="Main + Side streams" />
          <StatCard title="Avg. Latency" value="86ms" hint="Stream ingest" />
          <StatCard title="Clips Created" value="37" hint="Last 24h" />
        </div>

        {/* Activity Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Live Feed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 p-5 rounded-xl border border-cyan-500/30 bg-black/30 shadow-[0_0_25px_rgba(0,255,255,0.15)] backdrop-blur-md"
          >
            <h2 className="font-semibold text-cyan-300 text-lg mb-3 drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]">
              Recent Broadcast Events
            </h2>
            <ul className="space-y-3 text-sm text-cyan-100/90">
              <li>10:21 — Team Alpha clutched 3v5 at A site (Ascent)</li>
              <li>10:18 — Ace by <span className="text-cyan-400">PlayerXYZ</span> (Jett)</li>
              <li>10:07 — Tech pause resolved — all systems stable</li>
              <li>09:58 — Stream bitrate adjusted to 8.5 Mbps</li>
              <li>09:45 — Audience engagement +12% (Twitch spike)</li>
            </ul>
          </motion.div>

          {/* Next Matches */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-xl border border-cyan-500/30 bg-black/30 shadow-[0_0_25px_rgba(0,255,255,0.15)] backdrop-blur-md"
          >
            <h2 className="font-semibold text-cyan-300 text-lg mb-3 drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]">
              Upcoming Matches
            </h2>
            <ul className="space-y-3 text-sm text-cyan-100/90">
              <li>11:30 — Bravo vs Delta <span className="text-cyan-400">(Bind)</span></li>
              <li>13:00 — Echo vs Foxtrot <span className="text-cyan-400">(Haven)</span></li>
              <li>15:00 — Semifinal 1 <span className="text-cyan-400">(Split)</span></li>
              <li>17:30 — Finals <span className="text-cyan-400">(Ascent)</span></li>
            </ul>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
