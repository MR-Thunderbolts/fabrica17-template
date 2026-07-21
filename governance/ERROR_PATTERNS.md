# ERROR PATTERNS & SOLUTIONS (FAILSAFES)

Este archivo es el registro de lecciones aprendidas convertidas en patrones de fallo genéricos. Los patrones aquí documentados aplican a **cualquier proyecto** web y deben consultarse antes de crear o modificar componentes, sistemas de diseño o pipelines de compilación.

---

## 1. THE "PATH DEPTH DRIFT" ERROR
**Categoría**: Arquitectura / Bundler  
**Síntoma**: `Failed to load url ... Does the file exist?` o módulos que funcionan en dev pero fallan al compilar para producción.  
**Causa raíz**: El uso de rutas relativas (como `../../`) es frágil. Al mover componentes de carpeta, mover páginas de ruta o reorganizar directorios, la profundidad de saltos cambia y las referencias se rompen silenciosamente o con errores difíciles de trazar.  
**Failsafe Universal**:
- Definir **siempre** un alias de ruta raíz en el bundler (`$root`, `@`, `~`, etc.) y usarlo uniformemente en todos los imports de componentes compartidos.
- Nunca usar más de un nivel de ruta relativa (`../`) para importar recursos de capas superiores. Si hay más de un `../`, es señal de que falta un alias.

---

## 2. THE "FRAMEWORK VERSION BLEED" ERROR
**Categoría**: Compatibilidad / Versioning  
**Síntoma**: Advertencias de deprecación, errores de runtime en el estado o comportamientos de reactividad que difieren entre componentes.  
**Causa raíz**: Mezclar sintaxis o patrones de dos versiones distintas del framework (ej. Svelte 4 `$: ` reactivity vs Svelte 5 Runes `$state`, `$derived`). Al no forzar un modo de escritura único, el compilador puede aceptar ambos pero el runtime puede comportarse de forma inconsistente.  
**Failsafe Universal**:
- Definir explícitamente la versión semántica del framework en `package.json` con un rango exacto o mínimo fijo.
- Configurar el compilador/linter para **forzar** el modo de escritura elegido (`strict: true`, `runes: true`, etc.).
- Al hacer una actualización major, auditar el 100% de los componentes antes de considerar la migración como completa.

---

## 3. THE "GHOST TOKEN" ERROR
**Categoría**: Design System / Tokens  
**Síntoma**: Componentes con colores o tamaños que se ven "off" o que caen al valor por defecto del navegador en lugar del valor de la marca.  
**Causa raíz**: Un token de diseño fue definido en la fuente de verdad (Figma, JSON, archivo de variables) pero nunca fue mapeado o exportado correctamente al archivo CSS consumido por el proyecto.  
**Failsafe Universal**:
- Mantener un único archivo de tokens fuente-de-verdad que sea el origen de toda variable CSS. Si un color, tamaño o radio no existe en ese archivo, no existe en el proyecto.
- Ejecutar el script de sincronización de tokens como parte del pipeline de CI/CD antes de cualquier build de producción.
- No declarar valores de color o espaciado literales (hex, px) directamente en los archivos de componentes. **Todo debe ser un token**.

---

## 4. THE "HORIZONTAL BLEED" ERROR
**Categoría**: Layout / CSS  
**Síntoma**: Aparece un scrollbar horizontal inesperado en la página. Elementos de ancho fijo sobresalen del viewport.  
**Causa raíz**: Uso de `100vw` (que incluye el ancho del scrollbar), posicionamiento `absolute` sin un ancestro con `position: relative` y `overflow: hidden`, o contenidos más anchos que el viewport sin truncar.  
**Failsafe Universal**:
- Para elementos de ancho total de pantalla, usar `width: 100%` en lugar de `100vw`.
- Todo contenedor de scroll horizontal (carruseles, sliders) debe declarar `overflow-x: hidden` en el elemento padre.
- Añadir como primer paso de QA visual una revisión en mobile con las devtools en modo responsive para detectar bleed a cualquier ancho.

---

