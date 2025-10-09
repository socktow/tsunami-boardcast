import React from 'react'

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="font-semibold mb-3">General</div>
          <div className="space-y-3 text-sm">
            <label className="grid gap-1">
              <span>Event Name</span>
              <input className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2" defaultValue="VCT Open" />
            </label>
            <label className="grid gap-1">
              <span>Primary Color</span>
              <input type="color" defaultValue="#dc2626" className="h-9 w-14 rounded" />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="font-semibold mb-3">Overlays</div>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between gap-3">
              <span>Show Team Logos</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-3">
              <span>Show Player Handles</span>
              <input type="checkbox" className="h-4 w-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}


