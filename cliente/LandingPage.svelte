<script lang="ts">
	import LandingNav from "./LandingNav.svelte";
	import LandingHero from "./LandingHero.svelte";
	import LandingPainPoints from "./LandingPainPoints.svelte";
	import LandingOferta from "./LandingOferta.svelte";
	import LandingMetodologia from "./LandingMetodologia.svelte";
	import LandingPlan from "./LandingPlan.svelte";
	import LandingSeguridad from "./LandingSeguridad.svelte";
	import LandingFAQ from "./LandingFAQ.svelte";
	import LandingFooter from "./LandingFooter.svelte";
	import LandingQuoteForm from "./LandingQuoteForm.svelte";

	let isQuoteFormOpen = $state(false);

	function handleGlobalClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (link && link.getAttribute('href') === '#cotizar') {
			e.preventDefault();
			isQuoteFormOpen = true;
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}
	}
</script>

<svelte:window onclick={handleGlobalClick} />

<svelte:head>
	<title>Ciclo17 — Sitios web que convierten y cuidan el planeta</title>
	<meta name="description" content="Creamos experiencias digitales que generan más visitas convertidas en clientes, con menor impacto ambiental digital." />
</svelte:head>

<main class="page-landing">
	<LandingNav />
	<LandingHero />
	<LandingPainPoints />
	<LandingOferta />
	<LandingMetodologia />
	<LandingPlan />
	<LandingSeguridad />
	<LandingFAQ />
	<LandingFooter />
	<span id="cotizar" style="display:none;" aria-hidden="true"></span>
	<LandingQuoteForm isOpen={isQuoteFormOpen} onClose={() => isQuoteFormOpen = false} />
</main>

<style>
	.page-landing {
		background: var(--color-bg-base);
		min-height: 100vh;
		min-height: 100dvh;
		overflow-x: hidden;
		scroll-snap-type: y proximity;
		-webkit-overflow-scrolling: touch;
	}

	/* Gentle snap for sections */
	.page-landing :global(section),
	.page-landing :global(.meto-section) {
		scroll-snap-align: start;
	}
</style>