## 5. THE "COMPONENT SLOT IMBALANCE" ERROR
**Categoría**: Framework / Componentes  
**Síntoma**: Error de compilación: `Attempted to close an element that was not open` o contenido que no renderiza dentro de un componente.  
**Causa raíz**: Bloques de contenido incrustado en componentes (snippets, slots, portals, children) que no están correctamente abiertos y cerrados en el archivo que los usa.  
**Failsafe Universal**:
- Antes de abrir un nuevo bloque de contenido (`{#snippet}`, `<template>`, `v-slot`, etc.) dentro del mismo componente padre, verificar que el anterior esté correctamente cerrado.
- Los editores con soporte de bracket matching son obligatorios para trabajo con templates complejos.

---

## 6. THE "SVG DESCENDANT SELECTOR POLLUTION" ERROR
**Categoría**: CSS / Iconografía  
**Síntoma**: Iconos SVG se muestran distorsionados, cortados, o completamente rotos dentro de badges, botones o contenedores circulares.  
**Causa raíz**: Aplicar propiedades CSS posicionales (`position`, `width`, `height`) con un selector descendente genérico (`* {}` o `:global(*)`) que también afecta involuntariamente a los elementos internos del SVG (`<path>`, `<rect>`, `<circle>`), destruyendo sus coordenadas internas.  
**Failsafe Universal**:
- Para estilizar el SVG raíz dentro de un componente, usar **siempre el selector de hijo directo** (`> :global(svg)` o `> svg`).
- Nunca aplicar `position: absolute`, `width` o `height` a un selector universal (`*`) dentro de un contenedor que pueda contener SVGs.

---

## 7. THE "DEV/PROD BUNDLER SPLIT" ERROR
**Categoría**: Bundler / Build Pipeline  
**Síntoma**: El servidor de desarrollo funciona sin errores, pero `bun run build` o `npm run build` falla o genera un artefacto roto.  
**Causa raíz**: Los bundlers modernos (Vite, Rollup, Webpack) aplican optimizaciones, tree-shaking y resolución estática de módulos solo en build de producción. Imports dinámicos, alias no configurados en modo prod, o plugins que solo validan en tiempo de ejecución pasan inadvertidos en dev.  
**Failsafe Universal**:
- El pipeline de aprobación de cualquier PR o feature debe incluir un build estático de producción exitoso (`bun run build` / `npm run build`) como condición de merge.
- Ejecutar builds de producción localmente como parte del flujo de trabajo habitual, no solo en CI.
- Ante cualquier cambio en imports, dependencias o configuración del bundler, buildear siempre antes de dar el trabajo como terminado.

---

## 8. THE "DYNAMIC IMPORT PHANTOM" ERROR
**Categoría**: Bundler / Assets Dinámicos  
**Síntoma**: Un import de asset (icono, fuente, imagen) es aceptado por el compilador de TypeScript o Svelte, pero el build de Vite falla con `Asset not found` o `Icon [key] not found`.  
**Causa raíz**: Las declaraciones de tipo para imports dinámicos (como `~icons/*`) son permisivas e inferenciales. TypeScript acepta la clave simbólicamente, pero en producción el bundler debe resolver el archivo físico en disco. Si la clave no existe en la librería instalada localmente, el build falla.  
**Failsafe Universal**:
- Ante cualquier import dinámico basado en claves de cadena (iconos, assets, locales), verificar **la existencia física** de la clave en el directorio de la dependencia antes de hacer commit.
- Para librerías de iconos, buscar la clave en el archivo `icons.json` o equivalente del paquete instalado (`node_modules/`).
- Nunca asumir que una clave existe porque "funciona en otro proyecto" — las versiones de librerías pueden diferir entre proyectos.

---

## 9. THE "GPU PROMOTION JITTER" ERROR
**Categoría**: Performance / Animaciones CSS  
**Síntoma**: Texto o iconos dentro de elementos animados vibran, se ven borrosos, o se desplazan 1px durante una transición `transform` (hover, scroll, etc.).  
**Causa raíz**: Al transicionar `transform` sin un estado inicial declarado, el navegador promueve el elemento a una capa de GPU solo cuando la animación comienza. Este cambio de contexto de renderizado altera el antialiasing de subpíxel del texto y los paths vectoriales de los hijos, causando un micro-glitch visual perceptible.  
**Failsafe Universal**:
- Declarar siempre el estado inicial de transform explícitamente en el elemento antes de la transición: `transform: translateY(0) translateZ(0)`.
- Para elementos con `will-change: transform`, promover también los hijos relevantes con `transform: translate3d(0,0,0)` para estabilizar su renderizado antes de que comience la animación.

