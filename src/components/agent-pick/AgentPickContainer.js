"use client";

import { useState, useEffect } from "react";
import TeamPick from "./TeamPick";
import Header from "./Header";
import { connectWebSocket, closeWebSocket } from "@/lib/websocket";

export default function AgentPickContainer() {
  const [data, setData] = useState(null);
  const [wsStatus, setWsStatus] = useState("Disconnected");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const ws = connectWebSocket(
      "ws://localhost:5000/agentpick",
      (incomingData) => {
        setData(incomingData);
      },
      setWsStatus
    );

    return () => closeWebSocket();
  }, []);

  // ✅ Kiểm tra điều kiện dữ liệu sẵn sàng
  useEffect(() => {
    if (
      data &&
      data.matchDetail &&
      data.matchDetail.gameStatus === "running" &&
      data.mapPicked &&
      data.teamA &&
      data.teamB
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [data]);

  // ✅ Chưa có dữ liệu hoặc chưa "running" thì hiển thị màn chờ
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400 text-xl">
        <div className="animate-pulse">Waiting for match to start...</div>
      </div>
    );
  }

  const { matchDetail, mapPicked, teamA, teamB } = data;

  return (
    <div className="absolute inset-0 z-30 text-white">
      {/* Header */}
      <Header
        teamLeftLogo={matchDetail?.teamA_Logo}
        teamRightLogo={matchDetail?.teamB_Logo}
        teamLeftName={teamA?.name}
        teamRightName={teamB?.name}
        sideLeft={teamA?.side}
        sideRight={teamB?.side}
        scoreLeft={matchDetail?.teamA_Score}
        scoreRight={matchDetail?.teamB_Score}
      />

      {/* Team Pick */}
      <div className="absolute inset-0 z-50 flex justify-between items-center px-8 pt-32">
        <TeamPick teamA={teamA} teamB={teamB} mapPicked={mapPicked} />
      </div>
    </div>
  );
}
