const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./electron/preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
    fullscreen: true,
    resizable: false,
    movable: false,
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:6969/");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "./dist/index.html"));

    // Remove the menu (including DevTools shortcuts)
    win.setMenu(null);

    // Disable context menu (right-click) that might have "Inspect Element"
    win.webContents.on('context-menu', (e) => {
      e.preventDefault();
    });

    // Optionally, prevent any manual attempts to open DevTools
    win.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'I' && input.control && input.shift) {
        event.preventDefault();
      }
    });

    // Make sure DevTools are closed
    win.webContents.on('did-finish-load', () => {
      win.webContents.closeDevTools();
    });
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
