// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Menu,
  session
} = require('electron')
const path = require('path')
const os = require('os')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'assets/preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      maximizable: false,
      allowRunningInsecureContent: true,
    }
  })
  var menu = Menu.buildFromTemplate([
    {
    label: 'Menu',
    submenu: [
      {
        label: 'Quiter',
        click() {
          app.quit()
        }
      },
      {
        label: 'Debug',
        click() {
          mainWindow.toggleDevTools()
        }
      },
      {
        label: 'Refresh',
        click() {
          mainWindow.reload()
        }
      }
    ]
  },
  { type: 'separator' },
  {
    label: '3CX',
    click() {
      mainWindow.loadURL('https://appel.comon-real.fr/webclient/#/people')
    }
  },
  { type: 'separator' },
  {
    label: 'Frame.io',
    click() {
      mainWindow.loadURL('https://frame.io')
    }
  },
  { type: 'separator' },
  {
    label: 'Google Drive',
    click() {
      mainWindow.loadURL('https://drive.google.com/drive/u/0/folders/1yPR7y1qWI_arTacQBcMMeVkjVJpMryJC')
    }
  },
  { type: 'separator' },
  {
    label: 'Notion',
    click() {
      mainWindow.loadURL('https://www.notion.so/fabriknow')
    }
  }
])
  Menu.setApplicationMenu(menu);
  // and load the index.html of the app.
  mainWindow.loadFile('assets/index.html')
  mainWindow.setTitle("Fabri'Know")
  mainWindow.toggleDevTools()
  //mainWindow.loadURL("https://google.com")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



// Modules to control application life and create native browser window

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
