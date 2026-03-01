const { BrowserWindow, ipcMain } = require("electron");

// ---- window related

function windowRelated(settings) {
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
}

module.exports = { windowRelated };
