const { ipcMain } = require("electron");
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");

const execAsync = promisify(exec);

// ---- reaper related

function reaperRelated(communicatePath) {
  ipcMain.handle("rea_ison", async _ => {
    const { stdout } = await execAsync("tasklist");

    return stdout.includes("reaper.exe");
  });

  ipcMain.handle("rea_isconn", _ => {
    const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));

    return communicate.connection;
  });

  ipcMain.handle("rea_comms", _ => {
    const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));

    return communicate;
  });

  ipcMain.handle("rea_settracksync", (_, index) => {
    const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));
    const n = !communicate.tracks[index].syncing ?? false;
    communicate.tracks[index].syncing = n;
    fs.writeFileSync(communicatePath, JSON.stringify(communicate), "utf-8");

    return n;
  });

  ipcMain.handle("rea_istracksync", (_, index) => {
    const communicate = JSON.parse(fs.readFileSync(communicatePath, "utf-8"));

    return communicate.tracks[index].syncing ?? false;
  });
}

module.exports = { reaperRelated };
