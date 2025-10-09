"use client"
import React, { useEffect, useMemo, useState } from "react"
import { Sun, Moon, Plus, Edit3, Trash2, Search } from "lucide-react"
import AddTeamModal from "./AddTeamModal"

export default function TeamsPageModern() {
  const [teams, setTeams] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTeam, setEditTeam] = useState(null)
  const [uiVariant, setUiVariant] = useState("card")
  const [query, setQuery] = useState("")
  const [dark, setDark] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tsunami.teams")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setTeams(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("tsunami.teams", JSON.stringify(teams))
    } catch {}
  }, [teams])

  const openAdd = (variant = "card") => {
    setEditTeam(null)
    setUiVariant(variant)
    setIsModalOpen(true)
  }

  const openEdit = (team) => {
    setEditTeam(team)
    setUiVariant("card")
    setIsModalOpen(true)
  }

  const handleSave = (payload) => {
    setTeams((prev) => {
      const idx = prev.findIndex((t) => t.id === payload.id)
      if (idx === -1) return [payload, ...prev]
      const next = [...prev]
      next[idx] = payload
      return next
    })
    setIsModalOpen(false)
    setEditTeam(null)
  }

  const handleRemove = (id) => setTeams((prev) => prev.filter((t) => t.id !== id))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return teams
    return teams.filter((t) => (t.name || "").toLowerCase().includes(q) || (t.lineup || []).some(p => (p.name||"").toLowerCase().includes(q)))
  }, [teams, query])

  return (
    <div className={`${dark ? " text-zinc-100" : "bg-white text-zinc-900"} min-h-screen p-6 transition-colors`}> 
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Teams</h1>
            <p className="text-sm text-zinc-400">Manage your rosters — modern theme with compact cards.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teams or players..."
                className="pl-10 pr-3 py-2 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent placeholder:text-zinc-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70"><Search size={16} /></div>
            </div>

            <button
              onClick={() => setDark(d => !d)}
              className="p-2 rounded-md border border-zinc-700 hover:bg-zinc-800/40"
              title="Toggle theme"
            >
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => openAdd("card")}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
              >
                <Plus size={16} /> Add Team
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <article key={t.id} className={`rounded-2xl p-4 backdrop-blur-sm border ${dark ? "border-zinc-800 bg-zinc-800/40" : "border-zinc-100 bg-white/60"}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {t.logo ? (
                    <img src={t.logo} alt={t.name} className="h-16 w-16 object-cover rounded-lg shadow-sm border" />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-zinc-700/30 flex items-center justify-center text-xl font-bold">{(t.name || "?")[0]}</div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{t.name}</h3>
                      <div className="text-xs text-zinc-400">{t.region || "Unknown region"} • {t.lineup?.length || 0} players</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full border" style={{ background: t.color || '#111827' }} />
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-zinc-300">
                    <div className="flex -space-x-1">
                      {t.lineup?.slice(0,5).map((p, idx) => (
                        <div key={idx} className="h-8 w-8 rounded-full border border-zinc-700 overflow-hidden bg-zinc-700/20 flex items-center justify-center text-[10px]">
                          {p.image ? <img src={p.image} alt={p.name} className="h-full w-full object-cover" /> : <span>{p.name?.[0] || "?"}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-400">{t.tagline || 'Competitive roster'}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(t)} className="p-2 rounded-md border border-zinc-700 hover:bg-zinc-800/40" title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => handleRemove(t.id)} className="p-2 rounded-md border border-rose-600 text-rose-500 hover:bg-rose-600/10" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-zinc-700/40 p-8 text-center text-zinc-400">
            <p className="mb-3">No teams yet — create one to get started.</p>
            <button onClick={() => openAdd()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white">
              <Plus size={14} /> Create Team
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <AddTeamModal
            onClose={() => { setIsModalOpen(false); setEditTeam(null) }}
            onSave={handleSave}
            initialTeam={editTeam}
            mode={editTeam ? "edit" : "add"}
            uiVariant={uiVariant}
          />
        )}
      </div>
    </div>
  )
}
