"use client";

import { useState, useEffect } from "react";
import AgentCard from "./AgentCard";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamPick({ teamA, teamB, mapPicked }) {
  const [showAgents, setShowAgents] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAgents(true), 700);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Fallback an toàn để không bị lỗi .map undefined
  const safeTeamA = teamA?.agents?.length
    ? teamA.agents
    : Array(5).fill({ agent: "", player: "Unknown", role: "", status: "picking" });

  const safeTeamB = teamB?.agents?.length
    ? teamB.agents
    : Array(5).fill({ agent: "", player: "Unknown", role: "", status: "picking" });

  const mapImage = mapPicked
    ? `/valorant/maps/splash/${mapPicked}.jpg`
    : `/valorant/maps/splash/default.jpg`;

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-1.5 left-2.5 right-2.5 w-auto h-[25%] 
                   bg-gradient-to-r from-black/80 via-gray-800/70 to-black/80 
                   text-white p-1 flex items-center 
                   border border-gray-500/20 rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-11 gap-2 w-full h-full">
          {/* ✅ Team A (5 agents hoặc placeholder) */}
          {safeTeamA.map((agentData, i) => {
            const delay = (4 - i) * 0.2;
            return (
              <motion.div
                key={`A-${i}`}
                initial={{ y: 100, opacity: 0 }}
                animate={
                  showAgents ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: showAgents ? delay : 0,
                  ease: "easeOut",
                }}
              >
                <AgentCard
                  label={`A${i + 1}`}
                  agent={agentData.agent}
                  player={agentData.player}
                  teamSide="left"
                  role={agentData.role}
                  status={agentData.status}
                />
              </motion.div>
            );
          })}

          {/* ✅ Map ở giữa (vẫn hiển thị nếu thiếu mapPicked) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: showAgents ? 0.25 : 0,
            }}
            className="relative h-full overflow-hidden rounded-md border border-gray-500/50"
          >
            <Image
              src={mapImage}
              alt={mapPicked || "Default Map"}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 border border-white/10 rounded-md pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute top-4 left-0 right-0 text-center px-2">
              <span className="text-2xl font-extrabold tracking-widest text-yellow-300 drop-shadow-md">
                {mapPicked || "UNKNOWN MAP"}
              </span>
            </div>

            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
              <Image
                src="/valorant/role/VCT_Logo.png"
                alt="VCT Logo"
                width={32}
                height={32}
                className="opacity-90 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] invert brightness-200"
                priority
              />
            </div>
          </motion.div>

          {/* ✅ Team B (5 agents hoặc placeholder) */}
          {safeTeamB.map((agentData, i) => {
            const delay = i * 0.2;
            return (
              <motion.div
                key={`B-${i}`}
                initial={{ y: 100, opacity: 0 }}
                animate={
                  showAgents ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  delay: showAgents ? delay : 0,
                  ease: "easeOut",
                }}
              >
                <AgentCard
                  label={`B${i + 1}`}
                  agent={agentData.agent}
                  player={agentData.player}
                  teamSide="right"
                  role={agentData.role}
                  status={agentData.status}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
