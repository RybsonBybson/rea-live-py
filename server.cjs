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
    message = JSON.parse(message);
    ws.username = message.username;

    if (message.type === "join_request") {
      connectedUsers.push(ws);
      connectedUsers.forEach(socket => {
        socket.send(JSON.stringify({ username: ws.username, type: "join" }));
      });
      return;
    }

    ws.send(JSON.stringify(message));
  });

  ws.on("close", () => {
    connectedUsers.splice(connectedUsers.indexOf(ws), 1);
    connectedUsers.forEach(socket => {
      socket.send(JSON.stringify({ username: ws.username, type: "quit" }));
    });
  });
});

server.listen(port, () => {
  console.log("Serwer działa na porcie", port);
});
