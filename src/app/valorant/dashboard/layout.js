"use client";
import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WebSocketProvider, useWebSocket } from "@/app/context/WebSocketContext";

function Sidebar({ navItems, pathname }) {
  return (
    <aside
      style={{
        width: 240,
        background:
          "linear-gradient(180deg, rgba(20,22,40,0.9) 0%, rgba(10,10,20,0.9) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        height: "100dvh",
        boxShadow: "0 0 20px rgba(0,255,255,0.05)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 8,
          fontSize: 20,
          color: "#00e0ff",
          textShadow: "0 0 10px #00e0ff",
          letterSpacing: "1px",
        }}
      >
        ⚡ Tsunami Broadcast
      </div>

      {/* Hiển thị trạng thái WebSocket */}
      <WebSocketStatus />

      <nav style={{ display: "grid", gap: 8, marginTop: 20 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                textDecoration: "none",
                color: isActive ? "#0a0a0f" : "#e5e7eb",
                background: isActive
                  ? "linear-gradient(90deg, #00e0ff, #00ffa2)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(0,255,255,0.6)"
                  : "1px solid rgba(255,255,255,0.05)",
                boxShadow: isActive
                  ? "0 0 15px rgba(0,255,255,0.3)"
                  : "none",
                transition: "all 0.25s ease",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

// ✅ Component hiển thị trạng thái WebSocket
function WebSocketStatus() {
  const { status = "Disconnected" } = useWebSocket();
  const color =
  status?.includes("Connected") ? "#00ff9d" :
  status?.includes("Reconnecting") ? "#facc15" :
  status?.includes("Error") ? "#f87171" :
  "#9ca3af";

  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        marginTop: 4,
        color,
        textShadow: `0 0 10px ${color}`,
      }}
    >
      WebSocket: {status}
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const navItems = [
    { href: "/valorant/dashboard", label: "Overview" },
    { href: "/valorant/dashboard/agents", label: "Agents" },
    { href: "/valorant/dashboard/controller", label: "Controller" },
    { href: "/valorant/dashboard/maps", label: "Maps" },
    { href: "/valorant/dashboard/teams", label: "Teams" },
    { href: "/valorant/dashboard/sponsors", label: "Sponsors" },
    { href: "/valorant/dashboard/settings", label: "Settings" },
  ];

  return (
    <WebSocketProvider>
      <div
        style={{
          display: "flex",
          minHeight: "100dvh",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #0f1120 60%, #141628 100%)",
          color: "#e5e7eb",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Sidebar navItems={navItems} pathname={pathname} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <main
            style={{
              flex: 1,
              color: "#f1f5f9",
              background:
                "radial-gradient(circle at top left, rgba(0,255,255,0.05), transparent 70%)",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </WebSocketProvider>
  );
}
