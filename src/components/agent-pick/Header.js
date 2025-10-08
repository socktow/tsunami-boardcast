"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MatchHeader({
  teamLeftLogo,
  teamRightLogo,
  teamLeftName,
  teamRightName,
  sideLeft,
  sideRight,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-27 left-0 right-0 z-30 w-full h-56"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/10 to-transparent pointer-events-none rounded-bm rounded-2xl border-t-amber-200" />

      {/* Header Content */}
      <div className="relative w-full h-full flex items-start justify-between px-16 pt-5 z-40 text-white">
        {/* LEFT TEAM */}
        <div className="flex items-center gap-4">
          {teamLeftLogo && (
            <Image
              src={teamLeftLogo}
              alt={teamLeftName || "Team Left"}
              width={40}
              height={40}
              className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            />
          )}
          <div className="flex flex-col items-start leading-tight">
            <div className="flex gap-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 border border-white rotate-45" />
              ))}
            </div>
          </div>
          <span className="text-3xl font-extrabold tracking-wider">
            {teamLeftName}
          </span>
          <span className="text-[#26f8cc] text-sm font-bold uppercase tracking-wide">
            {sideLeft}
          </span>
        </div>

        {/* CENTER VS */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
          <div className="relative inline-flex items-center justify-center px-3 py-1">
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#f44b59]" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#f44b59]" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#26f8cc]" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#26f8cc]" />
            <span className="text-2xl font-extrabold tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              VS
            </span>
          </div>
        </div>

        {/* RIGHT TEAM */}
        <div className="flex items-center gap-4">
          <span className="text-[#f44b59] text-sm font-bold uppercase tracking-wide">
            {sideRight}
          </span>
          <span className="text-3xl font-extrabold tracking-wider">
            {teamRightName}
          </span>
          <div className="flex flex-col items-end leading-tight">
            <div className="flex gap-2 mt-2 justify-end">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-3 border border-white rotate-45" />
              ))}
            </div>
          </div>
          {teamRightLogo && (
            <Image
              src={teamRightLogo}
              alt={teamRightName || "Team Right"}
              width={40}
              height={40}
              className="relative object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
