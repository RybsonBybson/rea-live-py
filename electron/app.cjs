const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const settings = require("../settings.json");
const port = settings.server.port;

const url = `http://localhost:${port}`;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundMaterial: "acrylic",
    frame: false,
  });

  win.loadURL(url);
}

app.whenReady().then(createWindow);

// -----

ipcMain.handle("sendMessage", async (event, data) => {
  return "Odebrano!";
});
