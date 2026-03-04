const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { settingscheck } = require("./settingscheck.cjs");

const isDev = process.env.NODE_ENV === "development";

const appPath = app.getAppPath();

const settingsPath = path.join(appPath, "settings.json");
const communicatePath = path.join(os.tmpdir(), "communicate.json");
const publicFolder = path.join(appPath, isDev ? "public" : "dist");
const iconPath = path.join(publicFolder, "rea-multi.png");

app.settingsPath = settingsPath;
app.communicatePath = communicatePath;
app.publicFolder = publicFolder;

settingscheck();

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

const port = settings.server.port;
const url = isDev ? `http://localhost:${port}` : path.join(appPath, "dist/index.html");

let tray;
let mainWin;

function createWindow() {
  mainWin = new BrowserWindow({
    title: settings.app.name,
    webPreferences: { preload: path.join(__dirname, "preload.cjs"), contextIsolation: true, nodeIntegration: false, devTools: isDev },
    backgroundMaterial: "acrylic",
    frame: false,
    roundedCorners: true,
    fullscreenable: false,
    alwaysOnTop: false,
    resizable: false,
  });

  app.mainWin = mainWin;

  mainWin.loadURL(url);
}

function createTray() {
  if (!mainWin) return;

  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        mainWin.destroy();
      },
    },
  ]);

  tray.setToolTip(settings.app.name);

  tray.on("click", () => {
    if (mainWin.isVisible()) {
      mainWin.hide();
    } else {
      mainWin.show();
    }
  });

  tray.setContextMenu(contextMenu);

  mainWin.on("close", event => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWin.hide(); // zamiast zamknąć → chowa do tray
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  if (settings.prefs.hideToTray) createTray();

  // -- apis
  const { windowRelated } = require("./api/window.cjs");
  const { otherRelated } = require("./api/other.cjs");
  const { settingsRelated } = require("./api/settings.cjs");
  const { reaperRelated } = require("./api/reaper.cjs");
  const { wsRelated } = require("./api/ws.cjs");

  otherRelated();
  windowRelated();
  settingsRelated();
  reaperRelated();
  wsRelated();
});
