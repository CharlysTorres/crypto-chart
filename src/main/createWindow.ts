import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import { BrowserWindow, shell } from 'electron';
import icon from '../renderer/src/assets/cryptoTemplate.png?asset';

export function createWindow(): void {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 250,
		height: 350,
		show: false,
		// frame: false,
		resizable: false,
		alwaysOnTop: true,
		fullscreenable: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			sandbox: false
		}
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}
}
