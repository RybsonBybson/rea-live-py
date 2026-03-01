const { ipcMain } = require("electron");

// ---- test related

function testrelated() {
  ipcMain.handle("sendMessage", async (event, data) => {
    return "Odebrano!";
  });
}

module.exports = { testrelated };
