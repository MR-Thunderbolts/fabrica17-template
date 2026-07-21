/**
 * @script sync-tokens.ts
 * @description Ingestor automático de tokens de diseño desde Figma JSON a CSS Variables.
 * Elimina el error humano en la transferencia de identidad visual.
 *
 * Escribe SOLO dentro del bloque delimitado de cliente/tokens.css
 * (entre FIGMA SYNC START y FIGMA SYNC END), preservando los
 * overrides manuales del cliente fuera del bloque.
 */

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { FIGMA_TO_CSS, normalizeValue } from './token-mapping.ts';

const FIGMA_JSON_PATH = join(process.cwd(), 'figma-tokens.json');
const BRAND_CSS_PATH = join(process.cwd(), 'cliente', 'tokens.css');

const SYNC_START = '/* ── FIGMA SYNC START (autogenerado — no editar este bloque) ── */';
const SYNC_END = '/* ── FIGMA SYNC END ── */';

interface FigmaVariables {
	[key: string]: string;
}

function sync() {
	try {
		console.log('🚀 Iniciando sincronización de tokens...');

		const rawData = readFileSync(FIGMA_JSON_PATH, 'utf-8');
		const tokens: FigmaVariables = JSON.parse(rawData);

		// Mapeo compartido con verify-tokens.ts (fuente única: token-mapping.ts)
		let block = `${SYNC_START}\n:root {\n`;
		for (const [figmaName, cssVar] of Object.entries(FIGMA_TO_CSS)) {
			if (tokens[figmaName]) {
				block += `\t${cssVar}: ${normalizeValue(cssVar, tokens[figmaName])};\n`;
			}
		}
		block += `}\n${SYNC_END}`;

		const css = readFileSync(BRAND_CSS_PATH, 'utf-8');
		const startIdx = css.indexOf(SYNC_START);
		const endIdx = css.indexOf(SYNC_END);

		let updated: string;
		if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
			updated = css.slice(0, startIdx) + block + css.slice(endIdx + SYNC_END.length);
		} else {
			// Sin marcadores: anexar el bloque al final del archivo.
			updated = `${css.trimEnd()}\n\n${block}\n`;
		}

		writeFileSync(BRAND_CSS_PATH, updated);
		console.log('✅ cliente/tokens.css actualizado con éxito desde Figma.');
	} catch (error) {
		console.error('❌ Error en la sincronización:', (error as Error).message);
		console.log("💡 Tip: Asegúrate de tener un archivo 'figma-tokens.json' en la raíz.");
	}
}

sync();
