<script lang="ts">
	import IconUser from "~icons/mynaui/user";
	import IconMail from "~icons/mynaui/envelope";
	import IconPhone from "~icons/mynaui/telephone";
	import IconGlobe from "~icons/mynaui/globe";
	import IconCheck from "~icons/mynaui/check";
	import IconArrowLeft from "~icons/mynaui/arrow-left";

	let { onSubmit } = $props<{ onSubmit: (data: { nombre: string; email: string; telefono: string; sitio: string; copiaEmail: boolean }) => void }>();

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

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!isValid()) {
			touched.nombre = true;
			touched.email = true;
			touched.sitio = true;
			return;
		}
		onSubmit(formData);
	}
</script>

<div class="form-page">

	<div class="form-layout">
		<a href="/" class="back-link">
			<IconArrowLeft width="16" height="16" />
			<span>Volver al inicio</span>
		</a>

		<div class="form-hero">
			<h1 class="form-title">Lo que no mides<br>no puede mejorar.</h1>
			<p class="form-subtitle">El mejor inicio para optimizar un sitio web<br>es medir el performance y el impacto.</p>
		</div>

		<form class="intake-card" onsubmit={handleSubmit} novalidate>
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

<style>
	.form-page {
		min-height: 100vh;
		min-height: 100dvh;
		background: var(--color-audit-bg);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form-layout {
		width: 100%;
		max-width: 480px;
		padding: 40px clamp(20px, 5vw, 40px);
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--color-text-muted);
		font-family: var(--font-body);
		font-size: 14px;
		text-decoration: none;
		transition: color var(--dur-fast) var(--ease-out-expo);
		width: fit-content;
	}

	.back-link:hover {
		color: var(--color-white);
	}

	.form-hero {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.form-title {
		font-family: var(--font-headline);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-white);
		line-height: 1.15;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.form-subtitle {
		font-family: var(--font-body);
		font-size: 16px;
		color: var(--color-text-muted);
		line-height: 24px;
		margin: 0;
	}

	/* Form Card */
	.intake-card {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 32px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border-card);
		background: var(--color-audit-surface);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-body);
		font-size: 13px;
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
		font-size: 15px;
		color: var(--color-white);
		background: transparent;
		border: 1px solid var(--color-border-card);
		border-radius: var(--radius-sm);
		padding: 0 14px;
		height: 44px;
		outline: none;
		transition: border-color var(--dur-fast) var(--ease-out-expo);
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
		margin-top: 2px;
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

	.btn-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 48px;
		border-radius: var(--radius-full);
		background: var(--color-accent-primary);
		border: none;
		color: var(--color-surface-dark);
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 700;
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo);
		margin-top: 4px;
	}

	.btn-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(214, 244, 122, 0.4);
	}

	.btn-submit:disabled {
		background: rgba(214, 244, 122, 0.12);
		color: rgba(214, 244, 122, 0.5);
		box-shadow: none;
		cursor: not-allowed;
		transform: none;
	}

	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 13px;
		color: var(--color-text-muted);
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
		transition: background var(--dur-fast) var(--ease-out-expo), border-color var(--dur-fast) var(--ease-out-expo);
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

	/* Mobile */
	@media (max-width: 768px) {
		.form-layout {
			padding: 24px clamp(20px, 5vw, 40px);
			gap: 24px;
		}

		.form-title {
			font-size: var(--text-2xl);
			line-height: 1.15;
		}

		.form-subtitle {
			font-size: 14px;
		}

		.form-subtitle br {
			display: none;
		}

		.intake-card {
			padding: 24px 20px;
			gap: 16px;
		}
	}

	@keyframes fadeSlide {
		from { opacity: 0; transform: translateX(8px); }
		to   { opacity: 1; transform: translateX(0); }
	}
</style>
