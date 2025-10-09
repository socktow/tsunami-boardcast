"use client"
import React, { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { X, Upload, Users } from "lucide-react"

export default function AddTeamModal({ onClose, onSave, initialTeam, mode = "add" }) {
  const [teamName, setTeamName] = useState(initialTeam?.name || "")
  const [logo, setLogo] = useState(initialTeam?.logo || null)
  const [lineup, setLineup] = useState(() => {
    if (initialTeam?.lineup?.length === 5) return initialTeam.lineup
    return Array.from({ length: 5 }, () => ({ name: "", image: null }))
  })
  const color = "#00c2ff"

  const isValid = useMemo(() => {
    if (!teamName.trim()) return false
    return lineup.every((p) => p.name.trim())
  }, [teamName, lineup])

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLogo(url)
  }

  const handlePlayerNameChange = (index, value) => {
    const next = [...lineup]
    next[index] = { ...next[index], name: value }
    setLineup(next)
  }

  const handlePlayerImageChange = (index, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const next = [...lineup]
    next[index] = { ...next[index], image: url }
    setLineup(next)
  }

  const handleSave = () => {
    if (!isValid) return
    const payload = {
      id: initialTeam?.id || crypto.randomUUID(),
      name: teamName.trim(),
      color,
      logo,
      lineup: lineup.map((p) => ({ name: p.name?.trim() || "", image: p.image || null })),
      createdAt: initialTeam?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
    onSave(payload)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 w-full max-w-4xl shadow-2xl border border-zinc-800"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-zinc-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {mode === "edit" ? "Edit Team" : "Create New Team"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Info */}
          <div className="md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Logo</label>
              <div className="flex items-center gap-3">
                <div
                  className="h-16 w-16 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden"
                  style={{ outline: `3px solid ${color}44` }}
                >
                  {logo ? (
                    <img src={logo} className="h-full w-full object-cover" alt="Logo" />
                  ) : (
                    <Users size={28} className="text-zinc-500" />
                  )}
                </div>
                <label className="cursor-pointer px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-cyan-400 flex items-center gap-2 text-sm">
                  <Upload size={16} /> Upload
                  <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                </label>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="text-sm text-rose-400 hover:text-rose-500"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Lineup */}
          <div className="md:col-span-2">
            <label className="block text-sm text-zinc-400 mb-3">Lineup (5 Players)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {lineup.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-zinc-800 border border-zinc-700 p-3 flex flex-col items-center text-center hover:border-cyan-400 transition"
                >
                  <div
                    className="h-16 w-16 rounded-full overflow-hidden border-2 border-zinc-700 mb-2 flex items-center justify-center"
                    style={{ borderColor: color }}
                  >
                    {p.image ? (
                      <img src={p.image} alt="Player" className="h-full w-full object-cover" />
                    ) : (
                      <Users size={20} className="text-zinc-500" />
                    )}
                  </div>
                  <label className="text-xs cursor-pointer px-2 py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-200">
                    Upload
                    <input hidden type="file" accept="image/*" onChange={(e) => handlePlayerImageChange(i, e)} />
                  </label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="mt-2 text-center w-full px-2 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-xs focus:border-cyan-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {mode === "edit" ? "Update" : "Save Team"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
