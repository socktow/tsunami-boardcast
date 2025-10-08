"use client"
import React, { useState } from "react"
import AddTeamModal from "./AddTeamModal"

export default function TeamsPage() {
  const [teams, setTeams] = useState([
    { name: "Alpha", region: "NA", rating: 1975, members: ["John", "Sara"], logo: null },
    { name: "Bravo", region: "EU", rating: 1890, members: ["Mike", "Anna"], logo: null },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTeam = (newTeam) => {
    setTeams([...teams, newTeam])
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Teams</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
        >
          Add Team
        </button>
      </div>

      {/* Table List */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/40">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Logo</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium">Members</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={i} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="px-4 py-3">
                  {t.logo ? (
                    <img src={t.logo} alt={t.name} className="h-10 w-10 object-cover rounded-full" />
                  ) : (
                    <span className="text-zinc-400 italic">No Logo</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3">{t.members.join(", ")}</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 mr-2">Edit</button>
                  <button className="px-3 py-1.5 rounded-md border border-rose-300 text-rose-600">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddTeamModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTeam}
        />
      )}
    </div>
  )
}
