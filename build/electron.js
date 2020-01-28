const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const API = require(path.resolve('../bed'));

const conf = {
  windowWidth: 1280,
  windowHeight: 800,
  icon: path.join(__dirname, '/public/favico.ico'),
}

let mainWindow;

function createWindow(isDev) {
  mainWindow = new BrowserWindow({
    width: conf.windowWidth, 
    height: conf.windowHeight,
    icon: conf.icon,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if(isDev){
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  let isDevMode = true;
  if(process.argv.indexOf('--dev') < 0){
    isDevMode = false;
  }
  createWindow(isDevMode);
  const api = new API();
  api.init(app.getPath('documents'));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});