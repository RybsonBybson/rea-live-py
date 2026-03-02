const fs = require("fs");
const os = require("os");
const { app } = require("electron");

const info = os.userInfo();

function settingscheck() {
  const settingsPath = app.settingsPath;

  if (!fs.existsSync(settingsPath)) fs.writeFileSync(settingsPath, JSON.stringify({}, null, 2), "utf-8");

  const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

  if (!settings.app) settings.app = {};
  if (!settings.app.name) settings.app.name = "Rea-Multiplayer";
  if (!settings.app.shortened) settings.app.shortened = "rea-multi";

  if (!settings.server) settings.server = {};
  if (!settings.server.port) settings.server.port = 5173;

  if (!settings.user) settings.user = {};
  if (!settings.user.name) settings.user.name = info.username;

  if (!settings.prefs) settings.prefs = {};
  if (!settings.prefs.hideToTray) settings.prefs.hideToTray = false;
  if (!settings.prefs.refreshDelay) settings.prefs.refreshDelay = 1000;

  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
}

module.exports = { settingscheck };
