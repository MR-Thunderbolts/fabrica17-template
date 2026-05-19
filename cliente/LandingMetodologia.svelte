<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from './reveal';

	const cards = [
		{
			pill: "METODOLOGÍA CICLO17",
			pillColor: "rgba(255, 255, 255, 0.7)",
			title: "Un proceso diseñado para lograr resultados",
			desc: "Un proceso que elimina riesgos en la ejecución y es 100% colaborativo con nuestros clientes.",
			gradientBorder: "linear-gradient(135deg, rgba(214, 244, 122, 0.5), rgba(255, 255, 255, 0.08) 50%, rgba(215, 144, 240, 0.5))",
			glowColor: "rgba(215, 144, 240, 0.12)",
			surfaceTint: "rgba(215, 144, 240, 0.03)"
		},
		{
			pill: "PERFORMANCE — UX",
			stepNumber: "01",
			pillColor: "#d790f0",
			title: "Brief y planificación",
			subtitle: "ROADMAP ACCIONABLE",
			desc: "Iniciamos el proyecto con un taller, para entenderte a ti y tus objetivos y modelo de negocio diseñamos una planificación alineada a tus necesidades.",
			gradientBorder: "linear-gradient(135deg, rgba(215, 144, 240, 0.7), rgba(255, 255, 255, 0.06) 50%, rgba(215, 144, 240, 0.3))",
			glowColor: "rgba(215, 144, 240, 0.18)",
			surfaceTint: "rgba(215, 144, 240, 0.05)"
		},
		{
			pill: "DISEÑO",
			stepNumber: "02",
			pillColor: "#d6f47a",
			title: "Descubrimiento",
			subtitle: "INVESTIGACIÓN & ARQUITECTURA",
			desc: "Con los objetivos de negocio claros, nos enfocamos en entender el mercado, tus clientes, organizamos la información de tu sitio y trazamos la mejor experiencia antes diseñar una pantalla ó tocar un línea de código.",
			gradientBorder: "linear-gradient(135deg, rgba(214, 244, 122, 0.7), rgba(255, 255, 255, 0.06) 50%, rgba(214, 244, 122, 0.3))",
			glowColor: "rgba(214, 244, 122, 0.15)",
			surfaceTint: "rgba(214, 244, 122, 0.04)"
		},
		{
			pill: "DESARROLLO WEB",
			stepNumber: "03",
			pillColor: "#ffffff",
			title: "Diseño web eficiente",
			subtitle: "DISEÑO UX/UI",
			desc: "Diseñamos o ajustamos la interface actual, siempre coherente a los objetivos de negocio y necesidades de l@s usuri@s. Nos aseguramos que tu sitio sea amigable, que convierta, accesible y muy fácil de usar.",
			gradientBorder: "linear-gradient(135deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.1) 50%, rgba(214, 244, 122, 0.65))",
			glowColor: "rgba(255, 255, 255, 0.10)",
			surfaceTint: "rgba(255, 255, 255, 0.03)"
		},
		{
			pill: "OPTIMIZACIÓN",
			stepNumber: "04",
			pillColor: "#d790f0",
			title: "Desarrollo limpio",
			subtitle: "GREEN CODING",
			desc: "Codificamos u optimizamos tu sitio, con foco en el rendimiento y la eficiencia. Nuestro stack tecnológico apunta hacia un código eficiente, scalable y liviano que genere resultados y el menor impacto ambiental digital.",
			gradientBorder: "linear-gradient(135deg, rgba(215, 144, 240, 0.85), rgba(255, 255, 255, 0.08) 50%, rgba(214, 244, 122, 0.85))",
			glowColor: "rgba(215, 144, 240, 0.20)",
			surfaceTint: "rgba(215, 144, 240, 0.06)"
		}
	];

	let sectionRef: HTMLElement;
	let isLocked = false;
	let targetProgress = 0;    // Driven by wheel delta
	let progress = $state(0);  // Smoothly interpolated (renders cards)
	let rafId: number;

	// Glow follows the topmost fully-arrived card
	let activeGlowIndex = $derived(
		Math.min(cards.length - 1, Math.max(0, Math.round(progress * (cards.length - 1))))
	);

	function lockPage() {
		if (isLocked) return;
		isLocked = true;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overscrollBehavior = 'none';
		document.body.style.overscrollBehavior = 'none';
		// Suavemente centra la sección en la pantalla (menor salto = menor sensación de succión)
		sectionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function unlockPage() {
		if (!isLocked) return;
		isLocked = false;
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
		document.documentElement.style.overscrollBehavior = '';
		document.body.style.overscrollBehavior = '';
	}

	/**
	 * Compute each card's physical position from continuous progress.
	 */
	function getCardStyle(i: number): string {
		const segment = progress * (cards.length - 1); // 0 → 4

		let translateY = 0;
		let scale = 1;
		let opacity = 1;
		let zIndex = i;
		let brightness = 1;

		if (i === 0) {
			const levelsAbove = Math.max(0, segment);
			translateY = -levelsAbove * 3;
			scale = Math.max(0.88, 1 - levelsAbove * 0.025);
			opacity = Math.max(0.2, 1 - levelsAbove * 0.2);
			brightness = Math.max(0.45, 1 - levelsAbove * 0.13);
			zIndex = 1;
		} else {
			const arrival = segment - (i - 1); // 0 = appearing, 1 = fully placed

			if (arrival <= 0) {
				translateY = 110;
				scale = 0.92;
				opacity = 0;
				zIndex = i;
			} else if (arrival < 1) {
				// Ease-out curve for the physical slide
				const eased = 1 - Math.pow(1 - arrival, 2.5);
				translateY = (1 - eased) * 100;
				scale = 0.94 + eased * 0.06;
				opacity = Math.min(1, arrival * 1.5);
				brightness = 1;
				zIndex = i + cards.length;
			} else {
				const levelsAbove = Math.max(0, segment - i);
				translateY = -levelsAbove * 3;
				scale = Math.max(0.88, 1 - levelsAbove * 0.025);
				opacity = Math.max(0.2, 1 - levelsAbove * 0.2);
				brightness = Math.max(0.45, 1 - levelsAbove * 0.13);
				zIndex = i;
			}
		}

		return `
			--border-grad: ${cards[i].gradientBorder};
			--surface-tint: ${cards[i].surfaceTint};
			--pill-color: ${cards[i].pillColor};
			transform: translateY(${translateY}%) scale(${scale});
			opacity: ${opacity};
			filter: brightness(${brightness});
			z-index: ${zIndex};
		`;
	}

	onMount(() => {
		// Smooth animation loop: lerp progress toward target
		function animate() {
			const diff = targetProgress - progress;
			if (Math.abs(diff) > 0.001) {
				progress += diff * 0.1; // Smooth damping factor
			} else {
				progress = targetProgress;
			}

			// Check unlock conditions AFTER settling
			if (progress >= 0.995 && targetProgress >= 1) {
				progress = 1;
				targetProgress = 1;
				unlockPage();
			} else if (progress <= 0.005 && targetProgress <= 0) {
				progress = 0;
				targetProgress = 0;
				unlockPage();
			}

			rafId = requestAnimationFrame(animate);
		}
		rafId = requestAnimationFrame(animate);

		// Lock when the section is well within the viewport.
		// Detect entry direction to set correct initial progress.
		let lastScrollY = window.scrollY;
		window.addEventListener('scroll', () => { lastScrollY = window.scrollY; }, { passive: true });

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isLocked) {
						// Determine entry direction from boundingClientRect
						const rect = entry.boundingClientRect;
						const enteringFromBelow = rect.top > 0;
						if (enteringFromBelow) {
							// Scrolling down into section — start at 0
							targetProgress = 0;
							progress = 0;
						} else {
							// Scrolling up into section — start at end so cards reverse
							targetProgress = 1;
							progress = 1;
						}
						lockPage();
					}
				});
			},
			{ threshold: 0.8 }
		);
		if (sectionRef) observer.observe(sectionRef);

		// Wheel → accumulate into targetProgress
		// Total "virtual scroll distance" = 4000px worth of wheel delta for full progress
		const TOTAL_SCROLL_DISTANCE = 4000;

		const handleWheel = (e: WheelEvent) => {
			if (!isLocked) return;
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();

			targetProgress += e.deltaY / TOTAL_SCROLL_DISTANCE;
			// Allow slight overshoot so the unlock condition triggers
			targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
		};

		// Keyboard scroll blocking
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isLocked) return;
			const keys = ['ArrowDown', 'ArrowUp', 'Space', ' ', 'PageDown', 'PageUp'];
			if (keys.includes(e.key)) {
				e.preventDefault();
				const delta = ['ArrowDown', 'PageDown', ' ', 'Space'].includes(e.key) ? 200 : -200;
				targetProgress += delta / TOTAL_SCROLL_DISTANCE;
				targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
			}
		};

		// Touch support
		let touchStartY = 0;
		const handleTouchStart = (e: TouchEvent) => {
			touchStartY = e.touches[0].clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isLocked) return;
			e.preventDefault();
			e.stopPropagation();

			const deltaY = touchStartY - e.touches[0].clientY;
			touchStartY = e.touches[0].clientY;

			targetProgress += deltaY / TOTAL_SCROLL_DISTANCE;
			targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
		};

		window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
		window.addEventListener('keydown', handleKeyDown, { capture: true });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

		return () => {
			cancelAnimationFrame(rafId);
			observer.disconnect();
			unlockPage();
			window.removeEventListener('wheel', handleWheel, { capture: true });
			window.removeEventListener('keydown', handleKeyDown, { capture: true });
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove, { capture: true });
		};
	});
