const { app, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

// ---- settings related

const settingsPath = path.join(app.getAppPath(), "settings.json");

function settingsRelated() {
  ipcMain.handle("sett_save", (event, newSettings) => {
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf-8");
  });
}

module.exports = { settingsRelated };
