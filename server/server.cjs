const http = require("http");
const WebSocket = require("ws");
const { v4: uuid } = require("uuid");

const port = process.env.PORT || 8765;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Serwer działa");
});

const wss = new WebSocket.Server({ server });

const connectedUsers = [];

wss.on("connection", ws => {
  ws.on("message", message => {
    if (message.type === "joinRequest") {
      ws.id = uuid();
      ws.username = message.username;
      connectedUsers.push(ws);
      ws.send({ username: ws.username, type: "join" });
    }

    ws.send(message);
  });

  ws.on("close", () => {
    console.log("Klient rozłączony");
  });
});

server.listen(port, () => {
  console.log("Serwer działa na porcie", port);
});
