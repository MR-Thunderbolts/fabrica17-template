/**
 * @script clean-template.ts
 * @description Script de automatización premium de un solo clic.
 * Convierte un repositorio de cliente en un template de Fábrica17 limpio:
 * elimina los archivos específicos del cliente (allowlist del kit base),
 * resetea la identidad visual a la escala de grises baseline y restaura
 * el entrypoint de demo.
 *
 * No confundir con governance/DECOUPLING_GUIDE.md (el proceso opuesto:
 * quitar la infraestructura de fábrica antes de lanzar un sitio de cliente).
 */

import { writeFileSync, rmSync, existsSync, readdirSync, lstatSync, readFileSync } from 'fs';
import { join } from 'path';

const CLIENTE_DIR = join(process.cwd(), 'cliente');
const ROUTES_DIR = join(process.cwd(), 'src', 'routes');
const PACKAGE_JSON_PATH = join(process.cwd(), 'package.json');

// Kit base del template — todo lo demás en cliente/ se considera
// específico del cliente y se elimina.
const CLIENTE_KEEP = new Set([
	'BadgePill.svelte',
	'Tooltip.svelte',
	'SkeletonCard.svelte',
	'PageLoadingOverlay.svelte',
	'reveal.ts',
	'tokens.css',
	'assets'
]);

// Rutas base del template — subdirectorios de src/routes ajenos a esta
// lista son páginas del cliente y se eliminan.
const ROUTES_KEEP = new Set(['+page.svelte', '+layout.svelte', '+layout.ts', '+error.svelte']);

// Estado template de cliente/tokens.css: sin identidad, baseline grayscale.
const TOKENS_TEMPLATE_CONTENT = `/* ═══════════════════════════════════════════════════════════
   CLIENTE — Identidad Visual (Override Layer)
   ═══════════════════════════════════════════════════════════
   Este es EL archivo de marca del cliente. El baseline de la
   fábrica (utils/tokens.css) es 100% escala de grises; aquí
   sobreescribes SOLO los tokens semánticos que la marca define.

   Reglas:
   - No dupliques primitivas ni redefinas la escala completa:
     sobreescribe únicamente lo que la marca cambia.
   - Fuentes self-hosted (woff2 subset en cliente/assets/fonts/),
     NUNCA vía CDN (governance/GREEN_CODING.md).
   - Sincronización Figma: bun run tokens:sync escribe el bloque
     delimitado más abajo. No edites dentro del bloque.

   Ejemplo de override manual:
   :root {
       --color-primary: #2a8f6e;
       --color-primary-hover: #237a5d;
       --color-primary-foreground: #ffffff;
       --font-headline: 'Space Grotesk', var(--font-body);
   }
   ═══════════════════════════════════════════════════════════ */

/* ── FIGMA SYNC START (autogenerado — no editar este bloque) ── */
/* ── FIGMA SYNC END ── */

/* En estado template este archivo no sobreescribe nada:
   el sistema renderiza en escala de grises por defecto. */
`;

function clean() {
	console.log('🧹 Iniciando limpieza: convirtiendo repo de cliente en template...');

	// 1. Eliminar archivos de cliente (todo lo que no esté en el kit base)
	console.log('📁 Eliminando componentes específicos del cliente...');
	let filesDeletedCount = 0;
	if (existsSync(CLIENTE_DIR)) {
		for (const entry of readdirSync(CLIENTE_DIR)) {
			if (CLIENTE_KEEP.has(entry) || entry.startsWith('.')) continue;
			rmSync(join(CLIENTE_DIR, entry), { recursive: true, force: true });
			filesDeletedCount++;
		}
	}
	console.log(`✅ Se eliminaron ${filesDeletedCount} archivos del cliente.`);

	// 2. Eliminar rutas del cliente (subdirectorios de src/routes)
	if (existsSync(ROUTES_DIR)) {
		for (const entry of readdirSync(ROUTES_DIR)) {
			if (ROUTES_KEEP.has(entry)) continue;
			console.log(`📁 Eliminando ruta de cliente: src/routes/${entry}...`);
			rmSync(join(ROUTES_DIR, entry), { recursive: true, force: true });
		}
	}

	// 3. Resetear cliente/tokens.css al estado template (grayscale baseline)
	console.log('🎨 Reseteando cliente/tokens.css a estado template...');
	writeFileSync(join(CLIENTE_DIR, 'tokens.css'), TOKENS_TEMPLATE_CONTENT, 'utf-8');
	console.log('✅ Identidad del cliente removida — el sistema queda en escala de grises.');

	// 4. Actualizar package.json
	if (existsSync(PACKAGE_JSON_PATH)) {
		console.log('📄 Actualizando package.json del template...');
		const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
		pkg.name = 'fabrica17-template';
		pkg.description =
			'Template base premium para proyectos de la agencia. Incluye sistema de diseño, utilidades globales, componentes interactivos y governance.';
		pkg.version = '1.0.0';
		writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
		console.log('✅ package.json configurado como template.');
	}

	// 5. Vaciar cliente/assets e incluir un placeholder
	const assetsDir = join(CLIENTE_DIR, 'assets');
	if (existsSync(assetsDir)) {
		console.log('📁 Limpiando assets del cliente...');
		for (const file of readdirSync(assetsDir)) {
			const filePath = join(assetsDir, file);
			if (lstatSync(filePath).isFile()) rmSync(filePath);
		}
		writeFileSync(join(assetsDir, '.gitkeep'), '', 'utf-8');
		console.log('✅ Carpeta cliente/assets/ vaciada con éxito.');
	}

	console.log('\n🎉 ¡LIMPIEZA COMPLETADA! 🎉');
	console.log('Tu repositorio ahora es un template limpio y listo para usarse.');
	console.log('⚠️  Revisa src/routes/+page.svelte: si la página de inicio era del cliente,');
	console.log('   restáurala desde el repo base fabrica17 (demo del design system).');
	console.log('💡 Lee CLIENTE_SETUP.md para saber cómo empezar tu próximo proyecto.');
	console.log('🔎 Corre bun run check para validar el estado final.');
}

clean();
