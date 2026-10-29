const socketUrl = "wss://lan.mama.ovh/socket";
const userID = "387465159322632202";

let websocket = null;
let hbInterval = null;

const connectDiscordSocket = () => {
  websocket = new WebSocket(socketUrl);

  websocket.onopen = () => {
    console.log("[Discord Socket] Connected");
  };

  websocket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      const { op, t, d } = payload;

      switch (op) {
        case 1: {
          // Hello: start heartbeat and subscribe
          const interval = d.heartbeat_interval;
          clearInterval(hbInterval);
          hbInterval = setInterval(() => {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
              websocket.send(JSON.stringify({ op: 3 }));
            }
          }, interval);

          websocket.send(
            JSON.stringify({
              op: 2,
              d: {
                subscribe_to_id: userID,
              },
            }),
          );
          break;
        }

        case 0: {
          // Event: INIT_STATE or PRESENCE_UPDATE
          discordComponent(d);
          console.log(`[Discord Socket] ${t}:`, d);
          break;
        }

        default:
          break;
      }
    } catch (err) {
      console.error("[Discord Socket] Parse error:", err);
    }
  };

  websocket.onerror = (err) => {
    console.error("[Discord Socket] Error:", err);
  };

  websocket.onclose = (event) => {
    console.warn(
      `[Discord Socket] Closed (${event.code}). Reconnecting in 5s...`,
    );
    clearInterval(hbInterval);
    setTimeout(connectDiscordSocket, 5000);
  };
};
