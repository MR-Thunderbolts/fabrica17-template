<script lang="ts">
	import IconUser from "~icons/ph/user";
	import IconMail from "~icons/ph/envelope";
	import IconPhone from "~icons/ph/phone";
	import IconGlobe from "~icons/ph/globe";
	import IconCheck from "~icons/ph/check";
	import IconArrowLeft from "~icons/ph-bold/arrow-left";

	let { onSubmit } = $props<{ onSubmit: (data: { nombre: string; email: string; telefono: string; sitio: string; copiaEmail: boolean }) => void }>();

	let formData = $state({
		nombre: "",
		email: "",
		telefono: "",
		sitio: "",
		copiaEmail: false
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!formData.nombre || !formData.sitio) return;
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

		<form class="intake-card" onsubmit={handleSubmit}>
			<div class="field">
				<label for="calc-nombre">
					<IconUser width="14" height="14" />
					Nombre y apellido <span class="req">(Requerido)</span>
				</label>
				<input type="text" id="calc-nombre" bind:value={formData.nombre} required placeholder="Escribe tu nombre" />
			</div>

			<div class="field">
				<label for="calc-email">
					<IconMail width="14" height="14" />
					Correo electrónico
				</label>
				<input type="email" id="calc-email" bind:value={formData.email} placeholder="Escribe tu correo" />
			</div>

			<div class="field">
				<label for="calc-tel">
					<IconPhone width="14" height="14" />
					Teléfono
				</label>
				<input type="tel" id="calc-tel" bind:value={formData.telefono} placeholder="Escribe tu teléfono" />
			</div>

			<div class="field">
				<label for="calc-sitio">
					<IconGlobe width="14" height="14" />
					Sitio Web
				</label>
				<input type="url" id="calc-sitio" bind:value={formData.sitio} required placeholder="URL de tu sitio web" />
			</div>

			<button type="submit" class="btn-submit">
				<IconCheck width="18" height="18" />
				<span>Quiero mi auditoría gratuita</span>
			</button>

			<label class="checkbox-row">
				<input type="checkbox" bind:checked={formData.copiaEmail} />
				<IconCheck width="14" height="14" class="check-icon" />
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
		color: var(--color-text-muted);
	}

	.req {
		font-weight: 400;
		color: var(--color-text-muted);
		font-size: 12px;
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
		border-color: var(--color-primary);
	}

	.field input::placeholder {
		color: rgba(255, 255, 255, 0.25);
	}

	.btn-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 48px;
		border-radius: var(--radius-full);
		background: var(--color-audit-accent);
		border: none;
		color: var(--color-on-primary);
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-out-expo), box-shadow var(--dur-fast) var(--ease-out-expo);
		margin-top: 4px;
	}

	.btn-submit:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 20px rgba(214, 244, 122, 0.4);
	}

	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-family: var(--font-body);
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.checkbox-row input[type="checkbox"] {
		appearance: none;
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border: 1.5px solid var(--color-border-card);
		border-radius: 4px;
		background: transparent;
		cursor: pointer;
		flex-shrink: 0;
		position: relative;
		transition: background var(--dur-fast) var(--ease-out-expo), border-color var(--dur-fast) var(--ease-out-expo);
	}

	.checkbox-row input[type="checkbox"]:checked {
		background: var(--color-audit-accent);
		border-color: var(--color-audit-accent);
	}

	.checkbox-row :global(.check-icon) {
		display: none;
	}

	.checkbox-row input[type="checkbox"]:checked ~ :global(.check-icon) {
		display: block;
		position: absolute;
		left: 2px;
		color: var(--color-on-primary);
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
</style>
