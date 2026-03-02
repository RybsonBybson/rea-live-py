const { app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs-extra");

// ---- other related

const publicFolder = app.publicFolder;
const resourcesFolder = path.join(publicFolder, "resources");
fs.ensureDirSync(resourcesFolder);

function otherRelated() {
  ipcMain.handle("o_imagefromoutside", (_, p) => {
    if (!fs.existsSync(p)) return "";

    const name = path.basename(p);
    const fullNewPath = path.join(resourcesFolder, name);
    if (!fs.existsSync(fullNewPath)) {
      fs.copyFileSync(p, fullNewPath);
    }

    return path.join("resources", name);
  });
}

module.exports = { otherRelated };
