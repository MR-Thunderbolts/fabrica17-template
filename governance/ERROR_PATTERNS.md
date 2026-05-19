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
