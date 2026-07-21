# TESTING.md — Validation Protocols

> **Status:** Active

## Validation & Performance Checks

### 🛑 REGLA DE AUTOEVALUACIÓN OBLIGATORIA (FEEDBACK LOOP)
Ningún Agente de IA puede dar una tarea de código por terminada sin antes ejecutar una prueba de humo.

**Condición de salida:** Si `bun run check` devuelve ERRORES (exit code > 0), el Agente NO DEBE avisar al usuario. Debe leer el error, corregir el archivo `.svelte` y volver a ejecutar el comando hasta que pase limpiamente.

Before marking any task as complete, AI Agents must run the following validation commands:

### 1. Type Checking & Svelte Sync
```bash
bun run check
```
*Requirement:* Must return 0 errors.

### 2. Library Build (Packaging)
```bash
bun run build:lib
```
*Requirement:* Must successfully generate `/dist` via `@sveltejs/package`.

### 3. Demo App SSG Build
```bash
bun run build
```
*Requirement:* Must compile the static site output. Bundle sizes < 50KB.

### 4. Code Quality Gates (Grep)
Ensure no legacy code exists:
```bash
grep -r "\$:" src/
grep -r "<slot" src/
grep -r "on:" src/
```

---

## 5. QA Visual Real — más allá de "el build pasa"

`bun run check` verifica tipos y arquitectura, no que el resultado se vea como se
pidió. Antes de dar por cerrado un cambio con superficie visual:

1. **Comparación multi-breakpoint contra la referencia real** (Figma, o la referencia
   que el humano dio) en al menos 3 anchos: mobile (375px), tablet (768px), desktop
   (1280px+). Usar capturas reales del navegador, no solo inspeccionar el código.
2. **Verificar con render limpio antes de aceptar "esto sigue estando mal".** Cuando
   el humano insiste en que un fix no se ve, re-verificar con un render headless
   apuntando directo al dev server, sin caché de navegador, ANTES de tocar el código
   de nuevo. La mayoría de las veces el código ya está bien y el problema es caché o
   una pestaña vieja del usuario — pero no siempre. No asumir ninguno de los dos casos
   sin medir primero.
3. **Distinguir bug real de falso positivo, explícitamente.** Un síntoma visual raro
   (ej. un elemento duplicado que aparece solo una vez) puede ser un artefacto de HMR
   de la sesión de desarrollo, no un bug del código. Investigar antes de "arreglar" —
   y si resulta ser falso positivo, documentarlo como tal en vez de aplicar un fix
   que no corresponde a nada real.

## 6. QA de Comportamiento — verificar con datos, no con la vista

Un screenshot estático no distingue una transición suave de una brusca, ni detecta si
un estado (`activeSection`, un toggle, un contador) se actualiza correctamente a lo
largo del tiempo o solo en el instante en que se tomó la captura. Para cualquier
componente con animación, scroll-tracking, o estado derivado de interacción:

- **Muestrear valores en frames sucesivos**, no solo el estado final: `window.scrollY`
  cada ~70ms durante una animación de scroll (confirma la curva de easing real, no
  solo "se ve bien"), o `getComputedStyle(el).opacity` en frames sucesivos (confirma
  que una transición es gradual y no un salto abrupto).
- **Probar el comportamiento, no solo el layout**: si un componente deriva estado de
  la posición de scroll o del viewport (ej. qué link de nav está "activo"), verificar
  que ese estado se actualiza al hacer scroll real, no solo al hacer click — un bug
  típico es que el estado solo se actualiza por click y queda "pegado" al último
  elemento clickeado aunque la vista real ya cambió.
- Los screenshots se reservan para lo puramente visual (layout, spacing, color); el
  comportamiento a lo largo del tiempo se prueba con datos muestreados.

## 7. Jerarquía de Fuentes de Verdad

Cuando el brief escrito, el feedback verbal del humano, y los valores reales
extraídos de Figma (`get_variable_defs` / `get_design_context`) se contradicen entre
sí, **ninguna fuente gana por default**. Preguntar explícitamente cuál manda para ese
tipo de decisión, y acotar la respuesta al alcance real (ej. "Figma manda en
color/tipografía, el feedback verbal manda en tamaños y estructura puntual" — una
jerarquía específica de un proyecto, no una regla universal heredable sin preguntar
de nuevo). Ver `BRIEF_PROTOCOL.md` §5 para el detalle y el caso real que originó esta
regla.

## 8. Protocolo de Borrado Seguro de Assets

Antes de borrar un asset (SVG, imagen, componente no usado):

1. **Contar referencias reales**: `grep` del nombre de archivo en todo `src/`,
   `cliente/`, y `factory/` — no asumir "0 usos" sin buscar variables/paths dinámicos
   que puedan construir el nombre en runtime.
2. Si el grep da 0 matches, verificar con un grep dirigido adicional (por ejemplo,
   sin la extensión, o por el nombre base sin sufijo) antes de confirmar el borrado.
3. **Después de borrar**: `bun run build` + smoke test en navegador auditando
   requests 4xx/5xx además de errores de consola — no alcanza con que compile.

## 9. Gate de Assets SVG Exportados de Figma

Los SVG exportados de Figma son una fuente recurrente de bugs silenciosos que ni
`bun run check` ni `bun run build` detectan: contenido incorrecto (ej. un asset
duplicado por error de export) y distorsión de aspect-ratio en motores Chromium
cuando el SVG trae `preserveAspectRatio="none"` combinado con `width`/`height="100%"`
y se usa como `<img>` con una sola dimensión fija — Safari/Firefox lo resuelven bien
vía `viewBox`, Chromium no.

**Chequeo obligatorio al incorporar un SVG nuevo de Figma:**
```bash
grep -rl 'preserveAspectRatio="none"' cliente/assets/ factory/
```
Si aparece junto a `width="100%" height="100%"` en el mismo archivo, corregir el
`viewBox`/`preserveAspectRatio` antes de usarlo con una sola dimensión fija en CSS.
Este chequeo está automatizado como advertencia en `architecture-check.ts` (Gate 6).