---

## 10. THE "COMPONENT STYLE ISLAND" ERROR
**Categoría**: Design System / Consistencia Visual  
**Síntoma**: Componentes que visualmente "no encajan" con el resto de la UI — bordes con un radio diferente, padding distinto, fuente o peso que difiere del sistema establecido.  
**Causa raíz**: Al construir un componente nuevo o implementar una sección ad-hoc, se declaran valores de estilo literales localmente (ej. `border-radius: 12px`, `padding: 8px 16px`) en lugar de reutilizar los tokens del sistema de diseño y el lenguaje de componentes establecido.  
**Failsafe Universal**:
- Antes de escribir cualquier estilo en un componente nuevo, revisar la biblioteca de componentes y los tokens existentes. Si existe un patrón (`btn-primary`, `badge-pill`, etc.), usarlo directamente.
- Al completar un componente nuevo, hacer un **visual audit** comparando el elemento en el navegador con los demás componentes equivalentes ya implementados en la misma página.
- Los valores de forma (radius), color, tipografía y espaciado **nunca deben ser literales** en los archivos de componentes — siempre deben referenciar un token del sistema de diseño (`var(--radius-full)`, `var(--color-primary)`, etc.).
- Los estados interactivos comunes (`:disabled`, `:hover`, `:active`) para elementos estandarizados (botones, inputs) deben heredarse de las clases globales (`.btn`, `.input-field`) y **no redeclararse aislados** en cada componente (evita drift tipo `rgba(...,0.12)` vs `0.14` entre componentes hermanos).

---

## 11. THE "MODAL BYPASS / ROUTE DRIFT" ERROR
**Categoría**: Arquitectura de Conversión / Ruteo  
**Síntoma**: Un CTA que debería abrir un modal (captura de leads, formulario) redirige a una ruta estática inexistente o lanza un 404, rompiendo el flujo.  
**Causa raíz**: Cambiar el anclaje declarativo (`href="#auditoria"`) por una ruta URL dura (`href="/reporte"`), o dejar enlaces apuntando a rutas físicas transitorias que luego se dan de baja en el refinamiento.  
**Failsafe Universal**:
- Los elementos que disparan modales deben usar identificadores de anclaje (`href="#slug"`) y confiar en el manejador declarativo de clics (`e.preventDefault()`), no rutas físicas.
- Al dar de baja una ruta física, realizar siempre un `grep` global de su URL en todo el proyecto para eliminar enlaces huérfanos antes de cerrar el cambio.

---

## 12. THE "MOBILE INDICATOR OVERLAP" ERROR
**Categoría**: Layout / CSS / Mobile  
**Síntoma**: Indicadores de carrusel (dots) u otros elementos flotantes fijos/absolutos se enciman o tocan los bordes de las tarjetas en resoluciones móviles pequeñas.  
**Causa raíz**: Sobreescribir el ancho de una tarjeta con valores absolutos o `100%` en media queries específicas (`@media (max-width: 480px)`), eludiendo un `width: calc(100% - 24px)` previo que reservaba espacio para los indicadores laterales.  
**Failsafe Universal**:
- Respetar el espacio de elementos flotantes/absolutos laterales en **todas** las resoluciones móviles.
- Si un componente móvil usa indicadores o controles laterales, declarar su ancho de forma relativa (`calc(100% - margin_seguro)`).
- Evitar `width: 100%` en elementos que conviven con controles en la misma fila horizontal salvo que estén en capas separadas.

---

