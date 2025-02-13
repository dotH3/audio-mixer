const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

let tray;

app.whenReady().then(() => {
  // createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  tray = new Tray(path.join(__dirname, 'emojis', 'speaker.png'));  
  const contextMenu = Menu.buildFromTemplate([
    { label: "Mostrar", click: () => console.log("Mostrar ventana") },
    { label: "Salir", click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Mi App");
});
