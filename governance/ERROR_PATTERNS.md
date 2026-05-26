# ERROR PATTERNS & SOLUTIONS (FAILSAFES)

Este archivo es el registro histórico de fallos en la Fábrica Base. Debe ser consultado antes de realizar cualquier cambio estructural.

## 1. THE "ROOT ESCAPE" ERROR (Path Resolution)
- **Síntoma**: `Failed to load url ... Does the file exist?`
- **Causa**: Error en la profundidad de rutas relativas (`../../` vs `../../../`) al mover componentes entre carpetas de SvelteKit.
- **Solución (Failsafe)**: NO usar rutas relativas para componentes de la base. Usar el alias `$root`.
- **Ejemplo**: `import Navbar from '$root/components/Navbar.svelte';`

### 🔴 ERROR: Desbordamiento Horizontal (Horizontal Bleed)
**Síntoma**: Aparece un scrollbar horizontal en el `body` y la Navbar pierde su centrado.
**Causa**: Uso de `padding` o `width` basados en `100vw` dentro de contenedores que no tienen `overflow-x: hidden`. Especialmente peligroso en carruseles que intentan alinear contenido con el centro.
**Solución**: 
- El contenedor padre del carrusel DEBE tener `overflow-x: hidden`.
- El `carousel-track` debe usar `padding-inline-start` para el alineado, pero dejar el final libre o con un padding pequeño.

### 🔴 ERROR: Doble Contención en Carruseles
**Síntoma**: El título se corta o no se alinea con las tarjetas.
**Causa**: Envolver un carrusel que ya tiene lógica de centrado dentro de un `SectionMaster` que también tiene `max-width`.
**Solución**: Usar `fullWidth={true}` en el `SectionMaster` cuando se use el carrusel de Apple.

## 2. THE "NATIVE SCRIPT" ERROR (Svelte 5 Syntax)
- **Síntoma**: `Unexpected token` en el compilador.
- **Causa**: Borrar accidentalmente la etiqueta `<script lang="ts">` al realizar ediciones rápidas con herramientas de reemplazo de texto.
- **Solución (Failsafe)**: Las herramientas de edición deben validar siempre la apertura y cierre de etiquetas de script. Si se detecta un bloque de lógica sin etiqueta, es un error crítico.

## 3. THE "GHOST TOKEN" ERROR (Figma Sync)
- **Síntoma**: Componentes con colores que se sienten "off" o grises por defecto.
- **Causa**: El script de sincronización no tiene mapeado el token de Figma a una variable CSS.
- **Solución (Failsafe)**: Ejecutar `bun run tokens:sync` y verificar que el `client-brand.css` contenga la variable esperada.

## 4. THE "HIDDEN SVELTE 4" ERROR
- **Síntoma**: Advertencias de deprecación o fallos en el estado.
- **Solución**: Runes forzados en config.

- **Solución (Failsafe)**: Asegurar paridad entre `vite.config.ts` y `tsconfig.json`, o preferir rutas relativas controladas si el alias falla en SSR.

## 6. THE "SNIPPET BALANCE" ERROR
- **Síntoma**: `</Component> attempted to close an element that was not open`.
- **Causa**: Olvido de cierre de bloque `{#snippet}` dentro de un componente que acepta múltiples fragmentos.
- **Solución (Failsafe)**: Antes de declarar un nuevo `{#snippet}` dentro del mismo componente padre, verificar que el anterior esté cerrado con `{/snippet}`.

## 7. THE "SUB-PIXEL HOVER JITTER" ERROR (UI/Transitions)
- **Síntoma**: Iconos o texto dentro de un botón (`.btn-primary`, `.nav-cta`) o tarjeta (`.seg-card`, `.pain-card`) vibran, tiemblan o se desplazan 1px relative al fondo durante una animación de transición en hover (como `translateY(-2px)`).
- **Causa**: Al transicionar la propiedad `transform` sin un estado inicial declarado, el navegador promueve dinámicamente el elemento a una capa compositada de GPU. Esto cambia el antialiasing de subpíxel a escala de grises para el texto y las formas vectoriales del SVG de forma independiente, provocando micro-desplazamientos y un glitch visual.
- **Solución (Failsafe)**:
  1. Declarar el estado inicial explícitamente: `transform: translateY(0) translateZ(0);` y `transform-style: preserve-3d;` en el elemento animado.
  2. Promover los elementos hijos directamente a la GPU: `transform: translate3d(0, 0, 0); will-change: transform; backface-visibility: hidden;` en `> :global(*)` para estabilizarlos de forma pre-acelerada.

## 8. THE "SVG PATH CLIPPING" ERROR (CSS/Icon Selectors)
- **Síntoma**: Los iconos vectoriales (como SVGs de MynaUI o Phosphor) dentro de un badge o círculo se reducen a líneas diminutas rotas o se cortan en la esquina superior izquierda.
- **Causa**: El uso del selector descendente global `.tag-badge :global(*)` para posicionar absolutamente y dar un tamaño de `16x16` al SVG acaba aplicando estas propiedades de forma no intencionada también a todas las etiquetas internas del SVG (`<path>`, `<rect>`, `<circle>`), destruyendo sus sistemas de coordenadas internas.
- **Solución (Failsafe)**: Usar siempre el selector de hijo directo `>` para delimitar las propiedades de alineación absoluta únicamente a la raíz del icono: `.tag-badge > :global(*)`.

## 9. THE "VITE HMR 500 DESYNC" ERROR (Dev Server/Caching)
- **Síntoma**: El servidor de desarrollo lanza una pantalla roja de `500 Internal Server Error` o un error inesperado al importar iconos o modificar masivamente archivos en caliente.
- **Causa**: Al realizar cambios simultáneos de imports de dependencias dinámicas (como en una migración de librerías) en más de una decena de archivos, el HMR (Hot Module Replacement) de Vite se desincroniza al re-calcular el árbol en caliente.
- **Solución (Failsafe)**: Reiniciar el servidor de desarrollo local (`bun run dev`) o refrescar la página en el navegador para borrar la caché de Vite y forzar una resolución limpia de dependencias. Ejecutar `bun run check` y `bun run build` estáticamente para garantizar la sanidad del código.
