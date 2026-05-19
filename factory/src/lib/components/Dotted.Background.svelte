<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '$root/utils/settings.svelte';

	let canvas: HTMLCanvasElement;

	$effect(() => {
		if (settings.ecoMode) {
			// El modo Eco detiene el renderizado para ahorrar GPU
		}
	});

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let width: number;
		let height: number;
		
		const dots: { x: number, y: number, phase: number }[] = [];
		const spacing = 40;

		const resize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = 600;
			dots.length = 0;
			for (let x = 0; x < width; x += spacing) {
				for (let y = 0; y < height; y += spacing) {
					dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
				}
			}
		};

		const render = () => {
			if (settings.ecoMode) {
				animationFrameId = requestAnimationFrame(render);
				return;
			}

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = settings.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
			
			const time = Date.now() * 0.001;
			
			dots.forEach(dot => {
				const opacity = Math.sin(time + dot.phase) * 0.5 + 0.5;
				ctx.globalAlpha = opacity * 0.3;
				ctx.beginPath();
				ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
				ctx.fill();
			});

			animationFrameId = requestAnimationFrame(render);
		};

		window.addEventListener('resize', resize);
		resize();
		render();

		return () => {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
