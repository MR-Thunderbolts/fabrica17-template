<script lang="ts">
	import IconX from "~icons/mynaui/x";
	import IconArrowLeft from "~icons/mynaui/arrow-left";
	import IconBriefcase from "~icons/mynaui/briefcase";
	import IconCart from "~icons/mynaui/cart";
	import IconLightning from "~icons/mynaui/lightning";
	import IconSwatches from "~icons/mynaui/paint";
	import IconFile from "~icons/mynaui/file";
	import IconChatDots from "~icons/mynaui/chat";
	import IconEnvelope from "~icons/mynaui/envelope";
	import IconTelephoneCall from "~icons/mynaui/telephone-call";

	let { isOpen = false, onClose, preselectedPlan = null } = $props<{
		isOpen: boolean;
		onClose: () => void;
		preselectedPlan?: string | null;
	}>();

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

	// Touched state — errores solo aparecen después de que el usuario toca el campo
	let touched = $state({ nombre: false, email: false, telefono: false });

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let errors = $derived({
		nombre:   touched.nombre   && formData.nombre.trim().length < 2,
		email:    touched.email    && !EMAIL_RE.test(formData.email),
		telefono: touched.telefono && formData.telefono.trim().length < 6,
	});

	function markTouched(field: keyof typeof touched) {
		touched[field] = true;
	}

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
			touched = { nombre: false, email: false, telefono: false };
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

	$effect(() => {
		if (isOpen) {
			if (preselectedPlan === "landing") {
				formData.servicio = "onepage";
			} else if (preselectedPlan === "sitio") {
				formData.servicio = "medida";
			}
		}
	});

	const serviceOptions = [
		{ value: "corporativo",  label: "Sitio web corporativo",  icon: IconBriefcase },
		{ value: "ecommerce",    label: "E-commerce",             icon: IconCart },
		{ value: "optimizacion", label: "Optimización web",       icon: IconLightning },
		{ value: "medida",       label: "Sitios web a la medida", icon: IconSwatches },
		{ value: "onepage",      label: "Landing page (one-page)",icon: IconFile }
	];

	const contactOptions = [
		{ value: "whatsapp", label: "Por WhatsApp",            icon: IconChatDots },
		{ value: "correo",   label: "Por correo electrónico",  icon: IconEnvelope },
		{ value: "llamada",  label: "Por llamada telefónica",  icon: IconTelephoneCall }
	];

	const budgetOptions = [
		"$600.000 – $1.000.000 CLP",
		"$1.000.000 – $1.500.000 CLP",
		"$1.500.000 – $3.000.000 CLP",
		"Más de $3.000.000 CLP"
	];

	function canContinue(): boolean {
		if (currentStep === 1) return !!formData.servicio;
		if (currentStep === 2) {
			return (
				formData.nombre.trim().length >= 2 &&
				EMAIL_RE.test(formData.email) &&
				formData.telefono.trim().length >= 6
			);
		}
		if (currentStep === 3) return !!formData.contacto;
		if (currentStep === 4) return !!formData.presupuesto;
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
					<div class="success-check" aria-hidden="true">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</div>
					<h2 class="success-title">¡Listo! Te contactaremos<br>pronto.</h2>
					<p class="success-desc">Revisaremos tu solicitud y nos pondremos en contacto en menos de 24 horas.</p>
					<button class="btn-back-home" onclick={handleClose}>Volver al sitio</button>
				</div>

			{:else}
				<!-- ── Nav bar: [← Atrás] [dots] [×] ── -->
				<div class="modal-nav">
					<button
						class="btn-nav-back"
						onclick={prevStep}
						disabled={currentStep === 1}
						aria-label="Paso anterior"
					>
						<IconArrowLeft width="14" height="14" />
						Atrás
					</button>

					<div class="step-dots" role="tablist" aria-label="Progreso del formulario">
						{#each Array(totalSteps) as _, i}
							<div
								class="dot"
								class:active={i + 1 === currentStep}
								class:done={i + 1 < currentStep}
								role="tab"
								aria-selected={i + 1 === currentStep}
								aria-label={`Paso ${i + 1} de ${totalSteps}`}
							></div>
						{/each}
					</div>

					<button class="btn-nav-close" onclick={handleClose} aria-label="Cerrar formulario">
						<IconX width="15" height="15" />
					</button>
				</div>

				<!-- ── Step 1: Tipo de proyecto ── -->
				{#if currentStep === 1}
					<div class="step-body" id="modal-title">
						<div class="step-header">
							{#if preselectedPlan === 'landing'}
								<div class="modal-header-badge">
									<span class="badge-dot"></span> Landing Page · $300.000 CLP
								</div>
							{:else if preselectedPlan === 'sitio'}
								<div class="modal-header-badge custom">
									<span class="badge-dot"></span> Sitio Web · Cotización personalizada
								</div>
							{/if}
							<h2 class="step-title">¿Qué tipo de sitio necesitas?</h2>
							<p class="step-subtitle">Selecciona el tipo de proyecto.</p>
						</div>

						<div class="selector-group">
							{#each serviceOptions as opt}
								<button
									class="selector-block"
									class:selected={formData.servicio === opt.value}
									onclick={() => { formData.servicio = opt.value; }}
									aria-pressed={formData.servicio === opt.value}
								>
									<span class="selector-label">
										<span class="selector-icon"><opt.icon width="22" height="22" /></span>
										<span class="selector-text">{opt.label}</span>
									</span>
									<span class="radio-indicator" class:checked={formData.servicio === opt.value} aria-hidden="true"></span>
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
							<h2 class="step-title" id="modal-title">¿Cómo te llamamos?</h2>
							<p class="step-subtitle">Para coordinar una llamada o reunión contigo.</p>
						</div>

						<div class="fields">
							<div class="field" class:has-error={errors.nombre}>
								<label for="q-nombre">
									Nombre y apellido
									<span class="required-mark" aria-hidden="true">*</span>
								</label>
								<input
									type="text"
									id="q-nombre"
									bind:value={formData.nombre}
									autocomplete="name"
									placeholder="Tu nombre aquí"
									onblur={() => markTouched('nombre')}
								/>
								{#if errors.nombre}
									<span class="field-error" role="alert">Ingresa tu nombre completo</span>
								{/if}
							</div>

							<div class="field" class:has-error={errors.email}>
								<label for="q-email">
									Correo electrónico
									<span class="required-mark" aria-hidden="true">*</span>
								</label>
								<input
									type="email"
									id="q-email"
									bind:value={formData.email}
									autocomplete="email"
									placeholder="Tu correo aquí"
									onblur={() => markTouched('email')}
								/>
								{#if errors.email}
									<span class="field-error" role="alert">Ingresa un correo válido</span>
								{/if}
							</div>

							<div class="field" class:has-error={errors.telefono}>
								<label for="q-tel">
									Teléfono
									<span class="required-mark" aria-hidden="true">*</span>
								</label>
								<input
									type="tel"
									id="q-tel"
									bind:value={formData.telefono}
									autocomplete="tel"
									placeholder="+56 9 1234 5678"
									onblur={() => markTouched('telefono')}
								/>
								{#if errors.telefono}
									<span class="field-error" role="alert">Ingresa tu número de teléfono</span>
								{/if}
							</div>
						</div>

						<p class="fields-note" aria-hidden="true">* Todos los campos son requeridos</p>

						<div class="step-actions">
							<button class="btn-continue" onclick={nextStep} disabled={!canContinue()}>
								Continuar
							</button>
						</div>
					</div>

				<!-- ── Step 3: Medio de contacto ── -->
				{:else if currentStep === 3}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title" id="modal-title">¿Cómo prefieres que te contactemos?</h2>
							<p class="step-subtitle">Nos adaptamos a lo que te sea más cómodo.</p>
						</div>

						<div class="selector-group selector-group--col">
							{#each contactOptions as opt}
								<button
									class="selector-block"
									class:selected={formData.contacto === opt.value}
									onclick={() => { formData.contacto = opt.value; }}
									aria-pressed={formData.contacto === opt.value}
								>
									<span class="selector-label">
										<span class="selector-icon"><opt.icon width="22" height="22" /></span>
										<span class="selector-text">{opt.label}</span>
									</span>
									<span class="radio-indicator" class:checked={formData.contacto === opt.value} aria-hidden="true"></span>
								</button>
							{/each}
						</div>

						<button class="btn-continue" onclick={nextStep} disabled={!canContinue()}>
							Continuar
						</button>
					</div>

				<!-- ── Step 4: Presupuesto ── -->
				{:else if currentStep === 4}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title" id="modal-title">¿Con qué presupuesto cuentas?</h2>
							<p class="step-subtitle">Sin presión — nos ayuda a recomendarte lo que más te conviene.</p>
						</div>

						<div class="selector-group selector-group--col">
							{#each budgetOptions as opt}
								<button
									class="selector-block"
									class:selected={formData.presupuesto === opt}
									onclick={() => { formData.presupuesto = opt; }}
									aria-pressed={formData.presupuesto === opt}
								>
									<span class="selector-label">
										<span class="selector-text">{opt}</span>
									</span>
									<span class="radio-indicator" class:checked={formData.presupuesto === opt} aria-hidden="true"></span>
								</button>
							{/each}
						</div>

						<button class="btn-continue" onclick={nextStep} disabled={!canContinue()}>
							Continuar
						</button>
					</div>

				<!-- ── Step 5: Descripción del proyecto ── -->
				{:else if currentStep === 5}
					<div class="step-body">
						<div class="step-header">
							<h2 class="step-title" id="modal-title">Cuéntanos sobre tu proyecto</h2>
							<p class="step-subtitle">Opcional — pero mientras más detalle, mejor podremos prepararnos.</p>
						</div>

						<textarea
							class="project-textarea"
							bind:value={formData.proyecto}
							placeholder="Cuéntanos qué necesitas..."
						></textarea>

						<button
							class="btn-continue"
							class:loading={formState === "loading"}
							onclick={nextStep}
							disabled={formState === "loading"}
							aria-live="polite"
						>
							{#if formState === "loading"}
								<span class="loading-dots" aria-label="Enviando...">
									<span></span><span></span><span></span>
								</span>
							{:else}
								Enviar solicitud
							{/if}
						</button>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}

<style>
	/* ── Header Badge ── */
	.modal-header-badge {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		border-radius: var(--radius-full);
		background: rgba(214, 244, 122, 0.08);
		border: 1px solid rgba(214, 244, 122, 0.15);
		color: var(--color-accent-primary);
		font-family: var(--font-headline);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.03em;
		margin-bottom: 8px;
	}

	.modal-header-badge .badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-accent-primary);
	}

	.modal-header-badge.custom {
		background: rgba(215, 144, 240, 0.08);
		border: 1px solid rgba(215, 144, 240, 0.15);
		color: var(--color-primary);
	}

	.modal-header-badge.custom .badge-dot {
		background: var(--color-primary);
	}

	/* ── Backdrop ── */
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(10, 14, 28, 0.76);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
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
		background: var(--color-surface-base);
		border: 1px solid var(--color-border-card);
		border-radius: 24px;
		width: 100%;
		max-width: 480px;
		max-height: calc(100dvh - 48px);
		padding: 28px;
		box-shadow: 0 32px 64px rgba(0, 0, 0, 0.55);
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		overflow-y: auto;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.modal-content::-webkit-scrollbar { display: none; }

	/* ── Nav bar: [← Atrás] [dots] [×] ── */
	.modal-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-8);
	}

	.btn-nav-back {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out-expo),
			opacity var(--dur-fast) var(--ease-out-expo),
			color var(--dur-fast) var(--ease-out-expo);
		white-space: nowrap;
		min-width: 88px;
	}
	.btn-nav-back:disabled {
		opacity: 0;
		pointer-events: none;
	}
	.btn-nav-back:not(:disabled):hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-white);
	}

	.btn-nav-close {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		transition:
			background var(--dur-fast) var(--ease-out-expo),
			color var(--dur-fast) var(--ease-out-expo);
	}
	.btn-nav-close:hover {
		background: rgba(255, 255, 255, 0.12);
		color: var(--color-white);
	}

	/* ── Step dots ── */
	.step-dots {
		display: flex;
		align-items: center;
		gap: 6px;
		flex: 1;
		justify-content: center;
	}

	.dot {
		height: 8px;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.15);
		transition:
			width var(--dur-normal) var(--ease-out-expo),
			background var(--dur-normal) var(--ease-out-expo);
		width: 8px;
	}
	.dot.active {
		width: 28px;
		background: var(--color-primary);
	}
	.dot.done {
		background: rgba(215, 144, 240, 0.42);
		width: 8px;
	}

	/* ── Step body ── */
	.step-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		animation: fadeSlide 0.22s ease-out;
	}

	/* ── Step header ── */
	.step-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.step-title {
		font-family: var(--font-headline);
		font-size: clamp(20px, 4vw, 24px);
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
		line-height: 1.2;
	}

	.step-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-base);
		line-height: 1.5;
		color: var(--color-text-secondary);
		margin: 0;
	}

	/* ── Selector blocks — columna única ── */
	.selector-group,
	.selector-group--col {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.selector-block {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 14px;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border-card);
		background: transparent;
		cursor: pointer;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo),
			background var(--dur-fast) var(--ease-out-expo);
		text-align: left;
		gap: var(--space-2);
	}

	.selector-block:hover {
		border-color: rgba(255, 255, 255, 0.22);
		background: rgba(255, 255, 255, 0.03);
	}

	.selector-block.selected {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 1px var(--color-primary), 0 0 16px rgba(215, 144, 240, 0.18);
		background: rgba(215, 144, 240, 0.06);
	}

	.selector-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
		flex: 1;
	}

	.selector-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		color: var(--color-text-secondary);
		flex-shrink: 0;
		transition: color var(--dur-fast) var(--ease-out-expo);
	}
	.selector-block.selected .selector-icon {
		color: var(--color-primary);
	}

	.selector-text {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		line-height: 1.4;
		color: var(--color-white);
		white-space: normal;
		word-break: break-word;
	}

	/* ── Radio indicator ── */
	.radio-indicator {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.2);
		flex-shrink: 0;
		transition: all var(--dur-fast) var(--ease-out-expo);
		position: relative;
	}

	.radio-indicator.checked {
		border-color: var(--color-primary);
		background: var(--color-primary);
		box-shadow: 0 0 8px rgba(215, 144, 240, 0.6);
	}

	.radio-indicator.checked::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-on-primary);
	}

	/* ── Fields (Step 2) ── */
	.fields {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.field label {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-white);
		display: flex;
		align-items: center;
		gap: 2px;
	}

	/* Asterisco requerido: usa el color primario — no rojo */
	.required-mark {
		color: var(--color-primary);
		font-size: 14px;
		line-height: 1;
		margin-left: 1px;
	}

	.field input {
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--color-white);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-md);
		padding: 12px 14px;
		outline: none;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo);
		width: 100%;
	}

	.field input:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(215, 144, 240, 0.12);
	}

	.field input::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	/* Estado de error */
	.field.has-error input {
		border-color: var(--color-error);
		box-shadow: 0 0 0 3px var(--color-error-bg);
	}

	/* Borde de éxito (campo completado y válido) */
	.field:not(.has-error) input:not(:placeholder-shown):not(:focus) {
		border-color: var(--color-success-border);
	}

	.field-error {
		font-family: var(--font-body);
		font-size: var(--text-xs);
		color: var(--color-error);
		display: flex;
		align-items: center;
		gap: 5px;
		animation: fadeSlide 0.18s ease-out;
	}
	.field-error::before {
		content: '!';
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--color-error);
		color: #fff;
		font-size: 9px;
		font-weight: 700;
		flex-shrink: 0;
	}

	/* Nota de pie de campos */
	.fields-note {
		font-family: var(--font-body);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		opacity: 0.7;
		margin: calc(var(--space-2) * -1) 0 0;
	}

	/* ── Textarea (Step 5) ── */
	.project-textarea {
		font-family: var(--font-body);
		font-size: var(--text-base);
		color: var(--color-white);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-md);
		padding: 14px;
		outline: none;
		resize: none;
		min-height: 140px;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo);
		width: 100%;
	}

	.project-textarea:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(215, 144, 240, 0.12);
	}

	.project-textarea::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	/* ── Step actions ── */
	.step-actions {
		display: flex;
		gap: var(--space-3);
	}

	/* ── Botón Continuar — ESTADOS CORREGIDOS ── */
	/* Default activo: color primario pleno cuando el formulario está completo */
	.btn-continue {
		flex: 1;
		width: 100%;
		padding: 15px 24px;
		border-radius: var(--radius-full);
		/* Estado ACTIVO: purple pleno — default cuando puede continuar */
		background: var(--color-primary);
		border: none;
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo),
			transform var(--dur-fast) var(--ease-out-expo),
			color var(--dur-fast) var(--ease-out-expo);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		box-shadow: 0 0 12px rgba(215, 144, 240, 0.3);
	}

	/* Hover sobre botón activo: elevación + glow intenso */
	.btn-continue:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 0 24px var(--color-primary-glow);
	}

	/* Estado BLOQUEADO: rosa suave — misma familia, nunca gris */
	.btn-continue:disabled {
		background: rgba(215, 144, 240, 0.14);
		color: rgba(215, 144, 240, 0.45);
		box-shadow: none;
		cursor: not-allowed;
		transform: none;
	}

	/* Loading state */
	.btn-continue.loading {
		background: rgba(215, 144, 240, 0.35);
		cursor: wait;
	}

	/* Indicador de carga animado */
	.loading-dots {
		display: flex;
		gap: 5px;
		align-items: center;
	}
	.loading-dots span {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		animation: pulse 1.2s ease-in-out infinite;
	}
	.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
	.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

	/* ── Success state ── */
	.success-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-4);
		padding: var(--space-6) 0;
		animation: fadeSlide 0.3s ease-out;
	}

	.success-check {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full);
		/* Token normalizado — reutilizable en PRD-2 y PRD-3 */
		background: var(--color-success-bg);
		border: 1px solid var(--color-success-border);
		color: var(--color-success);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 32px var(--color-success-glow);
	}

	.success-title {
		font-family: var(--font-headline);
		font-size: clamp(20px, 4vw, 24px);
		font-weight: 700;
		color: var(--color-white);
		margin: 0;
		line-height: 1.2;
	}

	.success-desc {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.5;
		max-width: 280px;
	}

	.btn-back-home {
		margin-top: var(--space-2);
		height: 44px;
		padding: 0 28px;
		border-radius: var(--radius-full);
		background: transparent;
		border: 1px solid var(--color-border-card);
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			color var(--dur-fast) var(--ease-out-expo);
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
		from { opacity: 0; transform: translateY(20px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	@keyframes fadeSlide {
		from { opacity: 0; transform: translateX(8px); }
		to   { opacity: 1; transform: translateX(0); }
	}

	@keyframes pulse {
		0%, 80%, 100% { opacity: 0.3; transform: scale(0.85); }
		40%            { opacity: 1;   transform: scale(1); }
	}

	/* ── Mobile ── */
	@media (max-width: 640px) {
		.modal-content {
			padding: 22px 18px;
			border-radius: 20px;
		}

		.selector-block {
			padding: 14px 12px;
		}

		.step-title {
			font-size: 20px;
		}
	}

	/* ── Reduced motion ── */
	@media (prefers-reduced-motion: reduce) {
		.modal-backdrop { animation: none; }
		.modal-content  { animation: none; }
		.step-body      { animation: none; }
		.field-error    { animation: none; }
		.loading-dots span { animation: none; opacity: 1; }
	}
</style>
