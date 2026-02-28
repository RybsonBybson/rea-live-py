const http = require("http");
const WebSocket = require("ws");

const port = process.env.PORT || 8765;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Serwer działa");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("Nowy klient połączony");

  ws.on("message", message => {
    console.log("Otrzymano:", message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Klient rozłączony");
  });
});

server.listen(port, () => {
  console.log("Serwer działa na porcie", port);
});
