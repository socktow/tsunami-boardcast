"use client";
import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../../../components/ThemeToggle";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/agents", label: "Agents" },
    { href: "/dashboard/controller", label: "Controller" },
    { href: "/dashboard/maps", label: "Maps" },
    { href: "/dashboard/teams", label: "Teams" },
    { href: "/dashboard/sponsors", label: "Sponsors" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100dvh' }}>
      <aside
        style={{
          width: 220,
          borderRight: '1px solid rgba(0,0,0,0.1)',
          padding: 12,
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          height: '100dvh'
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Valorant Broadcast</div>
        <nav style={{ display: 'grid', gap: 6 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '8px 10px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'inherit',
                  background: isActive ? 'rgba(0,0,0,0.06)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <div style={{ fontWeight: 600 }}>Dashboard</div>
          <ThemeToggle />
        </header>
        <main style={{ padding: 16 }}>
          {children}
        </main>
      </div>
    </div>
  );
}


