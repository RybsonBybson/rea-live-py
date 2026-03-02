const { ipcMain, BrowserWindow, app } = require("electron");
const WebSocket = require("ws");

// ---- other related

/**
 * @type {BrowserWindow}
 */
const mainWindow = app.mainWin;
const ip = "wss://rea-live-py.onrender.com/";
/**
 * @type {WebSocket | null}
 */
let ws = null;
let isConnected = false;

function connectWS() {
  if (ws && isConnected) return;

  ws = new WebSocket(ip);

  ws.on("open", () => {
    isConnected = true;
  });

  ws.on("close", () => {
    isConnected = false;
  });

  ws.on("error", err => {
    console.error("WS error:", err);
    isConnected = false;
  });

  ws.on("message", msg => {
    mainWindow.webContents.send("ws_data", JSON.parse(msg));
  });
}

function wsRelated() {
  ipcMain.handle("ws_conn", async _ => {
    connectWS();

    return new Promise((resolve, reject) => {
      if (isConnected) return resolve(true);

      ws.once("open", () => resolve(true));
      ws.once("error", err => reject(err.message));
    });
  });

  ipcMain.handle("ws_send", (_, data) => {
    if (!isConnected) return;

    ws.send(JSON.stringify(data));
  });
}

module.exports = { wsRelated };
