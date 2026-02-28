const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // -- test
  sendMessage: msg => ipcRenderer.invoke("sendMessage", msg),
  // -- settings
  saveSettings: settings => ipcRenderer.invoke("sett_save", settings),
  // -- window
  minimalize: () => ipcRenderer.invoke("win_minimalize"),
  minmax: () => ipcRenderer.invoke("win_minmax"),
  close: () => ipcRenderer.invoke("win_close"),
  pin: () => ipcRenderer.invoke("win_pin"),
  onWindowState: callback => ipcRenderer.on("win_state", (_, state) => callback(state)),
  onPinned: callback => ipcRenderer.on("win_pinned", (_, state) => callback(state)),
  // -- reaper
  isReaperOn: () => ipcRenderer.invoke("rea_ison"),
  isConnection: () => ipcRenderer.invoke("rea_isconn"),
});
