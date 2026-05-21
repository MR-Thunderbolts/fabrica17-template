<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from './reveal';

	const cards = [
		{
			pill: "METODOLOGÍA CICLO17",
			title: "Un proceso diseñado\npara lograr resultados",
			desc: "Un proceso que elimina riesgos en la ejecución y es 100% colaborativo con nuestros clientes.",
			glowColor: "rgba(215, 144, 240, 0.12)"
		},
		{
			stepNumber: "01",
			pillColor: "var(--color-primary)",
			title: "Brief y planificación",
			subtitle: "ROADMAP ACCIONABLE",
			desc: "Iniciamos el proyecto con un taller, para entenderte a ti y tus objetivos y modelo de negocio diseñamos una planificación alineada a tus necesidades.",
			glowColor: "rgba(215, 144, 240, 0.18)"
		},
		{
			stepNumber: "02",
			pillColor: "var(--color-accent-primary)",
			title: "Descubrimiento",
			subtitle: "INVESTIGACIÓN & ARQUITECTURA",
			desc: "Con los objetivos de negocio claros, nos enfocamos en entender el mercado, tus clientes, organizamos la información de tu sitio y trazamos la mejor experiencia antes diseñar una pantalla ó tocar un línea de código.",
			glowColor: "rgba(214, 244, 122, 0.15)"
		},
		{
			stepNumber: "03",
			pillColor: "var(--color-white)",
			title: "Diseño web eficiente",
			subtitle: "DISEÑO UX/UI",
			desc: "Diseñamos o ajustamos la interface actual, siempre coherente a los objetivos de negocio y necesidades de l@s usuri@s. Nos aseguramos que tu sitio sea amigable, que convierta, accesible y muy fácil de usar.",
			glowColor: "rgba(255, 255, 255, 0.10)"
		},
		{
			stepNumber: "04",
			pillColor: "var(--color-primary)",
			title: "Desarrollo limpio",
			subtitle: "GREEN CODING",
			desc: "Codificamos u optimizamos tu sitio, con foco en el rendimiento y la eficiencia. Nuestro stack tecnológico apunta hacia un código eficiente, escalable y liviano que genere resultados y el menor impacto ambiental digital.",
			glowColor: "rgba(215, 144, 240, 0.20)"
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

	// Track last unlock time to prevent immediate re-lock from iOS momentum scroll
	let unlockTime = 0;

	function lockPage() {
		if (isLocked) return;
		if (Date.now() - unlockTime < 800) return; // Ignore for 800ms after unlock
		isLocked = true;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		document.body.style.overscrollBehavior = 'none';
		document.documentElement.style.overscrollBehavior = 'none';
		// Suavemente centra la sección en la pantalla (menor salto = menor sensación de succión)
		sectionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function unlockPage() {
		if (!isLocked) return;
		isLocked = false;
		unlockTime = Date.now(); // Start cooldown window
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
		document.body.style.overscrollBehavior = '';
		document.documentElement.style.overscrollBehavior = '';
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
					if (entry.isIntersecting && !isLocked && (Date.now() - unlockTime > 800)) {
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
		// TOTAL_SCROLL_DISTANCE: trackpad/mouse wheel
		const TOTAL_SCROLL_DISTANCE = 3200;
		// TOUCH_SCROLL_DISTANCE: 3 typical swipes on iPhone to complete sequence
		const TOUCH_SCROLL_DISTANCE = 600;

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

			// Use a shorter distance for touch — finger travel is much shorter than trackpad
			targetProgress += deltaY / TOUCH_SCROLL_DISTANCE;
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
				{#if i === 0}
					<div class="card-inner-top">
						<span class="top-pill">{card.pill}</span>
						<div class="top-inner">
							<div class="top-left">
								<h2 class="top-title">
									{#each card.title.split('\n') as line, idx}
										{line}{#if idx === 0}<br aria-hidden="true" />{/if}
									{/each}
								</h2>
							</div>
							<div class="top-right">
								<p class="top-desc">{card.desc}</p>
							</div>
						</div>
					</div>
				{:else}
					<div class="card-inner-step">
						<div class="step-left">
							<div class="number-block" style="border-color: {card.pillColor}; color: {card.pillColor}">
								{card.stepNumber}
							</div>
							<div class="title-block">
								<h3 class="step-title">{card.title}</h3>
								<span class="step-subtitle" style="color: {card.pillColor}">{card.subtitle}</span>
							</div>
						</div>
						<div class="step-right">
							<p class="step-desc">{card.desc}</p>
						</div>
					</div>
				{/if}
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
		height: clamp(260px, 32vh, 310px); /* Increased to prevent text cropping on multiline titles */
	}

	.stack-card {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-xl);
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-card);
		/* Subtle top-edge highlight for depth and premium feel */
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.07),
			0 4px 24px rgba(0, 0, 0, 0.2);
		will-change: transform, opacity, filter;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* ── Top Card (Index 0) ── */
	.card-inner-top {
		height: 100%;
		width: 100%;
		padding: var(--space-10) var(--space-10); /* More horizontal padding */
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start; /* Prevents overflow clipping at the top */
		gap: var(--space-5);
		background-image: linear-gradient(170.7deg, rgba(218, 147, 255, 0.2) 0%, rgba(218, 147, 255, 0) 50%, rgba(222, 246, 149, 0.3) 100%);
	}

	/* Two-column layout for the top card matching the Figma spec */
	.top-inner {
		display: flex;
		align-items: flex-start;
		gap: var(--space-6);
		width: 100%;
	}

	.top-left {
		flex: 1.2;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.top-right {
		flex: 1;
		display: flex;
		align-items: flex-start;
	}

	.top-pill {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-accent-primary);
		letter-spacing: 1.2px;
		text-transform: uppercase;
	}

	.top-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl); /* matches Figma h-3/size: 40px at desktop */
		font-weight: 700;
		color: var(--color-white);
		line-height: 48px;          /* matches Figma h-3/line-height: 48px */
		margin: 0;
	}

	.top-desc {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Step Cards (Index 1-4) ── */
	.card-inner-step {
		height: 100%;
		width: 100%;
		padding: var(--space-10) var(--space-10);
		display: flex;
		align-items: flex-start; /* Both cols start at top, matching Figma */
		gap: var(--space-6);
	}

	.step-left {
		flex: 1;
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		min-width: 0;
	}

	.number-block {
		width: 30px;
		height: 30px;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid var(--color-border-card); /* Fallback */
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-body);
		font-size: var(--text-xs);
		font-weight: 700;
		flex-shrink: 0;
	}

	.title-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-2); /* 8px — matches Figma gap between title and subtitle */
	}

	.step-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl); /* matches Figma h-3/size: 40px at desktop */
		font-weight: 700;
		color: var(--color-white);
		line-height: 48px;          /* matches Figma h-3/line-height: 48px */
		margin: 0;
	}

	.step-subtitle {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		letter-spacing: 1.2px;
		text-transform: uppercase;
		opacity: 0.85;
	}

	.step-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start; /* Align to top, matching Figma */
	}

	.step-desc {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 23px;
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
			height: clamp(300px, 35vh, 320px); /* Tighter height to eliminate empty whitespace at bottom */
		}

		.card-inner-top {
			padding: var(--space-8) var(--space-6);
			gap: 16px;
		}

		.card-inner-step {
			padding: var(--space-8) var(--space-6);
			flex-direction: column;
			gap: 20px;
		}

		.top-inner {
			flex-direction: column;
			gap: 16px;
		}

		.step-left, .top-left {
			width: 100%;
			flex: none; /* Prevent flex-grow from pushing the description to the bottom */
		}

		.step-right, .top-right {
			width: 100%;
			flex: none;
			justify-content: flex-start;
		}

		.top-title, .step-title {
			font-size: 26px;
			line-height: 1.2;
			letter-spacing: -0.015em;
		}
	}

	@media (max-width: 480px) {
		.card-stack {
			height: 330px; /* Snug fit for wrapped text without massive bottom gap */
		}

		.card-inner-top, .card-inner-step {
			padding: var(--space-6) var(--space-5);
		}

		.top-title, .step-title {
			font-size: 22px;
			line-height: 1.2;
		}
	}
</style>
