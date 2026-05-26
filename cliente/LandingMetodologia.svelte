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
			pillColor: "var(--color-card-blue-2)",
			title: "Descubrimiento",
			subtitle: "INVESTIGACIÓN & ARQUITECTURA",
			desc: "Con los objetivos de negocio claros, nos enfocamos en entender el mercado, tus clientes, organizamos la información de tu sitio y trazamos la mejor experiencia antes diseñar una pantalla ó tocar un línea de código.",
			glowColor: "rgba(200, 217, 255, 0.15)"
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
			pillColor: "var(--color-accent-primary)",
			title: "Desarrollo limpio",
			subtitle: "GREEN CODING",
			desc: "Codificamos u optimizamos tu sitio, con foco en el rendimiento y la eficiencia. Nuestro stack tecnológico apunta hacia un código eficiente, escalable y liviano que genere resultados y el menor impacto ambiental digital.",
			glowColor: "rgba(214, 244, 122, 0.15)"
		}
	];

	let sectionRef: HTMLElement;
	let cardStackEl: HTMLElement;
	let isLocked = false;
	let targetProgress = 0;
	let progress = $state(0);
	let rafId = 0;
	let isMobile = $state(false);
	let activeCarouselIndex = $state(0);
	let unlockTime = 0;
	let isAnimating = $derived(progress > 0 && progress < 1);

	// Glow index: driven by scroll progress on desktop, snap index on mobile
	let activeGlowIndex = $derived(
		isMobile
			? activeCarouselIndex
			: Math.min(cards.length - 1, Math.max(0, Math.round(progress * (cards.length - 1))))
	);

	function lockPage() {
		if (isLocked) return;
		if (Date.now() - unlockTime < 800) return;
		isLocked = true;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		document.body.style.overscrollBehavior = 'none';
		document.documentElement.style.overscrollBehavior = 'none';
		sectionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function unlockPage() {
		if (!isLocked) return;
		isLocked = false;
		unlockTime = Date.now();
		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';
		document.body.style.overscrollBehavior = '';
		document.documentElement.style.overscrollBehavior = '';
	}

	function getCardStyle(i: number): string {
		const segment = progress * (cards.length - 1);
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
			const arrival = segment - (i - 1);
			if (arrival <= 0) {
				translateY = 110;
				scale = 0.92;
				opacity = 0;
				zIndex = i;
			} else if (arrival < 1) {
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

		// Keep font rendering perfectly crisp when card is completely static at rest (translateY is 0, scale is 1)
		// by using transform: none, which prevents the browser from promoting it to a GPU layer.
		const transformStr = (translateY === 0 && scale === 1)
			? 'none'
			: `translateY(${translateY}%) scale(${scale}) translateZ(${zIndex}px)`;

		return `
			transform: ${transformStr};
			opacity: ${opacity};
			filter: brightness(${brightness});
			z-index: ${zIndex};
		`;
	}

	onMount(() => {
		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;
		const onMQChange = (e: MediaQueryListEvent) => { isMobile = e.matches; };
		mq.addEventListener('change', onMQChange);

		function animate() {
			const diff = targetProgress - progress;
			if (Math.abs(diff) > 0.001) {
				progress += diff * 0.1;
			} else {
				progress = targetProgress;
			}
			if (progress >= 0.995 && targetProgress >= 1) {
				progress = 1; targetProgress = 1; unlockPage();
			} else if (progress <= 0.005 && targetProgress <= 0) {
				progress = 0; targetProgress = 0; unlockPage();
			}
			rafId = requestAnimationFrame(animate);
		}
		rafId = requestAnimationFrame(animate);

		const desktopObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!isMobile && entry.isIntersecting && !isLocked && (Date.now() - unlockTime > 800)) {
					const rect = entry.boundingClientRect;
					const enteringFromBelow = rect.top > 0;
					targetProgress = enteringFromBelow ? 0 : 1;
					progress = enteringFromBelow ? 0 : 1;
					lockPage();
				}
			});
		}, { threshold: 0.8 });
		if (sectionRef) desktopObserver.observe(sectionRef);

		const TOTAL_SCROLL_DISTANCE = 3200;
		const handleWheel = (e: WheelEvent) => {
			if (isMobile || !isLocked) return;
			e.preventDefault();
			e.stopPropagation();
			targetProgress += e.deltaY / TOTAL_SCROLL_DISTANCE;
			targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isMobile || !isLocked) return;
			const keys = ['ArrowDown', 'ArrowUp', 'Space', ' ', 'PageDown', 'PageUp'];
			if (keys.includes(e.key)) {
				e.preventDefault();
				const delta = ['ArrowDown', 'PageDown', ' ', 'Space'].includes(e.key) ? 200 : -200;
				targetProgress += delta / TOTAL_SCROLL_DISTANCE;
				targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
			}
		};
		let touchStartY = 0;
		const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
		const handleTouchMove = (e: TouchEvent) => {
			if (isMobile || !isLocked) return;
			e.preventDefault();
			const deltaY = touchStartY - e.touches[0].clientY;
			touchStartY = e.touches[0].clientY;
			targetProgress += deltaY / 600;
			targetProgress = Math.max(-0.05, Math.min(1.05, targetProgress));
		};

		window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
		window.addEventListener('keydown', handleKeyDown, { capture: true });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

		let debounceTimer: ReturnType<typeof setTimeout> | null = null;
		const scrollEndHandler = () => {
			if (!isMobile || !cardStackEl) return;
			// Calculamos qué tarjeta está más cerca del centro del contenedor
			const cards = Array.from(cardStackEl.querySelectorAll('.stack-card')) as HTMLElement[];
			if (!cards.length) return;
			const containerCenter = cardStackEl.scrollTop + (cardStackEl.clientHeight / 2);
			
			let minDiff = Infinity;
			let activeIndex = 0;
			
			cards.forEach((card, idx) => {
				const cardCenter = card.offsetTop + (card.offsetHeight / 2);
				const diff = Math.abs(cardCenter - containerCenter);
				if (diff < minDiff) {
					minDiff = diff;
					activeIndex = idx;
				}
			});
			activeCarouselIndex = activeIndex;
		};
		const scrollFallbackHandler = () => {
			if (!isMobile) return;
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(scrollEndHandler, 100);
		};
		cardStackEl?.addEventListener('scrollend', scrollEndHandler);
		cardStackEl?.addEventListener('scroll', scrollFallbackHandler, { passive: true });

		return () => {
			mq.removeEventListener('change', onMQChange);
			cancelAnimationFrame(rafId);
			unlockPage();
			desktopObserver.disconnect();
			window.removeEventListener('wheel', handleWheel, { capture: true });
			window.removeEventListener('keydown', handleKeyDown, { capture: true });
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove, { capture: true });
			cardStackEl?.removeEventListener('scrollend', scrollEndHandler);
			cardStackEl?.removeEventListener('scroll', scrollFallbackHandler);
			if (debounceTimer) clearTimeout(debounceTimer);
		};
	});
