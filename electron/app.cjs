const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const settings = require("../settings.json");
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const { settingscheck } = require("./settingscheck.cjs");
const execAsync = promisify(exec);
settingscheck();

const settingsPath = path.join(__dirname, "..", "settings.json");
const communicatePath = path.join(__dirname, "..", "communicate.json");

const port = settings.server.port;
const url = `http://localhost:${port}`;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: settings.app.name,
    webPreferences: { preload: path.join(__dirname, "preload.cjs"), contextIsolation: true, nodeIntegration: false },
    backgroundMaterial: "acrylic",
    frame: false,
    roundedCorners: true,
    fullscreenable: false,
    alwaysOnTop: false,
  });

  win.loadURL(url);
  win.on("maximize", () => win.webContents.send("win_state", "maximized"));
  win.on("unmaximize", () => win.webContents.send("win_state", "restored"));
  win.on("always-on-top-changed", () => win.webContents.send("win_pinned", win.isAlwaysOnTop()));
}

app.whenReady().then(() => {
  createWindow();
});

// -- test

ipcMain.handle("sendMessage", async (event, data) => {
  return "Odebrano!";
});

// -- settings related

ipcMain.handle("sett_save", (event, settings) => {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
});

// ---- window related

ipcMain.handle("win_minimalize", event => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.minimize();
});
ipcMain.handle("win_minmax", event => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});
ipcMain.handle("win_close", event => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.destroy();
});
ipcMain.handle("win_pin", event => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.setAlwaysOnTop(!win.isAlwaysOnTop());
});

// ---- reaper related

ipcMain.handle("rea_ison", async event => {
  const { stdout } = await execAsync("tasklist");

  return stdout.includes("reaper.exe");
});

ipcMain.handle("rea_isconn", event => {
  const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));

  return communicate.connection;
});
