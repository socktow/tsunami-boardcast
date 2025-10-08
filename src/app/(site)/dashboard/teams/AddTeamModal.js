"use client"
import React, { useState } from "react"

export default function AddTeamModal({ onClose, onSave }) {
  const [teamName, setTeamName] = useState("")
  const [logo, setLogo] = useState(null)
  const [members, setMembers] = useState([""])

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) setLogo(URL.createObjectURL(file))
  }

  const handleMemberChange = (i, value) => {
    const newMembers = [...members]
    newMembers[i] = value
    setMembers(newMembers)
  }

  const addMember = () => setMembers([...members, ""])
  const removeMember = (i) => setMembers(members.filter((_, idx) => idx !== i))

  const handleSave = () => {
    const newTeam = {
      name: teamName,
      logo,
      members: members.filter((m) => m.trim() !== ""),
    }
    onSave(newTeam)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-lg space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">Create Team</h2>

        {/* Team Name */}
        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
        />

        {/* Logo */}
        <div>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
          {logo && (
            <img src={logo} alt="Logo" className="h-16 mt-2 rounded-md border" />
          )}
        </div>

        {/* Members */}
        <div>
          <label className="block text-sm font-medium mb-2">Members</label>
          {members.map((m, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={`Member ${i + 1}`}
                value={m}
                onChange={(e) => handleMemberChange(i, e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent"
              />
              {members.length > 1 && (
                <button
                  onClick={() => removeMember(i)}
                  className="px-2 py-1 rounded bg-rose-500 text-white"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button onClick={addMember} className="mt-2 px-3 py-2 rounded-md border">
            + Add Member
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
