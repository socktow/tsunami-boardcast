"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AgentCard({ agent, player, teamSide, role, status, pickingStyle = "glow" }) {
  const agentImagePath = agent
    ? `/valorant/agents/${agent.toLowerCase()}_bust.png`
    : null;

  const roleToIcon = {
    Initiator: "/valorant/role/InitiatorClassSymbol.webp",
    Duelist: "/valorant/role/DuelistClassSymbol.webp",
    Controller: "/valorant/role/ControllerClassSymbol.webp",
    Sentinel: "/valorant/role/SentinelClassSymbol.webp",
  };

  // Border luôn có màu theo teamSide
  const borderColor =
    teamSide === "left"
      ? "border-b-[4px] border-[#26f8cc]"
      : "border-b-[4px] border-[#f44b59]";

  const teamColor = teamSide === "left" ? "#26f8cc" : "#f44b59";

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [revealKey, setRevealKey] = useState("");

  // Reset loading state when agent changes
  useEffect(() => {
    if (!agent) {
      setIsImageLoaded(false);
      setRevealKey("");
      return;
    }
    setIsImageLoaded(false);
    setRevealKey(`${agent}-${Date.now()}`);
  }, [agent]);

  return (
    <div
      className={`relative bg-gray-950 rounded-md h-full overflow-hidden ${borderColor}`}
    >
      {status === "picking" && (
        <>
          {pickingStyle === "glow" && (
            <>
              {/* Team-colored pulse glow */}
              <div
                className="pointer-events-none absolute inset-0 z-[5] rounded-md"
                style={{
                  boxShadow: `inset 0 0 18px ${teamColor}55, 0 0 22px ${teamColor}33`,
                  animation: "pulseGlow 1.6s ease-in-out infinite alternate",
                }}
              />

              {/* Diagonal color sweep */}
              <div
                className="pointer-events-none absolute z-[6] rounded-md"
                style={{
                  inset: "-10%",
                  transform: "rotate(12deg)",
                  overflow: "hidden",
                }}
              >
                <div
                  className="absolute top-0 bottom-0"
                  style={{
                    left: "-60%",
                    width: "50%",
                    background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${teamColor}44 45%, ${teamColor}99 50%, ${teamColor}44 55%, rgba(0,0,0,0) 100%)`,
                    filter: "blur(10px)",
                    animation: "sweep 1.8s linear infinite",
                  }}
                />
              </div>
            </>
          )}

          {pickingStyle === "scan" && (
            <>
              {/* Subtle animated scanlines */}
              <div
                className="pointer-events-none absolute inset-0 z-[5] rounded-md"
                style={{
                  background: `repeating-linear-gradient( to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 6px, ${teamColor}22 7px, rgba(0,0,0,0) 12px)`,
                  maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  animation: "scanLines 1.2s linear infinite",
                }}
              />

              {/* Rotating radar sweep */}
              <div className="pointer-events-none absolute inset-0 z-[6] rounded-md overflow-hidden">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: "160%",
                    height: "160%",
                    background: `conic-gradient(from 0deg, ${teamColor}99 0deg, ${teamColor}22 40deg, rgba(0,0,0,0) 70deg, rgba(0,0,0,0) 360deg)`,
                    filter: "blur(6px)",
                    animation: "radarRotate 2.2s linear infinite",
                    opacity: 0.7,
                  }}
                />
              </div>
            </>
          )}

          {pickingStyle === "grid" && (
            <>
              {/* Team-colored animated dot grid */}
              <div
                className="pointer-events-none absolute inset-0 z-[5] rounded-md"
                style={{
                  backgroundImage: `radial-gradient(${teamColor}55 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0",
                  animation: "gridDrift 3.2s linear infinite",
                }}
              />

              {/* Pulsing corner brackets */}
              <div className="pointer-events-none absolute inset-0 z-[6]">
                {/* TL */}
                <div
                  className="absolute"
                  style={{
                    top: 6,
                    left: 6,
                    width: 18,
                    height: 18,
                    borderTop: `2px solid ${teamColor}`,
                    borderLeft: `2px solid ${teamColor}`,
                    boxShadow: `0 0 10px ${teamColor}55`,
                    animation: "cornerPulse 1.6s ease-in-out infinite",
                  }}
                />
                {/* TR */}
                <div
                  className="absolute"
                  style={{
                    top: 6,
                    right: 6,
                    width: 18,
                    height: 18,
                    borderTop: `2px solid ${teamColor}`,
                    borderRight: `2px solid ${teamColor}`,
                    boxShadow: `0 0 10px ${teamColor}55`,
                    animation: "cornerPulse 1.6s ease-in-out infinite 120ms",
                  }}
                />
                {/* BL */}
                <div
                  className="absolute"
                  style={{
                    bottom: 6,
                    left: 6,
                    width: 18,
                    height: 18,
                    borderBottom: `2px solid ${teamColor}`,
                    borderLeft: `2px solid ${teamColor}`,
                    boxShadow: `0 0 10px ${teamColor}55`,
                    animation: "cornerPulse 1.6s ease-in-out infinite 240ms",
                  }}
                />
                {/* BR */}
                <div
                  className="absolute"
                  style={{
                    bottom: 6,
                    right: 6,
                    width: 18,
                    height: 18,
                    borderBottom: `2px solid ${teamColor}`,
                    borderRight: `2px solid ${teamColor}`,
                    boxShadow: `0 0 10px ${teamColor}55`,
                    animation: "cornerPulse 1.6s ease-in-out infinite 360ms",
                  }}
                />
              </div>
            </>
          )}

          {/* Vertical 'Picking' label with fade */}
          <div
            className={`pointer-events-none absolute top-6 p-2 -translate-y-1 z-[6] text-white/90 font-extrabold tracking-widest uppercase text-xs select-none ${
              teamSide === "left" ? "right-1" : "left-1"
            }`}
            style={{
              transform:
                teamSide === "left" ? "translateY(-50%) " : "translateY(-50%) ",
              letterSpacing: "0.5em",
              animation: "textFade 1.6s ease-in-out infinite",
              textShadow: "0 1px 6px rgba(255,255,255,0.35)",
            }}
          >
            Picking
          </div>
          <style jsx>{`
            @keyframes pulseGlow {
              0% { opacity: 0.4; }
              50% { opacity: 0.9; }
              100% { opacity: 0; }
            }

            @keyframes sweep {
              0% { transform: translateX(0); opacity: 0.85; }
              60% { opacity: 1; }
              100% { transform: translateX(260%); opacity: 0.85; }
            }

            @keyframes scanLines {
              0% { background-position-y: 0px; }
              100% { background-position-y: 12px; }
            }

            @keyframes radarRotate {
              0% { transform: translate(-50%, -50%) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes textFade {
              0% { opacity: 0; }
              50% { opacity: 1; }
              100% { opacity: 0; }
            }

            @keyframes gridDrift {
              0% { background-position: 0 0; }
              100% { background-position: 16px 16px; }
            }

            @keyframes cornerPulse {
              0% { opacity: 0.6; filter: drop-shadow(0 0 2px transparent); }
              50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,0.2)); }
              100% { opacity: 0.6; filter: drop-shadow(0 0 2px transparent); }
            }
          `}</style>
        </>
      )}

      {status === "picked" && (
        <>
          {/* Team-colored ripple rings (expand + fade) */}
          <div className="pointer-events-none absolute inset-0 z-[7]">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "160%",
                height: "160%",
                border: `3px solid ${teamSide === "left" ? "#26f8cc" : "#f44b59"}`,
                boxShadow: `0 0 24px ${teamSide === "left" ? "#26f8cc66" : "#f44b5966"}`,
                animation: "rippleRing 900ms ease-out 1 forwards",
                opacity: 0.8,
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "130%",
                height: "130%",
                border: `2px solid ${teamSide === "left" ? "#26f8cc" : "#f44b59"}`,
                boxShadow: `0 0 18px ${teamSide === "left" ? "#26f8cc55" : "#f44b5955"}`,
                animation: "rippleRing 900ms ease-out 1 120ms forwards",
                opacity: 0.85,
              }}
            />
          </div>

          <style jsx>{`
            @keyframes rippleRing {
              0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
              70% { transform: translate(-50%, -50%) scale(1.25); opacity: 0.35; }
              100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            }
          `}</style>
        </>
      )}

      {/* Agent Image nếu có */}
      {agent && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Loading shimmer while image is fetching */}
          {!isImageLoaded && (
            <div
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0.03) 80%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.1s ease-in-out infinite",
              }}
            />
          )}

          {/* Subtle team glow while loading */}
          {!isImageLoaded && (
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-md"
              style={{ boxShadow: `inset 0 0 24px ${teamColor}33` }}
            />
          )}

          <Image
            src={agentImagePath}
            alt={agent}
            fill
            className={`object-cover scale-255 translate-y-43 ${
              isImageLoaded
                ? "opacity-100 blur-0 scale-100 transition-all duration-700 ease-out"
                : "opacity-0 blur-sm scale-[1.03]"
            }`}
            priority
            onLoadingComplete={() => setIsImageLoaded(true)}
          />

          {/* One-shot reveal wipe when image becomes available */}
          {isImageLoaded && (
            <div key={revealKey} className="pointer-events-none absolute inset-0 z-[3]">
              <div
                className="absolute top-0 bottom-0"
                style={{
                  left: "-30%",
                  width: "24%",
                  background: `linear-gradient(90deg, transparent 0%, ${teamColor}55 35%, ${teamColor}aa 50%, ${teamColor}55 65%, transparent 100%)`,
                  filter: "blur(6px)",
                  animation: "revealWipe 720ms cubic-bezier(0.22, 1, 0.36, 1) 1",
                }}
              />
            </div>
          )}

          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes revealWipe {
              0% { transform: translateX(0); opacity: 0.9; }
              100% { transform: translateX(260%); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Role Icon nếu có */}
      {agent && role && (
        <div
          className={`absolute top-1 ${
            teamSide === "left" ? "left-1" : "right-1"
          } z-10 p-4`}
        >
          <Image
            src={roleToIcon[role] || ""}
            alt={role}
            width={24}
            height={24}
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Gradient Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* Overlay Text */}
      <div
        className={`absolute bottom-2 w-full px-2 z-10 flex flex-col gap-[3px] ${
          teamSide === "left" ? "items-start" : "items-end"
        }`}
      >
        {player && (
          <div className="text-base font-extrabold text-yellow-400 drop-shadow-md tracking-wide">
            {player}
          </div>
        )}
        <div className="text-sm font-bold text-gray-200 tracking-widest uppercase">
          {agent || "\u00A0"}
        </div>
      </div>
    </div>
  );
}
