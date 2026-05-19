<script lang="ts">
	import IconX from "~icons/ph-bold/x";
	import IconBriefcase from "~icons/ph/briefcase";
	import IconCart from "~icons/ph/shopping-cart";
	import IconLightning from "~icons/ph/lightning";
	import IconSwatches from "~icons/ph/palette";
	import IconFile from "~icons/ph/file";
	import IconChatDots from "~icons/ph/chat-dots";
	import IconEnvelope from "~icons/ph/envelope";
	import IconTelephoneCall from "~icons/ph/phone-call";

	let { isOpen = false, onClose } = $props<{ isOpen: boolean; onClose: () => void }>();

	let currentStep = $state(1);
	const totalSteps = 5;

	let formData = $state({
		servicio: "",
		nombre: "",
		email: "",
		telefono: "",
		contacto: "",
		presupuesto: "",
		proyecto: ""
	});

	let formState = $state<"filling" | "loading" | "success">("filling");

	function prevStep() {
		if (currentStep > 1) currentStep--;
	}

	function nextStep() {
		if (currentStep < totalSteps) {
			currentStep++;
		} else {
			formState = "loading";
			setTimeout(() => { formState = "success"; }, 1200);
		}
	}

	function handleClose() {
		onClose();
		setTimeout(() => {
			currentStep = 1;
			formState = "filling";
			formData = { servicio: "", nombre: "", email: "", telefono: "", contacto: "", presupuesto: "", proyecto: "" };
		}, 300);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && isOpen) handleClose();
	}

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleKeydown);
		} else {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeydown);
		}
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeydown);
		};
	});

	const serviceOptions = [
		{ value: "corporativo", label: "Sitio web corporativo", icon: IconBriefcase },
		{ value: "ecommerce",   label: "E-commerce",            icon: IconCart },
		{ value: "optimizacion",label: "Optimización web",      icon: IconLightning },
		{ value: "medida",      label: "Sitios web a la medida",icon: IconSwatches },
		{ value: "onepage",     label: "One-page simple",       icon: IconFile }
	];

	const contactOptions = [
		{ value: "whatsapp", label: "Whatsapp",  icon: IconChatDots },
		{ value: "correo",   label: "Correo",    icon: IconEnvelope },
		{ value: "llamada",  label: "Llamada",   icon: IconTelephoneCall }
	];

	const budgetOptions = [
		"$600.000 - $1M CLP",
		"$1.000.000 - $1.500.000 CLP",
		"$1.500.000 - $3.000.000 CLP",
		"Más de $3.000.000 CLP"
	];

	// Step 1 can proceed if servicio selected; Step 2 if nombre filled; others free
	function canContinue(): boolean {
		if (currentStep === 1) return !!formData.servicio;
		if (currentStep === 2) return !!formData.nombre;
		return true;
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="modal-backdrop" onclick={handleClose} onkeydown={(e) => e.key === 'Escape' && handleClose()} role="presentation">
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal-content"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			tabindex="-1"
		>
			{#if formState === "success"}
				<!-- ── Success state ── -->
				<div class="success-view">
					<div class="success-check">
						<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</div>
					<h2 class="success-title">Solicitud enviada<br>con éxito.</h2>
					<p class="success-desc">Te contactaremos pronto.</p>
					<button class="btn-back-home" onclick={handleClose}>Volver al sitio</button>
				</div>

			{:else}
				<!-- ── Step indicator ── -->
				<div class="step-dots">
					{#each Array(totalSteps) as _, i}
						<div class="dot {i + 1 === currentStep ? 'active' : ''} {i + 1 < currentStep ? 'done' : ''}"></div>
					{/each}
				</div>

				<!-- ── Close button ── -->
				<button class="btn-close" onclick={handleClose} aria-label="Cerrar">
					<IconX width="20" height="20" />
				</button>

				<!-- ── Step 1: Tipo de proyecto ── -->
				{#if currentStep === 1}
					<div class="step-body" id="modal-title">
						<div class="step-header">
							<h2 class="step-title">¿Qué necesitas?</h2>
							<p class="step-subtitle">Selecciona el tipo de proyecto.</p>
						</div>

						<div class="selector-group">
							{#each serviceOptions as opt}
								<button
									class="selector-block {formData.servicio === opt.value ? 'selected' : ''}"
									onclick={() => { formData.servicio = opt.value; }}
								>
									<span class="selector-label">
										<span class="selector-icon"><opt.icon width="24" height="24" /></span>
										<span class="selector-text">{opt.label}</span>
									</span>
									<span class="radio-indicator {formData.servicio === opt.value ? 'checked' : ''}"></span>
								</button>
							{/each}
						</div>

						<button class="btn-continue" onclick={nextStep} disabled={!canContinue()}>
							Continuar
						</button>
					</div>

				<!-- ── Step 2: Datos de contacto ── -->
				{:else if currentStep === 2}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title">¿Cómo te contactamos?</h2>
							<p class="step-subtitle">Datos clientes</p>
						</div>

						<div class="fields">
							<div class="field">
								<label for="q-nombre">Nombre y apellido (Requerido)</label>
								<input type="text" id="q-nombre" bind:value={formData.nombre} placeholder="Escribe..." />
							</div>
							<div class="field">
								<label for="q-email">Correo electrónico</label>
								<input type="email" id="q-email" bind:value={formData.email} placeholder="Escribe..." />
							</div>
							<div class="field">
								<label for="q-tel">Teléfono</label>
								<input type="tel" id="q-tel" bind:value={formData.telefono} placeholder="Escribe..." />
							</div>
						</div>

						<div class="step-actions">
							<button class="btn-back" onclick={prevStep}>Atrás</button>
							<button class="btn-continue" onclick={nextStep} disabled={!canContinue()}>Continuar</button>
						</div>
					</div>

				<!-- ── Step 3: Medio de contacto ── -->
				{:else if currentStep === 3}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title">¿Como te contactamos?</h2>
							<p class="step-subtitle">Datos de cliente.</p>
						</div>

						<div class="selector-group">
							{#each contactOptions as opt}
								<button
									class="selector-block {formData.contacto === opt.value ? 'selected' : ''}"
									onclick={() => { formData.contacto = opt.value; }}
								>
									<span class="selector-label">
										<span class="selector-icon"><opt.icon width="24" height="24" /></span>
										<span class="selector-text">{opt.label}</span>
									</span>
									<span class="radio-indicator {formData.contacto === opt.value ? 'checked' : ''}"></span>
								</button>
							{/each}
						</div>

						<div class="step-actions">
							<button class="btn-back" onclick={prevStep}>Atrás</button>
							<button class="btn-continue" onclick={nextStep}>Continuar</button>
						</div>
					</div>

				<!-- ── Step 4: Presupuesto ── -->
				{:else if currentStep === 4}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title">¿Cuál es tu presupuesto?</h2>
							<p class="step-subtitle">Selecciona tu presupuesto.</p>
						</div>

						<div class="selector-group">
							{#each budgetOptions as opt}
								<button
									class="selector-block {formData.presupuesto === opt ? 'selected' : ''}"
									onclick={() => { formData.presupuesto = opt; }}
								>
									<span class="selector-label">
										<span class="selector-text">{opt}</span>
									</span>
									<span class="radio-indicator {formData.presupuesto === opt ? 'checked' : ''}"></span>
								</button>
							{/each}
						</div>

						<div class="step-actions">
							<button class="btn-back" onclick={prevStep}>Atrás</button>
							<button class="btn-continue" onclick={nextStep}>Continuar</button>
						</div>
					</div>

				<!-- ── Step 5: Descripción del proyecto ── -->
				{:else if currentStep === 5}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title">¿De qué trata tu proyecto?</h2>
							<p class="step-subtitle">Selecciona tu presupuesto.</p>
						</div>

						<textarea
							class="project-textarea"
							bind:value={formData.proyecto}
							placeholder="Escribe..."
						></textarea>

						<div class="step-actions">
							<button class="btn-back" onclick={prevStep}>Atrás</button>
							<button class="btn-continue" onclick={nextStep}>
								{#if formState === "loading"}Enviando...{:else}Enviar solicitud{/if}
							</button>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ── Backdrop ── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 14, 28, 0.72);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 16px;
		animation: fadeIn 0.2s ease-out;
	}

	/* ── Modal card ── */
	.modal-content {
		position: relative;
		background: var(--color-audit-surface);
		border: 1px solid var(--color-border-card);
		border-radius: 24px;
		width: 100%;
		max-width: 480px;
		padding: 33px;
		box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		overflow: hidden;
	}

	/* ── Close button (top-right) ── */
	.btn-close {
		position: absolute;
		top: 16px;
		right: 16px;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.05);
		border: none;
		color: var(--color-audit-fg);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out-expo);
	}
	.btn-close:hover { background: rgba(255, 255, 255, 0.1); }

	/* ── Step dots ── */
	.step-dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-bottom: 28px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		transition: all var(--dur-normal) var(--ease-out-expo);
	}

	.dot.active {
		width: 24px;
		border-radius: 4px;
		background: var(--color-primary);
	}

	.dot.done {
		background: var(--color-primary);
		opacity: 0.5;
	}

	/* ── Step body ── */
	.step-body {
		display: flex;
		flex-direction: column;
		gap: 24px;
		animation: fadeSlide 0.25s ease-out;
	}

	/* ── Step header ── */
	.step-header {
		display: flex;
		flex-direction: column;
		gap: 12px;
		text-align: left;
	}

	.step-title {
		font-family: var(--font-headline);
		font-size: 24px;
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
		line-height: 32px;
	}

	.step-subtitle {
		font-family: var(--font-body);
		font-size: 20px;
		line-height: 28px;
		color: var(--color-audit-fg);
		margin: 0;
	}

	/* ── Selector blocks (radio cards) ── */
	.selector-group {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 1;
	}

	.selector-block {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 16px;
		border-radius: 8px;
		border: 1px solid var(--color-border-card);
		background: transparent;
		cursor: pointer;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo);
		text-align: left;
	}

	.selector-block:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	.selector-block.selected {
		border-color: var(--color-primary);
		box-shadow: 0 0 5px 0 var(--color-primary);
	}

	.selector-label {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.selector-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		color: var(--color-white);
		flex-shrink: 0;
	}

	.selector-text {
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 24px;
		color: var(--color-white);
		white-space: nowrap;
	}

	/* ── Radio indicator (right side) ── */
	.radio-indicator {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--color-border-card);
		flex-shrink: 0;
		transition: all var(--dur-fast) var(--ease-out-expo);
		position: relative;
	}

	.radio-indicator.checked {
		border-color: var(--color-primary);
		background: var(--color-primary);
		box-shadow: 0 0 8px rgba(215, 144, 240, 0.8);
	}

	.radio-indicator.checked::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-on-primary);
	}

	/* ── Fields (Step 2) ── */
	.fields {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 1;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.field label {
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;
		color: var(--color-white);
	}

	.field input {
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 24px;
		color: var(--color-white);
		background: transparent;
		border: 1px solid var(--color-border-card);
		border-radius: 4px;
		padding: 12px;
		outline: none;
		transition: border-color var(--dur-fast) var(--ease-out-expo);
		width: 100%;
	}

	.field input:focus {
		border-color: var(--color-primary);
	}

	.field input::placeholder {
		color: rgba(255, 255, 255, 0.1);
	}

	/* ── Textarea (Step 5) ── */
	.project-textarea {
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 24px;
		color: var(--color-white);
		background: transparent;
		border: 1px solid var(--color-border-card);
		border-radius: 4px;
		padding: 12px;
		outline: none;
		resize: none;
		flex: 1;
		min-height: 200px;
		transition: border-color var(--dur-fast) var(--ease-out-expo);
		width: 100%;
	}

	.project-textarea:focus {
		border-color: var(--color-primary);
	}

	.project-textarea::placeholder {
		color: rgba(255, 255, 255, 0.1);
	}

	/* ── Step actions row ── */
	.step-actions {
		display: flex;
		gap: 12px;
	}

	.btn-back {
		height: 48px;
		padding: 0 20px;
		border-radius: var(--radius-full);
		background: transparent;
		border: 1px solid var(--color-border-card);
		color: var(--color-text-muted);
		font-family: var(--font-body);
		font-size: var(--text-base);
		font-weight: 500;
		cursor: pointer;
		transition: border-color var(--dur-fast) var(--ease-out-expo), color var(--dur-fast) var(--ease-out-expo);
		flex-shrink: 0;
	}

	.btn-back:hover {
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--color-white);
	}

	/* ── Continue button (full-width pill) ── */
	.btn-continue {
		flex: 1;
		width: 100%;
		padding: 16px 24px;
		border-radius: 9999px;
		background: rgba(215, 144, 240, 0.6);
		border: none;
		color: #141827;
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 20px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo),
			transform var(--dur-fast) var(--ease-out-expo);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-continue:hover:not(:disabled) {
		background: var(--color-primary);
		box-shadow: 0 0 16px var(--color-primary-glow);
		transform: translateY(-1px);
	}

	.btn-continue:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* ── Success state ── */
	.success-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		padding: 24px 0;
		animation: fadeSlide 0.3s ease-out;
	}

	.success-check {
		width: 88px;
		height: 88px;
		border-radius: 50%;
		background: linear-gradient(135deg, #34d399, #10b981);
		color: var(--color-white);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
		box-shadow: 0 0 32px rgba(52, 211, 153, 0.3);
	}

	.success-title {
		font-family: var(--font-headline);
		font-size: 24px;
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
		line-height: 32px;
	}

	.success-desc {
		font-family: var(--font-body);
		font-size: 15px;
		color: var(--color-text-muted);
		margin: 0;
	}

	.btn-back-home {
		margin-top: 8px;
		height: 44px;
		padding: 0 28px;
		border-radius: var(--radius-full);
		background: transparent;
		border: 1px solid var(--color-border-card);
		color: var(--color-audit-fg);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition: border-color var(--dur-fast) var(--ease-out-expo), color var(--dur-fast) var(--ease-out-expo);
	}

	.btn-back-home:hover {
		border-color: rgba(255, 255, 255, 0.3);
		color: var(--color-white);
	}

	/* ── Keyframes ── */
	@keyframes fadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(16px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes fadeSlide {
		from { opacity: 0; transform: translateX(10px); }
		to   { opacity: 1; transform: translateX(0); }
	}

	/* ── Mobile ── */
	@media (max-width: 640px) {
		.modal-content {
			padding: 28px 20px;
			max-height: calc(100dvh - 32px);
			overflow-y: auto;
			scrollbar-width: none;
			border-radius: 20px;
		}

		.modal-content::-webkit-scrollbar { display: none; }

		.step-title { font-size: 22px; }

		.selector-block { padding: 18px 14px; }

		.selector-group { gap: 14px; }
	}
</style>
