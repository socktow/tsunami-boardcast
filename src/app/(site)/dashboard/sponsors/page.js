import React from 'react'

const sponsors = [
  { name: 'HyperX', tier: 'Title', budget: 50000 },
  { name: 'SteelSeries', tier: 'Gold', budget: 30000 },
  { name: 'Nvidia', tier: 'Silver', budget: 20000 },
]

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sponsors</h1>
        <button className="px-3 py-2 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">Add Sponsor</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sponsors.map((s) => (
          <div key={s.name} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{s.name}</div>
                <div className="text-xs text-zinc-500">{s.tier} Partner</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-500">Budget</div>
                <div className="text-xl font-bold">${s.budget.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800">Edit</button>
              <button className="px-3 py-2 rounded-md border border-rose-300 text-rose-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


