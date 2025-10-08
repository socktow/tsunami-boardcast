"use client";

import Image from "next/image";

export default function AgentCard({ agent, player, teamSide, role, status }) {
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

  return (
    <div
      className={`relative bg-gray-950 rounded-md h-full overflow-hidden ${borderColor}`}
    >
      {status === "picking" && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[5] rounded-md"
            style={{
              background:
                "linear-gradient(to top, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.05) 100%)",
              animation: "whiteFade 1.6s ease-in-out infinite",
            }}
          />

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
            @keyframes whiteFade {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 0.7;
              } /* tăng sáng giữa hiệu ứng */
              100% {
                opacity: 0;
              }
            }

            @keyframes textFade {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
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
          <Image
            src={agentImagePath}
            alt={agent}
            fill
            className="object-cover scale-255 translate-y-43"
            priority
          />
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
