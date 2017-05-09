'use strict';
const electron = require('electron');
const {ipcMain} = require('electron')
const app = electron.app;
const remote = electron.remote;
const dialog = electron.dialog;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    var win = new electron.BrowserWindow({
        width: 1400,
        height: 1000,
        frame: true,
        show: false,
        backgroundColor: '#312450'
    });

    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', onClosed);
    win.once('ready-to-show', () => {
     mainWindow.show()
    })
    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});