</script>

<section class="meto-section" bind:this={sectionRef}>
	<!-- Ambient glow -->
	<div
		class="ambient-glow"
		style="background: radial-gradient(ellipse at 70% 60%, {cards[activeGlowIndex].glowColor} 0%, transparent 70%);"
	></div>

	<!-- Card Stack / Carousel -->
	<div class="card-stack" bind:this={cardStackEl}>
		<!-- Peek ghost cards — desktop only -->
		<div class="peek-ghost peek-ghost--near" aria-hidden="true"></div>
		<div class="peek-ghost peek-ghost--far" aria-hidden="true"></div>

		{#each cards as card, i}
			<div class="stack-card" class:is-animating={isAnimating} style={isMobile ? '' : getCardStyle(i)}>
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

	<!-- Mobile: dot pagination indicators -->
	<div class="carousel-indicators" role="tablist" aria-label="Pasos de metodología">
		{#each cards as _, i}
			<div class="indicator-slot">
				<div
					class="carousel-indicator"
					class:active={activeCarouselIndex === i}
					role="tab"
					aria-selected={activeCarouselIndex === i}
					aria-label={i === 0 ? 'Introducción' : `Paso ${i}`}
				></div>
			</div>
		{/each}
	</div>
</section>

<style>
	.meto-section {
		position: relative;
		width: 100%;
		background: var(--color-bg-deep);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-6);
		padding: var(--section-pad-lg) var(--gutter);
	}

	.ambient-glow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		transition: background 0.8s ease-out;
	}

	/* ── Desktop Card Stack ───────────────────────────────────────────── */
	.card-stack {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1128px;
		height: clamp(280px, 32vh, 320px);
	}

	/* Peek ghost cards: static divs always rendered behind real cards */
	.peek-ghost {
		position: absolute;
		top: 0;
		bottom: 0;
		border-radius: var(--radius-xl);
		background: var(--color-surface-base);
		border: 1px solid rgba(255, 255, 255, 0.07);
		pointer-events: none;
		z-index: 0; /* Behind all real stack-cards (z-index 1+) */
	}
	/* Closest ghost: 3% narrower on each side, 10px lower */
	.peek-ghost--near {
		left: 3%;
		right: 3%;
		transform: translateY(10px);
		opacity: 0.55;
	}
	/* Deeper ghost: 6% narrower, 20px lower */
	.peek-ghost--far {
		left: 6%;
		right: 6%;
		transform: translateY(20px);
		opacity: 0.28;
	}

	.stack-card {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-xl);
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-card);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.07),
			0 4px 24px rgba(0, 0, 0, 0.2);
		will-change: auto;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transform-style: preserve-3d;
	}

	.stack-card.is-animating {
		will-change: transform, opacity, filter;
	}

	/* ── Top Card (Index 0) ──────────────────────────────────────────── */
	.card-inner-top {
		height: 100%;
		width: 100%;
		padding: var(--space-10);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center; /* Vertically center content in the card */
		gap: var(--space-4);
		background-image: linear-gradient(
			170.7deg,
			rgba(215, 144, 240, 0.35) 0%,
			rgba(215, 144, 240, 0) 50%,
			rgba(214, 244, 122, 0.45) 100%
		);
	}

	.top-inner {
		display: flex;
		align-items: flex-start;
		gap: var(--space-8);
		width: 100%;
	}

	.top-left {
		flex: 1.2;
		min-width: 0;
	}

	.top-right {
		flex: 1;
		min-width: 0;
		padding-top: 4px; /* optical alignment */
	}

	.top-pill {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 400;
		color: var(--color-primary);
		letter-spacing: 1.2px;
		text-transform: uppercase;
	}

	.top-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.top-desc {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Step Cards (Index 1–4) ──────────────────────────────────────── */
	.card-inner-step {
		height: 100%;
		width: 100%;
		padding: var(--space-10);
		display: flex;
		align-items: center; /* Both columns vertically centered within the card */
		gap: var(--space-8);
	}

	.step-left {
		flex: 1;
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		min-width: 0;
	}

	.number-block {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-md);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid currentColor;
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
		gap: var(--space-2);
		min-width: 0;
	}

	.step-title {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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
		min-width: 0;
	}

	.step-desc {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Carousel indicators: hidden on desktop ──────────────────────── */
	.carousel-indicators {
		display: none;
	}

	/* ── Tablet (768px–1000px): stack columns before they clip ────────── */
	@media (max-width: 1000px) and (min-width: 769px) {
		.card-stack {
			height: clamp(320px, 38vh, 380px);
		}
		.card-inner-top,
		.card-inner-step {
			padding: var(--space-8);
		}
		.top-inner {
			flex-direction: column;
			gap: var(--space-4);
		}
		.top-left,
		.top-right {
			flex: none;
			width: 100%;
			padding-top: 0;
		}
		.card-inner-step {
			gap: var(--space-6);
		}
		.top-title {
			font-size: var(--text-2xl);
		}
		.step-title {
			font-size: var(--text-lg);
		}
	}

	/* ── Mobile (<768px): Vertical scroll-snap carousel ─────────────── */
	@media (max-width: 768px) {
		.meto-section {
			padding: max(56px, env(safe-area-inset-top)) var(--gutter) max(var(--space-8), env(safe-area-inset-bottom));
			justify-content: flex-start;
			gap: var(--space-5);
			overflow: hidden; /* clipear el ambient glow */
		}

		/* Vertical snap carousel: card-stack is the scroll viewport */
		.card-stack {
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
			overflow-x: hidden;
			scroll-snap-type: y mandatory;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			height: 70dvh;
			width: 100%;
			max-width: 100%;
			flex-shrink: 0;
			/* Gap and large padding so the first card can scroll into the center */
			gap: 16px;
			padding: 25dvh 0;
			/* Fade suave en bordes superior e inferior */
			-webkit-mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				black 10%,
				black 90%,
				transparent 100%
			);
			mask-image: linear-gradient(
				to bottom,
				transparent 0%,
				black 10%,
				black 90%,
				transparent 100%
			);
		}

		.card-stack::-webkit-scrollbar {
			display: none;
		}

		.peek-ghost {
			display: none;
		}

		/* Cards size to their content */
		.stack-card {
			position: static !important;
			transform: none !important;
			opacity: 1 !important;
			filter: none !important;
			flex: 0 0 auto;
			width: calc(100% - 24px); /* Espacio para el indicador */
			height: auto;
			scroll-snap-align: center;
			scroll-snap-stop: always;
			pointer-events: auto;
			will-change: auto;
		}

		.card-inner-top {
			height: auto;
			padding: var(--space-8) var(--space-6);
			justify-content: flex-start;
			gap: var(--space-4);
		}

		.top-inner {
			flex-direction: column;
			gap: var(--space-4);
		}

		.top-left,
		.top-right {
			flex: none;
			width: 100%;
			padding-top: 0;
		}

		.card-inner-step {
			height: auto;
			padding: var(--space-8) var(--space-6);
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			gap: var(--space-5);
		}

		.step-left,
		.step-right {
			flex: none;
			width: 100%;
		}

		.top-title {
			font-size: var(--text-2xl);
			line-height: 1.2;
		}
		.step-title {
			font-size: var(--text-lg);
			line-height: 1.25;
		}

		/* Dot indicators — centered relative to section */
		.carousel-indicators {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 6px;
			position: absolute;
			right: 16px;
			top: 50%;
			transform: translateY(-50%);
			z-index: 2;
			width: 6px;
		}

		/* Slot de altura fija: evita que el dot activo desplace a los vecinos */
		.indicator-slot {
			width: 6px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.carousel-indicator {
			width: 6px;
			height: 6px;
			border-radius: 999px;
			background: rgba(255, 255, 255, 0.3);
			transition:
				height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
				background 0.25s ease;
		}

		.carousel-indicator.active {
			height: 20px;
			background: var(--color-accent-primary);
		}
	}

	@media (max-width: 480px) {
		.stack-card {
			flex: 0 0 auto;
			width: 100%;
		}
		.card-inner-top,
		.card-inner-step {
			padding: var(--space-6) var(--space-5);
		}
		.top-title {
			font-size: var(--text-lg);
		}
		.step-title {
			font-size: var(--text-sm);
		}
	}
</style>
