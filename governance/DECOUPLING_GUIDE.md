# 🚀 Guía de Desacoplamiento (Launch Ready Protocol)

Procedimiento para remover la infraestructura de la **Fábrica Base** de un proyecto de cliente antes del lanzamiento a producción. El resultado es un repo que contiene únicamente el código del sitio del cliente y sus dependencias estrictas — menor superficie, builds más limpios, cero tooling de fábrica en el entregable.

> **No confundir con `clean:template`** — ese script hace lo *opuesto*: convierte un repo de cliente en un template reutilizable (conserva `factory/`, resetea las páginas). El desacople **elimina** `factory/` y deja las páginas del cliente. Corre este protocolo una sola vez, justo antes del lanzamiento.

---

## Paso 0 — Pre-flight: verificar el grafo de dependencias ⚠️ OBLIGATORIO

La fábrica es agnóstica y las páginas del cliente **no deberían** importar de `factory/` ni `utils/` en runtime (la identidad se inyecta vía CSS, no vía imports). Antes de borrar nada, confirma que es cierto en *este* proyecto:

```bash
# ¿src/ o cliente/ importan del core de la fábrica?
grep -rnE "from ['\"](\$factory|\$root|\$root/utils|utils/)" src cliente

# ¿Se consumen tokens de utils/ (tokens.css / app.css de la fábrica)?
# NOTA: el shell del template (src/app.css) importa utils/app.css por diseño.
# Si vas a eliminar utils/, primero inline el baseline en cliente/tokens.css.
grep -rnE "utils/(tokens|app)\.css" src cliente
```

- **Salida vacía en las tres** → el proyecto está limpio, procede al Paso 1.
- **Hay coincidencias** → resuélvelas primero: mueve el archivo consumido a `cliente/`, o inline el token en `cliente/tokens.css`. No borres una carpeta de la que el runtime todavía depende.

---

## Paso 1 — Eliminar carpetas y archivos de la fábrica

```bash
# Core de la fábrica (incluye factory/scripts/ — encapsulado tras la reorg de estructura)
rm -rf factory/

# Baseline de la fábrica — OJO: src/app.css importa utils/app.css (reset +
# tokens grayscale). Antes de borrar utils/, copia utils/tokens.css y el reset
# de utils/app.css a cliente/ (o inline lo que el sitio consuma) y actualiza
# los @import de src/app.css. Solo entonces:
rm -rf utils/

# Skills de agente y memoria/checks de gobernanza (no impactan runtime)
rm -rf governance/skills/
rm -f governance/integrity_check.ts
rm -f governance/FABRICA_STATE_PLAYBOOK.md
rm -f CLIENTE_SETUP.md
```

> El resto de `governance/` (reglas: `RULES_SVELTE5.md`, `GREEN_CODING.md`, etc.) es documentación. Consérvalo si el equipo mantendrá el sitio, o elimina `governance/` completo para un entregable mínimo.

---

## Paso 2 — Limpiar `svelte.config.js`

Elimina del objeto `kit` los aliases que apuntan a la fábrica. Conserva solo los que el sitio del cliente realmente consume (revisa con `grep -rn '\$cliente' src`):

```diff
 		prerender: {
 			entries: ['*'],
 			handleMissingId: 'warn',
 			handleHttpError: 'warn'
-		},
-		alias: {
-			'$root': path.resolve('./'),
-			'$factory': path.resolve('./factory/src/lib'),
-			'$cliente': path.resolve('./cliente')
 		}
 	}
 };
```

Si dejas algún alias, elimina también el `import path from 'path'` solo cuando ya no se use.

---

## Paso 3 — Limpiar `vite.config.ts`

1. Elimina el objeto `resolve.alias` (`$root`) si el runtime no lo usa.

El archivo debe quedar así:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({ compiler: 'svelte', autoInstall: true })
	],
	server: {
		fs: { allow: ['cliente'] }
	},
	build: {
		target: 'esnext',
		minify: true,
		cssMinify: true,
		rollupOptions: {
			output: { manualChunks: undefined },
			treeshake: { moduleSideEffects: false, propertyReadSideEffects: false }
		}
	}
});
```

> Los iconos que el sitio realmente usa (`~icons/mynaui/*`, `~icons/lucide/*`, `~icons/material-symbols/*`) siguen resolviéndose por `autoInstall` — no dependen de `factory/`.

---

## Paso 4 — Limpiar `package.json`

1. **Reescribe el script `check`** — hoy invoca `factory/scripts/…`, que ya no existe:
   ```diff
   -    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json && bun factory/scripts/architecture-check.ts && bun factory/scripts/verify-tokens.ts",
   +    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
   ```
2. **Elimina los scripts de fábrica** (todos apuntan a `factory/scripts/`): `tokens:sync`, `tokens:verify`, `check:architecture`, `clean:template`.
Los scripts que **quedan**: `dev`, `build`, `preview`, `prepare`, `check`, `check:watch`.

---

## Paso 5 — Validación Post-Desacoplamiento ⚠️ OBLIGATORIO

```bash
# 1. Limpiar caché de compilación previa
rm -rf .svelte-kit/ build/

# 2. Validar tipos de TypeScript y Svelte 5 Runes
bun run check

# 3. Compilar el bundle estático de producción
bun run build
```

Si ambos comandos finalizan sin errores, el proyecto está **Launch Ready** y desacoplado de la fábrica.

> **Nota green (opcional pero recomendada):** el desacople es el último checkpoint antes de producción — buen momento para auditar la regla **cero-CDN** de `GREEN_CODING.md`. Si `cliente/tokens.css` importa fuentes vía `fonts.googleapis.com`, self-hostea los `.woff2` (subset) antes del lanzamiento.
