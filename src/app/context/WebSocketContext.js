"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/agentpick");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    };

    ws.onerror = (err) => console.error("⚠️ WS Error:", err);

    return () => ws.close();
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws: wsRef.current, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);
