const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow () {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    x: Math.floor(primaryDisplay.bounds.x + (primaryDisplay.bounds.width - 1200) / 2),
                                y: Math.floor(primaryDisplay.bounds.y + (primaryDisplay.bounds.height - 900) / 2),
                                icon: path.join(__dirname, 'icon.png'),
                                webPreferences: {
                                  nodeIntegration: true,
                                contextIsolation: false
                                },
                                autoHideMenuBar: true,
                                center: true
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
