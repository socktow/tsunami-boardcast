import { WebSocketServer } from "ws";

const PORT = 5000;
const wss = new WebSocketServer({ port: PORT, path: "/agentpick" }); // ✅ thêm path

let clients = new Set();

wss.on("connection", (ws, req) => {
  console.log("🔌 New client connected:", req.socket.remoteAddress);
  clients.add(ws);

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      // Gửi broadcast cho các client khác
      for (const client of clients) {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(JSON.stringify(data));
        }
      }
    } catch (err) {
      console.error("❌ Invalid JSON:", err);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });

  ws.on("error", (err) => {
    console.error("⚠️ WebSocket error:", err);
  });

  ws.send(JSON.stringify({ message: "Connected to AgentPick WebSocket server" }));
});

console.log(`✅ WebSocket server is running at ws://localhost:${PORT}/agentpick`);
