/**
 * @module _shared/attrs
 * @description Builder utility for the `data-fabrica-*` attribute system.
 * Replaces conditional class strings with semantic data attributes
 * for state-driven styling.
 *
 * @example
 * ```svelte
 * <script>
 *   import { fabricaAttrs } from '../_shared/attrs';
 *   const attrs = fabricaAttrs('button', { variant: 'primary', disabled: true });
 * </script>
 * <button {...attrs}>Click</button>
 *
 * <!-- Renders: <button data-fabrica-button data-variant="primary" data-disabled="true"> -->
 * ```
 */

/**
 * Generates a flat object of `data-fabrica-*` and `data-*` attributes
 * suitable for spreading onto an HTML element.
 *
 * @param component - The component name (e.g., 'button', 'bento-item')
 * @param state - Optional key-value pairs for state attributes.
 *               `false` and `undefined` values are omitted.
 */
export function fabricaAttrs(
	component: string,
	state?: Record<string, string | boolean | undefined>
): Record<string, string | true> {
	const attrs: Record<string, string | true> = {
		[`data-fabrica-${component}`]: true
	};

	if (state) {
		for (const [key, value] of Object.entries(state)) {
			if (value !== undefined && value !== false) {
				attrs[`data-${key}`] = value === true ? '' : String(value);
			}
		}
	}

	return attrs;
}
