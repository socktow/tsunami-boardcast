"use client";
import React from "react";

export default function JsonOutput({ data }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">JSON Output</h2>
      <pre className="p-4 bg-gray-100 rounded text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
