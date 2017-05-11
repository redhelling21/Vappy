'use strict';
const electron = require('electron');
const {ipcMain} = require('electron');
const json2xls = require('json2xls');
const fs = require('fs');
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

ipcMain.on('exportProd', (event, arg) => {
    exportDB(arg,'db_production.xlsx', event);
})

ipcMain.on('exportInv', (event, arg) => {
    exportDB(arg,'db_inventaire.xlsx', event);
})

ipcMain.on('exportVente', (event, arg) => {
    exportDB(arg, 'db_vente.xlsx', event);
})

var exportDB = async function(db, filename, event){
    var xls = json2xls(db);
    var promise = await WriteFile(filename, xls);
    event.sender.send('exportDataBase-reply');
}

function WriteFile(fileName, data)
{
    return new Promise(function(resolve, reject) {
    fs.writeFile(fileName, data, 'binary', function(err) {
        if (err) reject(err);
        else resolve(data);
    });
});
}
