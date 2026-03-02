const { app, ipcMain } = require("electron");
const fs = require("fs");

// ---- settings related

const settingsPath = app.settingsPath;

function settingsRelated() {
  ipcMain.handle("sett_save", (event, newSettings) => {
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf-8");
  });
}

module.exports = { settingsRelated };
