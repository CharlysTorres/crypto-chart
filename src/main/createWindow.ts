import { BrowserWindow } from 'electron';
import icon from '../renderer/src/assets/cryptoTemplate.png?asset';

export function createWindow(): BrowserWindow {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 250,
		height: 310,
		frame: false,
		resizable: false,
		fullscreenable: false,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
	});

	return mainWindow;
}
