/**
 * @module token-mapping
 * @description Fuente única de verdad del mapeo Figma → CSS Custom Properties.
 * Consumido por sync-tokens.ts (escritura) y verify-tokens.ts (gate de paridad).
 * Lección anti-desync de Instatic: dos copias de la misma verdad terminan divergiendo.
 */

export const FIGMA_TO_CSS: Record<string, string> = {
	'general/primary': '--color-primary',
	'general/primary-foreground': '--color-primary-foreground',
	'general/secondary': '--color-secondary',
	'general/background': '--color-neutral-bg',
	'general/foreground': '--color-text-primary',
	'general/muted-foreground': '--color-text-muted',
	'general/border': '--color-border-light',
	'font definitions/font-family-body': '--font-body',
	'rounded-lg': '--radius-md'
};

/** Normaliza un valor Figma al formato CSS final (misma regla que sync-tokens). */
export function normalizeValue(cssVar: string, value: string): string {
	if (!isNaN(Number(value)) && cssVar.includes('radius')) return `${value}px`;
	return value;
}
