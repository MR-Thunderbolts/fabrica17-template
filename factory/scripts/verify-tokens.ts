/**
 * @script verify-tokens.ts
 * @description GATE DE PARIDAD Figma ↔ CSS (resuelve deuda E4 del playbook).
 * Detecta el error C4 ("Ghost Token") ANTES del ensamblaje, no después:
 *   - Valida figma-tokens.json (formato de valores)
 *   - Compara cada token mapeado contra cliente/tokens.css
 *   - Reporta: GHOSTS (mapeados pero ausentes del JSON), DRIFT (CSS ≠ JSON),
 *     ORPHANS (en el JSON pero sin mapeo — informativo)
 *
 * Uso:  bun factory/scripts/verify-tokens.ts
 * Exit 0 = paridad OK (o sin figma-tokens.json, nada que verificar)
 * Exit 1 = ghost tokens o drift → correr bun run tokens:sync o revisar Figma
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { FIGMA_TO_CSS, normalizeValue } from './token-mapping.ts';

const ROOT = process.cwd();
const FIGMA_JSON_PATH = join(ROOT, 'figma-tokens.json');
const BRAND_CSS_PATH = join(ROOT, 'cliente', 'tokens.css');

console.log('🔍 Fábrica17 — Token Parity Gate (Figma ↔ CSS)\n');

if (!existsSync(FIGMA_JSON_PATH)) {
	console.log('ℹ️  Sin figma-tokens.json en la raíz — nada que verificar.');
	console.log('   (El gate solo aplica tras extraer tokens con get_variable_defs)');
	process.exit(0);
}

// ── 1. Validar el JSON ──
let tokens: Record<string, string>;
try {
	tokens = JSON.parse(readFileSync(FIGMA_JSON_PATH, 'utf-8'));
} catch (e) {
	console.error('❌ figma-tokens.json no es JSON válido:', (e as Error).message);
	process.exit(1);
}

const VALID_VALUE = /^(#[0-9a-fA-F]{3,8}|\d+(\.\d+)?(px|rem|em|%)?|[a-zA-Z].*)$/;
const badValues = Object.entries(tokens).filter(
	([, v]) => typeof v !== 'string' || !VALID_VALUE.test(v)
);
if (badValues.length > 0) {
	console.error('❌ Valores inválidos en figma-tokens.json:');
	for (const [k, v] of badValues) console.error(`   ${k}: ${JSON.stringify(v)}`);
	process.exit(1);
}

// ── 2. Parsear cliente/tokens.css ──
if (!existsSync(BRAND_CSS_PATH)) {
	console.error('❌ cliente/tokens.css no existe. Correr: bun run tokens:sync');
	process.exit(1);
}
const css = readFileSync(BRAND_CSS_PATH, 'utf-8');
const cssVars = new Map<string, string>();
for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
	cssVars.set(m[1], m[2].trim());
}

// ── 3. Comparar ──
const ghosts: string[] = [];
const drift: string[] = [];
const orphans: string[] = [];

for (const [figmaName, cssVar] of Object.entries(FIGMA_TO_CSS)) {
	if (!(figmaName in tokens)) {
		ghosts.push(`${figmaName} → ${cssVar} (mapeado, ausente en Figma JSON)`);
		continue;
	}
	const expected = normalizeValue(cssVar, tokens[figmaName]);
	const actual = cssVars.get(cssVar);
	if (actual === undefined) {
		drift.push(`${cssVar} no existe en cliente/tokens.css (esperado: ${expected}) — sync pendiente`);
	} else if (actual.toLowerCase() !== expected.toLowerCase()) {
		drift.push(`${cssVar}: CSS='${actual}' ≠ Figma='${expected}'`);
	}
}

for (const figmaName of Object.keys(tokens)) {
	if (!(figmaName in FIGMA_TO_CSS)) orphans.push(figmaName);
}

// ── 4. Reporte ──
if (orphans.length > 0) {
	console.log(`⚠️  ${orphans.length} token(s) de Figma sin mapeo (revisar si son intencionales):`);
	for (const o of orphans) console.log(`   · ${o}`);
	console.log('');
}

if (ghosts.length > 0 || drift.length > 0) {
	if (ghosts.length > 0) {
		console.error('👻 GHOST TOKENS (error C4):');
		for (const g of ghosts) console.error(`   ❌ ${g}`);
	}
	if (drift.length > 0) {
		console.error('🌊 DRIFT Figma ↔ CSS:');
		for (const d of drift) console.error(`   ❌ ${d}`);
	}
	console.error('\n💡 Fix: re-extraer con get_variable_defs y correr bun run tokens:sync');
	process.exit(1);
}

console.log(`✅ Paridad OK — ${Object.keys(FIGMA_TO_CSS).length} tokens mapeados, 0 ghosts, 0 drift.`);
process.exit(0);
