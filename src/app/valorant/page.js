"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, Monitor } from "lucide-react";

export default function ValorantPage() {
  const links = [
    {
      href: "/valorant/dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={26} />,
      color: "from-red-500 to-orange-500",
    },
    {
      href: "/valorant/overlay",
      title: "Overlay",
      icon: <Monitor size={26} />,
      color: "from-orange-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0015] to-[#330000] flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated neon background */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.3),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,100,0,0.3),transparent_60%)] animate-pulse" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold neon-text-red mb-10 tracking-widest text-center"
      >
        🔥 Valorant Control Portal
      </motion.h1>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
        {links.map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className={`p-[2px] rounded-2xl bg-gradient-to-r ${link.color} shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_45px_rgba(255,120,0,0.6)] transition-all duration-300`}
          >
            <Link
              href={link.href}
              className="flex flex-col items-center justify-center gap-3 bg-black/70 rounded-2xl px-10 py-12 hover:bg-black/90 backdrop-blur-md transition"
            >
              <div className="text-red-400">{link.icon}</div>
              <h2 className="text-lg font-semibold text-center">{link.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-sm text-red-300/70 tracking-wide"
      >
        © 2025 Tsunami Studio — Valorant Overlay System
      </motion.footer>

      {/* Neon effect styles */}
      <style jsx>{`
        .neon-text-red {
          color: #fff;
          text-shadow: 0 0 10px #ff004c, 0 0 20px #ff3300, 0 0 40px #ff004c;
          animation: glowRed 3s ease-in-out infinite alternate;
        }
        @keyframes glowRed {
          from {
            text-shadow: 0 0 10px #ff004c, 0 0 20px #ff3300;
          }
          to {
            text-shadow: 0 0 25px #ff004c, 0 0 45px #ff3300;
          }
        }
      `}</style>
    </div>
  );
}
