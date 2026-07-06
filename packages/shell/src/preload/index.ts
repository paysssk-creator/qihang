import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("qihang", {
  getPlatformWallet: () => ipcRenderer.invoke("get-platform-wallet"),
  getVersion: () => ipcRenderer.invoke("get-app-version"),
});
