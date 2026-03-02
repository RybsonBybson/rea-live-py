const { app, ipcMain } = require("electron");
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");

const execAsync = promisify(exec);

// ---- reaper related

const communicatePath = app.communicatePath;

function reaperRelated() {
  ipcMain.handle("rea_ison", async _ => {
    const { stdout } = await execAsync("tasklist");

    return stdout.includes("reaper.exe");
  });

  ipcMain.handle("rea_isconn", _ => {
    try {
      const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));
      return communicate.connection;
    } catch (e) {}

    return false;
  });

  ipcMain.handle("rea_comms", _ => {
    const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));

    return communicate;
  });

  ipcMain.handle("rea_settracksync", (_, index) => {
    try {
      const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8")) ?? {};
      const n = !communicate.tracks[index].syncing ?? false;
      communicate.tracks[index].syncing = n;
      fs.writeFileSync(communicatePath, JSON.stringify(communicate), "utf-8");

      return n;
    } catch (e) {}

    return false;
  });

  ipcMain.handle("rea_istracksync", (_, index) => {
    try {
      const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8")) ?? {};

      return communicate.tracks[index].syncing ?? false;
    } catch (e) {}

    return false;
  });
}

module.exports = { reaperRelated };
