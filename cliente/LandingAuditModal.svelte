<script lang="ts">
	import IconX from "~icons/mynaui/x";
	import IconUser from "~icons/mynaui/user";
	import IconMail from "~icons/mynaui/envelope";
	import IconPhone from "~icons/mynaui/telephone";
	import IconGlobe from "~icons/mynaui/globe";
	import IconCheck from "~icons/mynaui/check";

	let { isOpen = false, onClose } = $props<{ isOpen: boolean; onClose: () => void }>();

	let formData = $state({
		nombre: "",
		email: "",
		telefono: "",
		sitio: "",
		copiaEmail: false
	});

	let touched = $state({ nombre: false, email: false, sitio: false });

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	let errors = $derived({
		nombre: touched.nombre && formData.nombre.trim().length < 2,
		email:  touched.email  && !EMAIL_RE.test(formData.email),
		sitio:  touched.sitio  && formData.sitio.trim().length < 4
	});

	function markTouched(field: keyof typeof touched) {
		touched[field] = true;
	}

	function isValid() {
		return formData.nombre.trim().length >= 2 &&
		       EMAIL_RE.test(formData.email) &&
		       formData.sitio.trim().length >= 4;
	}

	function handleClose() {
		onClose();
		setTimeout(() => {
			touched = { nombre: false, email: false, sitio: false };
			formData = { nombre: "", email: "", telefono: "", sitio: "", copiaEmail: false };
		}, 300);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && isOpen) handleClose();
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!isValid()) {
			touched.nombre = true;
			touched.email = true;
			touched.sitio = true;
			return;
		}

		const params = new URLSearchParams({
			sitio: formData.sitio.trim(),
			nombre: formData.nombre.trim(),
			email: formData.email.trim(),
			telefono: formData.telefono.trim(),
			copiaEmail: formData.copiaEmail ? "true" : "false"
		});

		// Close modal first and then navigate seamlessly to the analysis page
		onClose();
		setTimeout(() => {
			window.location.href = `/reporte?${params.toString()}`;
		}, 200);
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
			<!-- Nav Bar -->
			<div class="modal-nav">
				<span class="nav-badge">AUDITORÍA GRATUITA</span>
				<button class="btn-nav-close" onclick={handleClose} aria-label="Cerrar formulario">
					<IconX width="15" height="15" />
				</button>
			</div>

			<!-- Hero Title -->
			<div class="form-hero">
				<h2 class="form-title" id="modal-title">Lo que no mides<br>no puede mejorar.</h2>
				<p class="form-subtitle">Mediremos la performance y el impacto ambiental de tu sitio.</p>
			</div>

			<!-- Form Intake Card -->
			<form class="intake-form" onsubmit={handleSubmit} novalidate>
				<div class="field" class:has-error={errors.nombre}>
					<label for="calc-nombre">
						<IconUser width="14" height="14" />
						Nombre y apellido <span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input type="text" id="calc-nombre" bind:value={formData.nombre} required placeholder="Escribe tu nombre" onblur={() => markTouched('nombre')} />
					{#if errors.nombre}
						<span class="field-error" role="alert">Ingresa tu nombre completo</span>
					{/if}
				</div>

				<div class="field" class:has-error={errors.email}>
					<label for="calc-email">
						<IconMail width="14" height="14" />
						Correo electrónico <span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input type="email" id="calc-email" bind:value={formData.email} required placeholder="Tu correo aquí" onblur={() => markTouched('email')} />
					{#if errors.email}
						<span class="field-error" role="alert">Ingresa un correo válido</span>
					{/if}
				</div>

				<div class="field">
					<label for="calc-tel">
						<IconPhone width="14" height="14" />
						Teléfono
					</label>
					<input type="tel" id="calc-tel" bind:value={formData.telefono} placeholder="+56 9 1234 5678" />
				</div>

				<div class="field" class:has-error={errors.sitio}>
					<label for="calc-sitio">
						<IconGlobe width="14" height="14" />
						Sitio Web <span class="required-mark" aria-hidden="true">*</span>
					</label>
					<input type="text" id="calc-sitio" bind:value={formData.sitio} required placeholder="ej: midominio.com" onblur={() => markTouched('sitio')} />
					{#if errors.sitio}
						<span class="field-error" role="alert">Ingresa la dirección de tu sitio web</span>
					{/if}
				</div>

				<button type="submit" class="btn-submit" disabled={!isValid()}>
					<IconCheck width="18" height="18" />
					<span>Quiero mi auditoría gratuita</span>
				</button>

				<label class="checkbox-row">
					<div class="checkbox-wrapper">
						<input type="checkbox" bind:checked={formData.copiaEmail} />
						<IconCheck width="12" height="12" class="check-icon" />
					</div>
					<span>Quiero recibir una copia del informe por correo.</span>
				</label>
			</form>
		</div>
	</div>
{/if}

<style>
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
		gap: var(--space-4);
	}
	.modal-content::-webkit-scrollbar { display: none; }

	/* ── Nav bar ── */
	.modal-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.nav-badge {
		font-family: var(--font-headline);
		font-size: var(--text-xs);
		font-weight: 500;
		color: var(--color-accent-primary);
		letter-spacing: 0.08em;
		padding: 4px 10px;
		border-radius: var(--radius-full);
		background: rgba(214, 244, 122, 0.1);
		border: 0.2px solid rgba(214, 244, 122, 0.2);
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

	/* ── Hero Title ── */
	.form-hero {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.form-title {
		font-family: var(--font-headline);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.form-subtitle {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
		opacity: 0.9;
	}

	/* ── Form Intake ── */
	.intake-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-body);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-white);
	}

	.field label :global(svg) {
		color: var(--color-accent-primary);
	}

	.required-mark {
		color: var(--color-accent-primary);
		font-size: 14px;
		line-height: 1;
		margin-left: 1px;
	}

	.field input {
		font-family: var(--font-body);
		font-size: var(--text-sm);
		color: var(--color-white);
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-md);
		padding: 0 14px;
		height: 44px;
		outline: none;
		transition:
			border-color var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo);
		width: 100%;
	}

	.field input:focus {
		border-color: var(--color-accent-primary);
		box-shadow: 0 0 0 3px rgba(214, 244, 122, 0.12);
	}

	.field input::placeholder {
		color: rgba(255, 255, 255, 0.25);
	}

	/* Estado de error */
	.field.has-error input {
		border-color: var(--color-error);
		box-shadow: 0 0 0 3px var(--color-error-bg);
	}

	/* Borde de éxito */
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
		margin-top: 1px;
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

	/* ── Button submit ── */
	.btn-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 48px;
		border-radius: var(--radius-full);
		background: var(--color-accent-primary);
		border: none;
		color: var(--color-surface-dark);
		font-family: var(--font-body);
		font-size: var(--text-sm);
		font-weight: 700;
		cursor: pointer;
		transition:
			transform var(--dur-fast) var(--ease-out-expo),
			box-shadow var(--dur-fast) var(--ease-out-expo);
		margin-top: var(--space-2);
		box-shadow: 0 0 12px rgba(214, 244, 122, 0.2);
	}

	.btn-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(214, 244, 122, 0.45);
	}

	.btn-submit:disabled {
		background: rgba(214, 244, 122, 0.12);
		color: rgba(214, 244, 122, 0.5);
		box-shadow: none;
		cursor: not-allowed;
		transform: none;
	}

	/* ── Checkbox Row ── */
	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: var(--text-xs);
		color: var(--color-text-secondary);
		user-select: none;
	}

	.checkbox-wrapper {
		position: relative;
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.checkbox-wrapper input[type="checkbox"] {
		appearance: none;
		-webkit-appearance: none;
		position: absolute;
		inset: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		border: 1.5px solid var(--color-border-card);
		border-radius: 4px;
		background: transparent;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out-expo),
			border-color var(--dur-fast) var(--ease-out-expo);
	}

	.checkbox-wrapper input[type="checkbox"]:checked {
		background: var(--color-accent-primary);
		border-color: var(--color-accent-primary);
	}

	.checkbox-wrapper :global(.check-icon) {
		position: relative;
		z-index: 1;
		color: var(--color-surface-dark);
		pointer-events: none;
		display: none;
	}

	.checkbox-wrapper input[type="checkbox"]:checked ~ :global(.check-icon) {
		display: block;
	}

	/* ── Animations ── */
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideUp {
		from { transform: translateY(20px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}

	@keyframes fadeSlide {
		from { opacity: 0; transform: translateX(8px); }
		to { opacity: 1; transform: translateX(0); }
	}

	/* Mobile */
	@media (max-width: 480px) {
		.modal-content {
			padding: 20px;
			gap: var(--space-3);
		}
		.form-title {
			font-size: var(--text-lg);
		}
	}
</style>
