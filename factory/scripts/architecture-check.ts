/**
 * @script architecture-check.ts
 * @description RIELES DE ACERO — Las reglas de governance/ como gates ejecutables.
 * Inspirado en el patrón de Instatic (src/__tests__/architecture/): una regla que
 * no falla el build es una sugerencia, no una regla.
 *
 * Uso:  bun factory/scripts/architecture-check.ts
 * Gates:
 *   1. Svelte 4 legacy syntax (RULES_SVELTE5.md)
 *   2. Hex hardcodeado en componentes de factory (STYLE.md — token-first)
 *   3. Imports ilegales factory ← cliente / $app / $root (WORKFLOW.md — 3-domain)
 *   4. Tailwind (PROHIBIDO — FABRICA_STATE_PLAYBOOK §1)
 *   5. Presupuesto de bundle JS comprimido (GREEN_CODING.md)
 *   6. SVGs de Figma con preserveAspectRatio="none" + 100%/100% (TESTING.md §9, warning-only)
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.svelte-kit', 'build', 'dist', '.git', '.vercel']);

// ── Deuda documentada (ver FABRICA_STATE_PLAYBOOK §4-E). Eliminar entrada al resolver. ──
const IMPORT_DEBT_WHITELIST: Record<string, string[]> = {
	'factory/src/lib/components/carousel/CarouselHeader.svelte': ['$root/utils/glow-action'], // E8
	'factory/src/lib/components/Dotted.Background.svelte': ['$root/utils/settings.svelte'] // E9
};

// ── Presupuestos GREEN_CODING (bytes, JS comprimido brotli) ──
const JS_BUDGET_A = 150 * 1024; // Grade A
const JS_BUDGET_A_PLUS = 80 * 1024; // Grade A+

interface Violation {
	gate: string;
	file: string;
	line?: number;
	detail: string;
}

const violations: Violation[] = [];
const warnings: string[] = [];

function walk(dir: string, out: string[] = []): string[] {
	if (!existsSync(dir)) return out;
	for (const entry of readdirSync(dir)) {
		if (SKIP_DIRS.has(entry)) continue;
		const full = join(dir, entry);
		const st = statSync(full);
		if (st.isDirectory()) walk(full, out);
		else out.push(full);
	}
	return out;
}

const allFiles = [
	...walk(join(ROOT, 'factory')),
	...walk(join(ROOT, 'src')),
	...walk(join(ROOT, 'cliente')),
	...walk(join(ROOT, 'utils'))
];
const svelteFiles = allFiles.filter((f) => f.endsWith('.svelte'));
const factoryComponents = svelteFiles.filter((f) =>
	relative(ROOT, f).startsWith(join('factory', 'src', 'lib', 'components'))
);

// ─────────────────────────────────────────────────────────────
// GATE 1 — Svelte 4 legacy syntax (runes-only)
// ─────────────────────────────────────────────────────────────
const SVELTE4_PATTERNS: Array<[RegExp, string]> = [
	[/^\s*export let\s/, 'export let → usar $props()'],
	[/createEventDispatcher/, 'createEventDispatcher → usar callback props / $bindable()'],
	[/<slot[\s/>]/, '<slot> → usar {#snippet} + {@render}'],
	[/^\s*\$:\s/, '$: reactivo → usar $derived() / $effect()'],
	[/\son:[a-z]+\s*=\s*\{/, 'on:event={} → usar onevent={}']
];

for (const file of svelteFiles) {
	const lines = readFileSync(file, 'utf-8').split('\n');
	lines.forEach((lineText, i) => {
		for (const [pattern, fix] of SVELTE4_PATTERNS) {
			if (pattern.test(lineText)) {
				violations.push({ gate: 'SVELTE4', file: relative(ROOT, file), line: i + 1, detail: fix });
			}
		}
	});
}

// ─────────────────────────────────────────────────────────────
// GATE 2 — Hex hardcodeado en factory (token-first, patrón A1)
// Permitido: hex como *fallback* dentro de var(--x, #hex).
// ─────────────────────────────────────────────────────────────
for (const file of factoryComponents) {
	const raw = readFileSync(file, 'utf-8');
	const lines = raw.split('\n');
	lines.forEach((lineText, i) => {
		const cleaned = lineText
			.replace(/\/\*.*?\*\//g, '') // comentarios CSS
			.replace(/var\(--[^)]*\)/g, ''); // fallbacks legales dentro de var()
		const match = cleaned.match(/#[0-9a-fA-F]{3,8}\b/);
		if (match) {
			violations.push({
				gate: 'BARE-HEX',
				file: relative(ROOT, file),
				line: i + 1,
				detail: `${match[0]} → mover a utils/tokens.css y consumir via var(--token, ${match[0]})`
			});
		}
	});
}

// ─────────────────────────────────────────────────────────────
// GATE 3 — Imports ilegales en factory (3-domain architecture)
// factory/ debe ser agnóstico: sin cliente/, sin $app/, sin $root/utils
// ─────────────────────────────────────────────────────────────
// Solo el código de la librería (factory/src) — los scripts de mantenimiento quedan fuera.
const factoryFiles = allFiles.filter(
	(f) => relative(ROOT, f).startsWith(join('factory', 'src')) && /\.(svelte|ts)$/.test(f)
);
const ILLEGAL_IMPORT = /from\s+['"]([^'"]*(?:\$cliente|\/cliente\/|clients\/|\$app\/|\$root\/utils)[^'"]*)['"]/;

for (const file of factoryFiles) {
	const rel = relative(ROOT, file);
	const lines = readFileSync(file, 'utf-8').split('\n');
	lines.forEach((lineText, i) => {
		const m = lineText.match(ILLEGAL_IMPORT);
		if (m) {
			const allowed = IMPORT_DEBT_WHITELIST[rel] ?? [];
			if (allowed.some((a) => m[1].includes(a))) {
				warnings.push(`⚠️  Deuda documentada: ${rel}:${i + 1} importa '${m[1]}' (ver playbook §4-E)`);
			} else {
				violations.push({
					gate: 'ILLEGAL-IMPORT',
					file: rel,
					line: i + 1,
					detail: `'${m[1]}' — factory debe ser agnóstico (extraer a prop/snippet o documentar deuda)`
				});
			}
		}
	});
}

// ─────────────────────────────────────────────────────────────
// GATE 4 — Tailwind (PROHIBIDO)
// ─────────────────────────────────────────────────────────────
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
const allDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies });
for (const dep of allDeps) {
	if (dep.includes('tailwind')) {
		violations.push({ gate: 'TAILWIND', file: 'package.json', detail: `dependencia '${dep}'` });
	}
}
for (const cfg of ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs']) {
	if (existsSync(join(ROOT, cfg))) {
		violations.push({ gate: 'TAILWIND', file: cfg, detail: 'archivo de configuración presente' });
	}
}
for (const file of allFiles.filter((f) => /\.(css|svelte)$/.test(f))) {
	if (readFileSync(file, 'utf-8').includes('@tailwind')) {
		violations.push({ gate: 'TAILWIND', file: relative(ROOT, file), detail: 'directiva @tailwind' });
	}
}

// ─────────────────────────────────────────────────────────────
// GATE 5 — Presupuesto de bundle (GREEN_CODING) — solo si hay build/
// ─────────────────────────────────────────────────────────────
const buildDir = join(ROOT, 'build');
if (existsSync(buildDir)) {
	const brFiles = walk(buildDir).filter((f) => f.endsWith('.js.br'));
	if (brFiles.length > 0) {
		const totalBytes = brFiles.reduce((sum, f) => sum + statSync(f).size, 0);
		const kb = (totalBytes / 1024).toFixed(1);
		if (totalBytes > JS_BUDGET_A) {
			violations.push({
				gate: 'JS-BUDGET',
				file: 'build/',
				detail: `${kb}KB br > presupuesto Grade A (150KB)`
			});
		} else if (totalBytes > JS_BUDGET_A_PLUS) {
			warnings.push(`⚠️  JS bundle: ${kb}KB br — Grade A (A+ requiere ≤80KB)`);
		} else {
			console.log(`🌱 JS bundle: ${kb}KB br — Grade A+`);
		}
	}
} else {
	warnings.push('ℹ️  Sin build/ — gate de presupuesto omitido (correr tras bun run build)');
}

// ─────────────────────────────────────────────────────────────
// GATE 6 — SVGs de Figma con aspect-ratio potencialmente roto en Chromium
// Warning-only: preserveAspectRatio="none" + width/height="100%" en el mismo
// archivo distorsiona el SVG cuando se usa como <img> con una sola dimensión
// fija (ver TESTING.md §9 y ERROR_PATTERNS.md).
// ─────────────────────────────────────────────────────────────
const svgFiles = [...walk(join(ROOT, 'cliente')), ...walk(join(ROOT, 'factory'))].filter((f) =>
	f.endsWith('.svg')
);
for (const file of svgFiles) {
	const raw = readFileSync(file, 'utf-8');
	if (/preserveAspectRatio\s*=\s*["']none["']/.test(raw) && /(width|height)\s*=\s*["']100%["']/.test(raw)) {
		warnings.push(
			`⚠️  SVG con preserveAspectRatio="none" + 100%: ${relative(ROOT, file)} — puede distorsionarse en Chromium si se usa con una sola dimensión fija (revisar antes de usar en <img>)`
		);
	}
}

// ─────────────────────────────────────────────────────────────
// Reporte
// ─────────────────────────────────────────────────────────────
console.log('🛡️  Fábrica17 — Architecture Check (Rieles de Acero)\n');
for (const w of warnings) console.log(w);

if (violations.length > 0) {
	console.error(`\n🚨 ${violations.length} violación(es) de arquitectura:\n`);
	for (const v of violations) {
		console.error(`  ❌ [${v.gate}] ${v.file}${v.line ? `:${v.line}` : ''} — ${v.detail}`);
	}
	console.error('\n💡 Las reglas viven en governance/. Si la regla está mal, corrige el gate en el mismo cambio.');
	process.exit(1);
}

console.log(`\n🌟 PASSED — ${svelteFiles.length} componentes auditados, 6 gates, 0 violaciones.`);
process.exit(0);
