<script lang="ts">
	/**
	 * @component NavbarLinks
	 * @description Center navigation links.
	 */
	import type { WithChild, NavbarLinksProps } from '../_shared/types';
	import { fabricaAttrs } from '../_shared/attrs';

	let {
		children,
		child,
		links = [],
		currentPath = '/',
		variant = 'flat',
		class: className,
		...rest
	}: WithChild<NavbarLinksProps & { variant?: 'flat' | 'pill' }> = $props();

	const attrs = $derived({
		...fabricaAttrs('navbar-links', { variant }),
		class: `navbar__links ${className ?? ''}`.trim(),
		...rest
	});
</script>

<div {...attrs}>
	{#if children}
		{@render children()}
	{/if}
	{#each links as link}
		<a 
			href={link.href} 
			class="nav-link"
			data-active={currentPath === link.href || undefined}
		>
			{link.label}
		</a>
	{/each}
</div>

<style>
	.navbar__links {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.nav-link {
		color: var(--color-text-body);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-text-primary);
	}

	.nav-link[data-active] {
		color: var(--color-primary);
	}

	/* Variant: Pill (Legacy/Optional) */
	[data-variant="pill"] {
		background: var(--color-neutral-warm, rgba(0,0,0,0.05));
		padding: 4px;
		border-radius: 100px;
		border: 1px solid var(--color-border-light);
	}

	[data-variant="pill"] .nav-link {
		padding: 8px 16px;
		border-radius: 100px;
		font-size: 0.85rem;
		font-weight: 700;
	}

	[data-variant="pill"] .nav-link[data-active] {
		background: var(--color-neutral-bg);
		color: var(--color-text-primary);
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
	}

	@media (max-width: 768px) {
		.navbar__links { display: none; }
	}
</style>
