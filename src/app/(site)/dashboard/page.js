"use client";
import React from "react";

const StatCard = ({ title, value, hint }) => {
  return (
    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="text-xs text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      {hint && (
        <div className="text-xs text-gray-400 dark:text-gray-500">{hint}</div>
      )}
    </div>
  );
};

const Page = () => {
  return (
    <div className="grid gap-4 p-6">
      {/* Stats row */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Live Viewers" value="12,430" hint="Across all platforms" />
        <StatCard title="Matches Today" value="4" hint="Main + Side streams" />
        <StatCard title="Avg. Latency" value="86ms" hint="Stream ingest" />
        <StatCard title="Clips Created" value="37" hint="Last 24h" />
      </div>

      {/* Events + Next Matches */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Recent Events */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm lg:col-span-2">
          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Recent Events
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>10:21 — Team Alpha defused at A site (Ascent)</li>
            <li>10:18 — Ace by PlayerXYZ (Jett)</li>
            <li>10:07 — Tech pause resolved</li>
            <li>09:58 — Stream bitrate adjusted to 8.5Mbps</li>
          </ul>
        </div>

        {/* Next Matches */}
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <div className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Next Matches
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>11:30 — Bravo vs Delta (Bind)</li>
            <li>13:00 — Echo vs Foxtrot (Haven)</li>
            <li>15:00 — Semifinal 1 (Split)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
