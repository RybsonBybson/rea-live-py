const { ipcMain } = require("electron");
const fs = require("fs");

// ---- settings related

function settingsRelated(settings, settingsPath) {
  ipcMain.handle("sett_save", (event, newSettings) => {
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf-8");
    settings = newSettings;
  });
}

module.exports = { settingsRelated };
