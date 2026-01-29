const { app, BrowserWindow, screen, Menu, MenuItem } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('disable-software-rasterizer');

function createWindow () {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const windowWidth = 1200;
  const windowHeight = 900;
  const xPos = Math.floor(primaryDisplay.bounds.x + (primaryDisplay.bounds.width - windowWidth) / 2);
  const yPos = Math.floor(primaryDisplay.bounds.y + (primaryDisplay.bounds.height - windowHeight) / 2) - 50;

  const win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: xPos,
    y: yPos,
    icon: path.join(__dirname, 'icon.png'),
                                backgroundColor: '#3b82f6',
                                transparent: false,
                                frame: true,
                                webPreferences: {
                                  nodeIntegration: true,
                                  contextIsolation: false,
                                  backgroundThrottling: false
                                },
                                autoHideMenuBar: true,
                                center: false
  });

  win.webContents.on('context-menu', (event, params) => {
    const menu = new Menu();
    if (params.isEditable) {
      menu.append(new MenuItem({ label: 'Desfazer', role: 'undo' }));
      menu.append(new MenuItem({ label: 'Refazer', role: 'redo' }));
      menu.append(new MenuItem({ type: 'separator' }));
      menu.append(new MenuItem({ label: 'Cortar', role: 'cut' }));
      menu.append(new MenuItem({ label: 'Copiar', role: 'copy' }));
      menu.append(new MenuItem({ label: 'Colar', role: 'paste' }));
      menu.append(new MenuItem({ label: 'Selecionar Tudo', role: 'selectAll' }));
    } else {
      menu.append(new MenuItem({ label: 'Recarregar', role: 'reload' }));
    }
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
