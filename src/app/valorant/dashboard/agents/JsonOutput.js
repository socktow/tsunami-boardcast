"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export default function JsonOutput({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-6 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] rounded-2xl border border-cyan-400/40 shadow-[0_0_30px_rgba(0,255,255,0.2)] text-white font-mono overflow-hidden"
    >
      {/* Glow animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-[pulse_4s_infinite]" />

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-xl font-bold text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]">
          JSON Output
        </h2>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.1, textShadow: "0 0 10px cyan" }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-400/40 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20 transition shadow-[0_0_10px_rgba(0,255,255,0.2)]"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </div>

      {/* JSON Scroll Box */}
      <div
        className="relative rounded-lg border border-cyan-500/20 bg-black/30 shadow-inner shadow-cyan-400/10 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent"
      >
        <pre
          className="p-4 text-[13px] leading-relaxed text-cyan-100"
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textShadow: "0 0 6px rgba(0,255,255,0.5)",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </motion.div>
  );
}
