const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8765 });

wss.on("connection", ws => {
  console.log("Nowy klient połączony");

  // Odbieranie wiadomości od klienta
  ws.on("message", message => {
    console.log("Otrzymano:", message);
    ws.send(`Echo: ${message}`); // odsyłamy wiadomość z powrotem
  });

  // Zamknięcie połączenia
  ws.on("close", () => {
    console.log("Klient rozłączony");
  });
});