## 13. THE "MEDIA QUERY LISTENER TYPEERROR" ERROR
**Categoría**: Compatibilidad / JavaScript / Mobile  
**Síntoma**: La app crashea en móvil (error 500 de SvelteKit / fallo de hidratación) mientras en desktop funciona perfecto. Frecuente al abrir el sitio desde webviews empotrados (WhatsApp, Instagram) o iOS/Safari antiguos.  
**Causa raíz**: Usar `mq.addEventListener('change', cb)` sobre un `MediaQueryList` de `window.matchMedia`. En motores móviles antiguos o webviews, ese objeto no hereda de `EventTarget` y carece de `.addEventListener`, lanzando un `TypeError` fatal que detiene la hidratación de Svelte.  
**Failsafe Universal**:
- Al añadir/remover listeners a un `MediaQueryList`, usar siempre comprobación de soporte con fallback a `addListener`/`removeListener`:
  ```javascript
  const mq = window.matchMedia('(max-width: 768px)');
  if (mq.addEventListener) mq.addEventListener('change', callback);
  else if (mq.addListener) mq.addListener(callback); // legacy webviews

  // cleanup
  if (mq.removeEventListener) mq.removeEventListener('change', callback);
  else if (mq.removeListener) mq.removeListener(callback);
  ```

---

## 14. THE "FIGMA SVG EXPORT DISTORTION" ERROR
**Categoría**: Assets / Cross-Browser / Iconografía
**Síntoma**: Un logo o ícono SVG exportado de Figma se ve estirado o aplastado (aspect-ratio roto) en Chrome/Brave, pero se ve bien en Safari/Firefox — o viceversa.
**Causa raíz**: Figma exporta SVGs con `preserveAspectRatio="none"` combinado con `width="100%" height="100%"`. Cuando ese SVG se usa como `<img>` con una sola dimensión CSS fija (ej. `h-7 w-auto` / `height: 28px; width: auto;`), los motores Chromium ignoran el `viewBox` para calcular la dimensión libre y el SVG se distorsiona; Safari/Firefox lo resuelven bien. Ni `bun run check` ni `bun run build` lo detectan — es un bug puramente visual y cross-browser.
**Failsafe Universal**:
- Gate automatizado: `architecture-check.ts` (Gate 6) advierte sobre cualquier `.svg` en `cliente/` o `factory/` con `preserveAspectRatio="none"` + `100%`/`100%`. Revisar la advertencia antes de usar el asset con una sola dimensión fija.
- Chequeo manual rápido: `grep -rl 'preserveAspectRatio="none"' cliente/assets/`.
- Al incorporar un logo/ícono nuevo de Figma, abrirlo y comparar visualmente en al menos dos motores (Chromium + WebKit) antes de darlo por terminado — no alcanza con verlo en un solo navegador.
- Este es un caso particular de una familia más amplia de bugs: los SVG exportados de Figma pueden traer metadata (aspect-ratio, contenido incorrecto por error de export) que rompe el uso fuera de Figma sin que ningún build lo detecte. Ver también el "GHOST TOKEN" (#3) para la misma lógica aplicada a tokens en vez de assets.

---

## 15. THE "SILENT DRIFT" ERROR
**Categoría**: Design System / Arquitectura Multi-Agente
**Síntoma**: Un componente de `factory/` existe y en teoría cubre un caso, pero el ensamblaje real de un cliente lo ignora y resuelve el caso con HTML/CSS inline o un override local — sin que quede registro de por qué.
**Causa raíz**: La abstracción (`factory/`) y la implementación real se desincronizan con el tiempo porque nada obliga a registrar cuándo un agente decide no usar (o extender con un override) un componente compartido. Con el tiempo, la fábrica queda como "capa de papel" que nadie mantiene al día con lo que realmente corre en producción.
**Failsafe Universal**:
- Toda vez que esto ocurra, registrar la entrada en `DRIFT_LOG.md` el mismo día (ver formato ahí). Ver también la regla "Variante-antes-que-Override" en `AGENTS.md`.
- 2ª ocurrencia sobre el mismo componente/patrón → deja de ser aceptable como override; se propone la variante de factory que lo resuelve (Tier 2 — diff + CONFIRM humano).
- QA debe revisar `DRIFT_LOG.md` como parte del cierre de sprint, no solo `bun run check`.
