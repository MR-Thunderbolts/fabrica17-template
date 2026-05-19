<script lang="ts">
	import "./tokens.css";
	import IconDownload from "~icons/ph/download";

	import HeroSection from "./HeroSection.svelte";
	import PerfoDigitalSection from "./PerfoDigitalSection.svelte";
	import PerfoWebCoreSection from "./PerfoWebCoreSection.svelte";
	import ImpactoDigitalSection from "./ImpactoDigitalSection.svelte";
	import ProximoPasoSection from "./ProximoPasoSection.svelte";
	import FooterSection from "./FooterSection.svelte";
	import CalculatorForm from "./CalculatorForm.svelte";
	import CalculatorLoading from "./CalculatorLoading.svelte";

	import logoCiclo from "./assets/Logo-Ciclo17.svg?raw";

	// 3-step flow: form → loading → results
	let step = $state<"form" | "loading" | "results">("form");

	let reportData = $state({
		url: "",
		date: new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" }),
		scores: {
			main: 84,
			status: "Mejorable",
			performance: 84,
			quality: 96,
			efficiency: 100,
			satisfaction: 100
		},
		webCore: {
			loadTime: "2.9s",
			loadTimeStatus: "Mejorable",
			responseTime: "130ms",
			responseTimeStatus: "Optimo",
			visualStability: "0.015",
			visualStabilityStatus: "Optimo"
		},
		impact: {
			co2Class: "B",
			carbonFootprint: "0.45g",
			greenHosting: false
		},
		issues: [
			{ title: "Comprimir imágenes", impact: "Alto impacto", type: "error" },
			{ title: "Implementar lazy-loading", impact: "Impacto medio", type: "warning" },
			{ title: "Migrar a hosting verde", impact: "Alto impacto", type: "error" }
		]
	});

	function handleFormSubmit(data: { nombre: string; email: string; telefono: string; sitio: string; copiaEmail: boolean }) {
		reportData.url = data.sitio;
		step = "loading";

		// Simulate analysis time (matches loading animation)
		setTimeout(() => {
			reportData.scores.main = Math.floor(Math.random() * 40) + 60;
			reportData.scores.status = reportData.scores.main > 89 ? "Optimo" : "Mejorable";
			step = "results";
		}, 5000);
	}
</script>

<svelte:head>
	<title>Calculadora Ciclo17</title>
</svelte:head>

<main class="page-reporte">
	{#if step === "form"}
		<CalculatorForm onSubmit={handleFormSubmit} />

	{:else if step === "loading"}
		<CalculatorLoading url={reportData.url} />

	{:else}
		<!-- Results view -->
		<nav class="report-nav" aria-label="Navegación del reporte">
			<a href="/" class="nav-brand">
				{@html logoCiclo}
			</a>

			<div class="nav-actions">
				<button class="nav-btn nav-btn-icon" aria-label="Descargar reporte">
					<IconDownload width="18" height="18" />
				</button>
			</div>
		</nav>

		<div class="wraper">
			<div class="container">
				<!-- Section 1: Hero -->
				<HeroSection url={reportData.url} date={reportData.date} />

				<!-- Section 2: PerfoDigital -->
				<PerfoDigitalSection 
					url={reportData.url} 
					date={reportData.date} 
					scores={reportData.scores} 
				/>

				<!-- Section 3: PerfoWebCore -->
				<PerfoWebCoreSection 
					url={reportData.url} 
					webCore={reportData.webCore} 
				/>

				<!-- Section 4: ImpactoDigital -->
				<ImpactoDigitalSection 
					url={reportData.url} 
					impact={reportData.impact} 
					issues={reportData.issues} 
				/>

				<!-- Section 5: ProximoPaso -->
				<ProximoPasoSection />
				
				<!-- Footer -->
				<FooterSection />
			</div>
		</div>
	{/if}
</main>

<style>
	:global(.page-reporte) {
		background-color: var(--color-audit-bg) !important;
		min-height: 100vh;
		color: var(--color-audit-fg) !important;
	}

	.wraper {
		background-color: var(--color-audit-bg);
		padding-top: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1128px;
		padding: 0 24px;
	}

	.report-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: rgba(22, 29, 58, 0.5);
		backdrop-filter: blur(8.8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 48px;
		margin: 0 auto;
		width: calc(100% - 48px);
		max-width: 1128px;
		padding: 8px 16px;
		position: absolute;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 50;
	}

	.nav-brand {
		display: flex;
		align-items: center;
		padding-left: 4px;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out-expo);
	}

	.nav-brand:hover {
		transform: scale(1.05);
	}

	.nav-brand :global(svg) {
		height: 30px;
		width: auto;
		filter: drop-shadow(0 0 8px rgba(214, 244, 122, 0));
		transition: filter 0.3s var(--ease-out-expo);
	}

	.nav-brand:hover :global(svg) {
		filter: drop-shadow(0 0 12px rgba(214, 244, 122, 0.45));
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.nav-btn {
		min-height: 44px;
		border-radius: 48px;
		cursor: pointer;
	}

	.nav-btn-icon {
		width: 44px;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-white);
	}

	.nav-btn-icon:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	/* ── Mobile ── */
	@media (max-width: 768px) {
		.wraper {
			padding-top: 72px;
		}

		.container {
			padding: 0 16px;
		}

		.report-nav {
			width: calc(100% - 32px);
			padding: 6px 12px;
		}
	}
</style>
