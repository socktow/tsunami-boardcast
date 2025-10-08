"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const games = [
    {
      name: "Valorant",
      href: "/valorant",
      img: "/site/val.png",
      glow: "from-cyan-400 to-pink-500",
    },
    {
      name: "League of Legends",
      href: "/lol",
      img: "/site/lol.png",
      glow: "from-yellow-400 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a001f] to-[#1b0033] flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,255,0.2),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,255,255,0.2),transparent_60%)] animate-pulse" />

      {/* Moving neon scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-30"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold neon-text mb-4 tracking-widest text-center"
      >
        🎮 Tsunami Studio
      </motion.h1>

      {/* Subtitle / Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg text-fuchsia-200/80 mb-12 tracking-wider italic text-center"
      >
        “Control the Game — Master the Flow”
      </motion.p>

      {/* Game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 z-10">
        {games.map((g, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.96 }}
            className={`relative rounded-2xl p-[2px] bg-gradient-to-r ${g.glow} shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:shadow-[0_0_45px_rgba(255,0,255,0.6)] transition-all duration-300`}
          >
            <Link href={g.href}>
              <div className="rounded-2xl overflow-hidden bg-black/70 backdrop-blur-md group relative">
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={g.img}
                    alt={g.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition" />
                </div>

                {/* Glow line overlay */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-80"
                  initial={{ y: -100 }}
                  whileHover={{ y: 260 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                    {g.name}
                  </h2>
                  <p className="text-sm text-fuchsia-300/80 mt-2">
                    Enter Dashboard & Overlay
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-20 max-w-2xl text-center z-10 px-6"
      >
        <h3 className="text-xl font-semibold text-cyan-300 mb-4 neon-text-small">
          About Tsunami Studio
        </h3>
        <p className="text-fuchsia-200/80 leading-relaxed">
          Tsunami Studio is a creative control platform designed for esports overlay management and
          production automation. Built with cutting-edge technologies like Next.js, WebSocket, and
          Framer Motion — we bring live data to life with neon precision.
        </p>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-sm text-fuchsia-300/70 tracking-wide"
      >
        © 2025 Tsunami Studio — Game Control Portal | Build v1.2.7
      </motion.footer>

      {/* Neon text animation */}
      <style jsx>{`
        .neon-text {
          color: #fff;
          text-shadow: 0 0 10px #00fff7, 0 0 20px #ff00ff, 0 0 40px #ff00ff;
          animation: glow 3s ease-in-out infinite alternate;
        }
        .neon-text-small {
          text-shadow: 0 0 6px #00fff7, 0 0 12px #ff00ff;
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
