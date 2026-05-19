/**
 * @file settings.svelte.ts
 * @description Gestor global de estado para Temas y Modo Eco.
 * Blindado para SSR (Server Side Rendering).
 */

class AppSettings {
	theme = $state<'dark' | 'light'>('dark');
	ecoMode = $state(false);

	constructor() {
		// Inicialización segura en el cliente
		if (typeof document !== 'undefined') {
			const savedTheme = localStorage.getItem('fabrica-theme') as 'dark' | 'light';
			if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
				this.theme = savedTheme;
				this.updateDocument();
			}
		}
	}

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		if (typeof document !== 'undefined') {
			localStorage.setItem('fabrica-theme', this.theme);
			this.updateDocument();
		}
	}

	toggleEcoMode() {
		this.ecoMode = !this.ecoMode;
	}

	private updateDocument() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', this.theme);
		}
	}
}

export const settings = new AppSettings();
