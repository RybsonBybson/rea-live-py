const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  sendMessage: (msg) => ipcRenderer.invoke("sendMessage", msg),
});
