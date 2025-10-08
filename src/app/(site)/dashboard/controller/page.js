import React from 'react'

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Broadcast Controller</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="font-semibold mb-3">Stream Controls</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Go Live</button>
            <button className="px-3 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700">Pause</button>
            <button className="px-3 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700">Stop</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <label className="flex items-center justify-between gap-3">
              <span>Show Scoreboard</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Show Minimap</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between gap-3 col-span-2">
              <span>Bitrate (Mbps)</span>
              <input type="number" defaultValue={8.5} step={0.5} className="w-24 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-2 py-1" />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="font-semibold mb-3">Scenes</div>
          <div className="grid grid-cols-2 gap-3">
            {['Game','Analyst Desk','Player Cam','Break'].map((s) => (
              <button key={s} className="h-24 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


