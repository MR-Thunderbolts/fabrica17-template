import { settings } from './settings.svelte';

/**
 * @file glow-action.ts
 * @description Acción de Svelte 5 para seguir el mouse y crear efectos de brillo.
 * Respeta el modo Eco de Fabrica17.
 */
export function glow(node: HTMLElement) {
	const handleMouseMove = (e: MouseEvent) => {
		if (settings.ecoMode) return;

		const rect = node.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		node.style.setProperty('--mouse-x', `${x}px`);
		node.style.setProperty('--mouse-y', `${y}px`);
		node.style.setProperty('--glow-opacity', '1');
	};

	const handleMouseLeave = () => {
		node.style.setProperty('--glow-opacity', '0');
	};

	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
