// src/lib/websocket.js
let ws = null;
let reconnectTimeout = null;

/**
 * Kết nối WebSocket chỉ để nhận dữ liệu (client read-only)
 * @param {string} url - Địa chỉ WebSocket (vd: ws://localhost:5000/agentpick)
 * @param {function} onMessage - Hàm callback khi nhận dữ liệu từ server
 * @param {function} onStatusChange - Hàm callback cập nhật trạng thái kết nối
 */
export const connectWebSocket = (url, onMessage, onStatusChange) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log("⚡ WebSocket đã kết nối sẵn");
    return ws;
  }

  console.log(`🌐 Đang kết nối đến ${url} ...`);
  ws = new WebSocket(url);
  onStatusChange("Connecting...");

  ws.onopen = () => {
    console.log("✅ WebSocket connected");
    onStatusChange("Connected");
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("📩 Received:", data);
      onMessage(data);
    } catch (err) {
      console.error("❌ Lỗi parse JSON:", event.data);
    }
  };

  ws.onerror = (err) => {
    console.error("⚠️ WebSocket error:", err);
    onStatusChange("Error");
  };

  ws.onclose = () => {
    console.warn("🔌 WebSocket disconnected, retrying...");
    onStatusChange("Disconnected");

    // Tự động reconnect sau 3 giây
    reconnectTimeout = setTimeout(() => {
      console.log("♻️ Reconnecting...");
      connectWebSocket(url, onMessage, onStatusChange);
    }, 3000);
  };

  return ws;
};

export const closeWebSocket = () => {
  if (reconnectTimeout) clearTimeout(reconnectTimeout);
  if (ws) {
    console.log("🔒 Đóng kết nối WebSocket");
    ws.close();
    ws = null;
  }
};
