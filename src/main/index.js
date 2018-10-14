import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

const darwinMenu = {
  label: 'Image to Text Talknation, I.R.V.A',
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    {
      role: 'services',
      submenu: [],
    },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideothers' },
    { role: 'unhide' },
    { type: 'separator' },
    {
      label: 'Quit',
      accelerator: 'CommandOrControl+Q',
      click() {
        window.destroy();
      },
    },
  ],
};
const menu = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'selectall' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'toggledevtools' },
    ],
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Help',
        click() { shell.openExternal('https://github.com/iamkishann/license-plate-identifier'); },
      },
    ],
  },
];

let window;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createMainWindow();
  } else {
    window.show();
  }
});

app.on('ready', () => {
  createMainWindow();
  createMenu();
});

ipcMain.on('post', (event, notification, data) => window.webContents.send(notification, data));

function createMainWindow() {
  window = new BrowserWindow({
    title: 'Image to Text Talknation, I.R.V.A',
    show: false,
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('ready-to-show', () => {
    window.show();
    window.focus();
  });

  window.on('close', event => {
    event.preventDefault();
    window.hide();
  });

  window.on('closed', () => {
    window = null;
    app.quit();
  });
}

function createMenu() {
  if (process.platform === 'darwin') {
    menu.unshift(darwinMenu);
  } else {
    menu.push({ type: 'separator' }, { role: 'quit' });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}
