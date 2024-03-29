import { BrowserWindow, Tray } from 'electron';


export function controlWindow(win: BrowserWindow, tray: Tray) {
	function toggle() {
		if (win.isVisible()) {
			win.hide();
		} else {
			show();
		}
	}

	function show() {
		// pegar o posicionamento da window e da tray
		const position = getPosition();
		// atualizar o posicionamento da window
		win.setPosition(position.x, position.y, false);
		// monstrar a window
		win.show();
		win.focus();
	}

	function getPosition() {
		const winBounds = win.getBounds();
		const trayBounds = tray.getBounds();

		const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2));
		const y = Math.round(trayBounds.y + trayBounds.height + 3);

		return {x, y};
	}

	return { toggle };
}
