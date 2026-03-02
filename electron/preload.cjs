const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // -- other
  imageFromOutside: p => ipcRenderer.invoke("o_imagefromoutside", p),
  // -- settings
  saveSettings: settings => ipcRenderer.invoke("sett_save", settings),
  // -- window
  minimalize: () => ipcRenderer.invoke("win_minimalize"),
  minmax: () => ipcRenderer.invoke("win_minmax"),
  close: () => ipcRenderer.invoke("win_close"),
  destroy: () => ipcRenderer.invoke("win_destroy"),
  pin: () => ipcRenderer.invoke("win_pin"),
  onWindowState: callback => ipcRenderer.on("win_state", (_, state) => callback(state)),
  onPinned: callback => ipcRenderer.on("win_pinned", (_, state) => callback(state)),
  // -- reaper
  isReaperOn: () => ipcRenderer.invoke("rea_ison"),
  isConnection: () => ipcRenderer.invoke("rea_isconn"),
  communication: () => ipcRenderer.invoke("rea_comms"),
  setTrackSync: index => ipcRenderer.invoke("rea_settracksync", index),
  isTrackSyncing: index => ipcRenderer.invoke("rea_istracksync", index),
  // -- ws
  connect: () => ipcRenderer.invoke("ws_conn"),
  send: data => ipcRenderer.invoke("ws_send", data),
  onData: callback => ipcRenderer.on("ws_data", (_, data) => callback(data)),
});
