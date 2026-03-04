const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

// ---- window related
/**
 * @type {BrowserWindow}
 */
const mainWin = app.mainWin;
const settingsPath = app.settingsPath;

function windowRelated() {
  ipcMain.handle("win_minimalize", event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.minimize();
  });
  ipcMain.handle("win_close", event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    settings.prefs.hideToTray ? win.hide() : win.destroy();
  });
  ipcMain.handle("win_destroy", event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.destroy();
  });
  ipcMain.handle("win_pin", event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.setAlwaysOnTop(!win.isAlwaysOnTop());
  });

  mainWin.on("always-on-top-changed", () => mainWin.webContents.send("win_pinned", mainWin.isAlwaysOnTop()));
}

module.exports = { windowRelated };
