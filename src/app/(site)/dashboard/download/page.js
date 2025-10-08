"use client";

import { useState } from "react";

export default function DownloadPage() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");

  const handleDownload = async () => {
    setStatus("Downloading...");
    setProgress(10);

    const res = await fetch("/api/download");
    if (!res.ok) {
      setStatus("Error while downloading.");
      return;
    }

    const data = await res.json();
    if (data.success) {
      setProgress(100);
      setStatus(`Downloaded ${data.downloaded}/${data.total} assets ✅`);
    } else {
      setStatus("Download failed ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-6 p-6">
      <h1 className="text-2xl font-bold">Download Valorant Assets</h1>
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg"
      >
        Start Download
      </button>

      <div className="w-full max-w-lg bg-gray-700 rounded-full h-6 overflow-hidden">
        <div
          className="bg-green-500 h-6 text-center text-sm font-bold transition-all duration-300"
          style={{ width: `${progress}%` }}
        >
          {progress > 0 ? `${progress}%` : ""}
        </div>
      </div>

      <p className="mt-2">{status}</p>
    </div>
  );
}