</script>

<section class="meto-section" bind:this={sectionRef}>
	<!-- Ambient glow -->
	<div
		class="ambient-glow"
		style="background: radial-gradient(ellipse at 70% 60%, {cards[activeGlowIndex].glowColor} 0%, transparent 70%);"
	></div>

	<!-- Card Stack -->
	<div class="card-stack">
		{#each cards as card, i}
			<div class="stack-card" style={getCardStyle(i)}>
				<div class="card-inner">
					<div class="card-content-wrapper">
						<div class="card-left">
							{#if i === 0}
								<h2 class="card-title">{card.title}</h2>
							{:else}
								<div class="title-row">
									<div class="circle-number" style="border-color: {card.pillColor}">
										{card.stepNumber}
									</div>
									<h2 class="card-title">{card.title}</h2>
								</div>
								<div class="card-subtitle-wrapper">
									<span class="card-subtitle">{card.subtitle}</span>
								</div>
							{/if}
						</div>
						<div class="card-right">
							<p class="card-desc">{card.desc}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.meto-section {
		position: relative;
		width: 100%;
		height: 100vh;
		height: 100dvh;
		background: var(--color-surface-dark);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--section-pad-md) var(--gutter);
		padding-top: max(80px, env(safe-area-inset-top, 80px));
		padding-bottom: max(80px, env(safe-area-inset-bottom, 80px));
	}

	.ambient-glow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		transition: background 0.8s var(--ease-out-expo);
	}

	/* ── Card Stack ── */
	.card-stack {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1128px;
		height: clamp(340px, 50vh, 390px);
	}

	.stack-card {
		position: absolute;
		inset: 0;
		padding: 1.5px;
		border-radius: var(--radius-md);
		background: var(--border-grad);
		will-change: transform, opacity, filter;
		pointer-events: none;
	}

	.card-inner {
		background: linear-gradient(
			165deg,
			color-mix(in srgb, var(--color-audit-surface) 96%, var(--surface-tint)),
			var(--color-audit-surface) 60%
		);
		border-radius: calc(var(--radius-md) - 1.5px);
		height: 100%;
		width: 100%;
		padding: 44px 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.card-content-wrapper {
		display: flex;
		align-items: flex-start;
		width: 100%;
		gap: 64px;
	}

	.card-left {
		flex: 1.25;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.title-row {
		display: flex;
		align-items: flex-start;
		gap: 18px;
		width: 100%;
	}

	.circle-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: 1.5px solid var(--pill-color);
		color: var(--color-white);
		font-family: var(--font-headline);
		font-size: 13px;
		font-weight: 600;
		flex-shrink: 0;
		margin-top: 3px;
	}

	.card-title {
		font-family: var(--font-headline);
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.2;
		margin: 0;
	}

	.card-subtitle-wrapper {
		margin-left: 56px; /* Align perfectly under title when circle is 38px + 18px gap = 56px */
	}

	.card-subtitle {
		font-family: var(--font-headline);
		font-size: 12px;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.card-right {
		flex: 1;
		max-width: 460px;
		display: flex;
		align-items: flex-start;
		padding-top: 6px; /* Fine-tune baseline alignment with first line of title */
	}

	.card-desc {
		font-family: var(--font-body);
		font-size: 17px;
		font-weight: 400;
		color: var(--color-audit-fg);
		line-height: 1.55;
		margin: 0;
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.meto-section {
			padding: 40px 16px;
			padding-top: max(48px, env(safe-area-inset-top, 48px));
			padding-bottom: max(48px, env(safe-area-inset-bottom, 48px));
		}

		.card-stack {
			height: clamp(300px, 55vh, 350px);
		}

		.card-inner {
			padding: 28px 24px;
		}

		.card-content-wrapper {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}

		.card-left {
			gap: 8px;
			width: 100%;
		}

		.card-title {
			font-size: 26px;
			line-height: 1.15;
			font-weight: 700;
			letter-spacing: -0.015em;
		}

		.card-right {
			max-width: 100%;
			width: 100%;
			align-items: flex-start;
			margin-bottom: 0;
		}

		.card-desc {
			font-size: 15px;
			line-height: 1.5;
			color: rgba(212, 216, 228, 0.9);
		}
	}

	@media (max-width: 480px) {
		.card-stack {
			height: 310px;
		}

		.card-inner {
			padding: 22px 20px;
			gap: 12px;
		}

		.card-title {
			font-size: 22px;
			line-height: 1.2;
		}

		.card-desc {
			font-size: 14px;
			line-height: 1.45;
		}
	}
</style>
