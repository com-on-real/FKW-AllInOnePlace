const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  session
} = require('electron')
const path = require('path')
const os = require('os')
require('update-electron-app')({
  repo: 'com-on-real/FKW-AllInOnePlace',
  updateInterval: '5 minutes',
  logger: require('electron-log')
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    webPreferences: {
      // preload: path.join(__dirname, 'assets/preload.js'),
      enableRemoteModule: true,
      modal: true,
      nodeIntegration: true,
      maximizable: false,
      webviewTag: true,
      allowRunningInsecureContent: true,
      contextIsolation: false,
    }
  })
//   mainWindow.webContents.on('new-window', (event, url) => {
//     event.preventDefault()
//     mainWindow.loadURL(url)
// })

// TEST
// const win = new BrowserWindow({ width: 800, height: 600 })
// win.loadURL('https://www.notion.so/fabriknow')

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
 
  mainWindow.loadFile('assets/index.html')
  mainWindow.setTitle("Fabri'Know")
  mainWindow.setMenu(null)
  //mainWindow.toggleDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

