import { Menu, Tray } from 'electron';
import cryptoIcon from '../renderer/src/assets/cryptoTemplate.png?asset';

function createTray(): Tray {
	// Create the app tray.
	const tray = new Tray(cryptoIcon);

	// const contextMenu = Menu.buildFromTemplate([
	// 	{label: 'Item1', type: 'radio', checked: true}
	// ]);

	tray.setToolTip('Crypto Chart');
	// tray.setContextMenu(contextMenu);

	return tray;
}

export default createTray();
