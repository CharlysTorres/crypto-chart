import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import { ipcMain, Tray, BrowserWindow } from 'electron';

import icon from '../renderer/src/assets/cryptoTemplate.png?asset';
import { controlWindow } from './controlWindow';

let mainTray: Tray | undefined;
let mainWindow: BrowserWindow | undefined;

// const windowDefaultSize = {
// 	width: 200,
// 	height: 300,
// 	margin: {
// 		x: 0,
// 		y: 0
// 	}
// };

export function initTray() {
	function createWindow(): void {
		// Create the browser window.
		mainWindow = new BrowserWindow({
			width: 250,
			height: 310,
			show: false,
			frame: false,
			resizable: false,
			// transparent: true,
			autoHideMenuBar: true,
			fullscreenable: false,
			...(process.platform === 'linux' ? { icon } : {}),
		});

		mainWindow.setMenu(null);

		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
		} else {
			mainWindow.loadFile(join(__dirname, '../renderer/index.html/#tray'));
			// mainWindow.loadURL(`file:///${join(__dirname, '../renderer/index.html')}#/tray`);
		}

		mainWindow.hide();
		mainWindow.on('blur', () => {
			if (!mainWindow) return;
			if (!mainWindow.webContents.isDevToolsOpened()) {
				mainWindow.hide();
				ipcMain.emit('tray-window-hidden', {window: mainWindow, tray: mainTray});
			}
		});
		mainWindow.on('close', (event) => {
			if (!mainWindow) return;
			event.preventDefault();
			mainWindow.hide();
		// ipcMain.emit('tray-window-hidden', {window: mainWindow, tray: mainTray});
		});
	}

	function createTray(): void {
		// Create the app tray.
		mainTray = new Tray(icon);
		createWindow();

		// const { toggle } = controlWindow(mainWindow, mainTray);
		mainTray.setToolTip('Crypto Chart');

		mainTray.on('click', () => {
			ipcMain.emit('tray-window-clicked', {window: mainWindow, tray: mainTray});
			toggleTrayWindow();
			// toggle();
			alignWindow();
			ipcMain.emit('tray-window-ready', {window: mainWindow, tray: mainTray});
		});
	}
	createTray();

	function toggleTrayWindow() {
		if (!mainWindow) return;
		if (mainWindow.isVisible()) {
			mainWindow.hide();
		} else {
			mainWindow.show();
		}

		ipcMain.emit('tray-window-hidden', {window: mainWindow, tray: mainTray});
	}

	function getPosition(win: BrowserWindow, tray: Tray) {
		const winBounds = win.getBounds();
		const trayBounds = tray.getBounds();

		const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2));
		const y = Math.round(trayBounds.y + trayBounds.height + 3);

		return {x, y};
	}

	function alignWindow() {
		if (!mainWindow) return;

		const position = getPosition(mainWindow, mainTray);
		if (!position) return;

		mainWindow.setBounds({
			width: 250,
			height: 310,
			x: position.x,
			y: position.y
		});
	}
}
