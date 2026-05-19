/**
 * @script sync-tokens.ts
 * @description Ingestor automático de tokens de diseño desde Figma JSON a CSS Variables.
 * Elimina el error humano en la transferencia de identidad visual.
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const FIGMA_JSON_PATH = join(process.cwd(), 'figma-tokens.json');
const BRAND_CSS_PATH = join(process.cwd(), 'utils', 'client-brand.css');

interface FigmaVariables {
	[key: string]: string;
}

function sync() {
	try {
		console.log("🚀 Iniciando sincronización de tokens...");
		
		const rawData = readFileSync(FIGMA_JSON_PATH, 'utf-8');
		const tokens: FigmaVariables = JSON.parse(rawData);

		// Mapeo Inteligente (Figma Name -> CSS Variable)
		const mapping: Record<string, string> = {
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

		let cssContent = `/* ── AUTOGENERADO: NO EDITAR MANUALMENTE ── */\n:root {\n`;

		for (const [figmaName, cssVar] of Object.entries(mapping)) {
			if (tokens[figmaName]) {
				let value = tokens[figmaName];
				// Añadir 'px' si es un número puro como el radius
				if (!isNaN(Number(value)) && cssVar.includes('radius')) {
					value = `${value}px`;
				}
				cssContent += `	${cssVar}: ${value};\n`;
			}
		}

		cssContent += `\n	/* Fallbacks y derivados automáticos */\n`;
		cssContent += `	--button-radius: var(--radius-md);\n`;
		cssContent += `	--font-headline: var(--font-body);\n`;
		cssContent += `}\n`;

		writeFileSync(BRAND_CSS_PATH, cssContent);
		console.log("✅ client-brand.css actualizado con éxito desde Figma.");

	} catch (error) {
		console.error("❌ Error en la sincronización:", error.message);
		console.log("💡 Tip: Asegúrate de tener un archivo 'figma-tokens.json' en la raíz.");
	}
}

sync();
