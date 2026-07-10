---
name: figma-seccion
description: Implementa UNA sección/frame de Figma como componente Svelte de cliente en esta Fábrica Base, con el pipeline de fidelidad tokens→metadata→design-context→assets→verificación. Úsalo cuando el usuario pida "implementa esta sección de Figma", pase una URL de figma.com apuntando a un frame/nodo específico, o pida construir/actualizar un componente en `cliente/` a partir de un diseño. NO lo uses para tareas que no involucren Figma, ni para tocar `factory/` (core intocable).
---

# Figma → Sección de Cliente (Fábrica Base)

Runbook autocontenido para llevar **una sección de diseño** desde Figma hasta un componente
`cliente/<Nombre>.svelte` correcto, con la menor cantidad de retrabajo posible. Está pensado
para ejecutarse igual sin importar qué agente o subagente lo invoque: no asume contexto previo
de la conversación, solo un input.

**Input esperado:** una URL de Figma que apunte a un frame/nodo concreto (una sección: Hero,
Footer, Testimonials, etc.), no a la página completa ni al archivo entero. Si el usuario da la
URL del archivo completo sin nodo, pide el link de la sección específica antes de continuar —
implementar "toda la página" de una sola pasada es la causa #1 de baja fidelidad.

## 0. Localizar las herramientas de Figma disponibles

Este proyecto se trabaja con más de un agente (Claude Code y Antigravity, al menos), y cada uno
expone el servidor Figma MCP bajo un prefijo distinto:

- **Claude Code:** `mcp__claude_ai_Figma__*` (`get_design_context`, `get_metadata`,
  `get_screenshot`, `get_variable_defs`, `download_assets`, `add_code_connect_map`,
  `get_code_connect_suggestions`, `use_figma`, etc.). Si no aparecen listadas directamente,
  búscalas por el nombre de la capacidad (p. ej. "figma" o "design context") con la
  herramienta de búsqueda de tools que tengas disponible.
- **Antigravity:** `figma-dev-mode-mcp-server` (vía Figma Desktop, puerto local 3845), con
  tools equivalentes tipo `mcp_FigmaDesktop_get_variable_defs`, `get_metadata`,
  `get_design_context`, `get_screenshot` (ver `governance/TOKEN_WORKFLOW.md` para el mapeo
  que ya usa este repo).

En cualquier caso, identifica en tu lista de herramientas actual cuál corresponde a cada
capacidad de la tabla de abajo antes de seguir — los **pasos y el orden son los mismos**
sin importar el prefijo:

| Capacidad | Se usa en el paso |
|---|---|
| Variables/tokens del archivo | 1 |
| Metadata del nodo/frame | 2 |
| Contexto de diseño de la sección | 3 |
| Screenshot del nodo | 3 |
| Descarga de assets | 4 |
| Code Connect (mapa/sugerencias) | 3 (opcional, si existe) |

Si tu agente tiene una skill/workflow propia para la conexión inicial con Figma (por ejemplo
una guía previa a usar sus tools de generación), síguela primero; si no existe, continúa
directo con el paso 1.

## 1. Tokens antes que nada (una sola vez por proyecto, no por sección)

Antes de tocar cualquier componente, confirma que la capa de tokens del cliente está viva:

1. Corre `get_variable_defs` sobre el archivo/selección activa en Figma.
2. Compara contra `cliente/tokens.css`. Si hay variables de Figma sin equivalente CSS, o el
   diseño usa fills/tamaños hardcodeados en vez de Variables, **detente y repórtalo** — arreglar
   el archivo de Figma (o mapear las variables manualmente) es más barato que parchear cada
   sección después.
3. Si el proyecto usa el pipeline automático: exporta a `figma-tokens.json` y corre
   `bun run tokens:sync` (ver `governance/TOKEN_WORKFLOW.md`). Si no, actualiza
   `cliente/tokens.css` a mano siguiendo la nomenclatura ya existente.

No avances a la sección si este paso no está resuelto: cualquier componente que escribas antes
de tener los tokens correctos habrá que repasarlo entero cuando lleguen.

## 2. Inventario del nodo

1. `get_metadata` sobre el nodo que te dieron (o su frame padre si el nodo es muy granular).
   Es barato en tokens y te da el árbol real de capas — úsalo para decidir si "la sección" es
   en realidad 2-3 sub-secciones que conviene separar en componentes distintos.
2. El **nombre del frame en Figma** es el contrato de nombre del componente: un frame
   `HeroSection` se traduce a `cliente/HeroSection.svelte`. Si el nombre del frame es genérico
   (`Frame 42`), pide que lo renombren antes de continuar, o acláralo con el usuario — no
   inventes un nombre.

## 3. Contexto de diseño + verdad visual (por sección, nunca por página completa)

1. `get_design_context` **sobre el nodo de la sección**, no sobre la página. Esto preserva
   spacing, jerarquía y variantes con fidelidad; pedirlo sobre toda la página diluye el detalle.
2. `get_screenshot` del mismo nodo — esta imagen es la ground truth visual contra la que vas a
   comparar el render final (paso 6). Guárdala mentalmente o en el scratchpad, la necesitas después.
3. Si `get_code_connect_suggestions` o el mapa de Code Connect (`get_code_connect_map`) ya
   vincula este nodo a componentes de `factory/` (Button, Section, Navbar, Card, BadgePill…),
   **úsalos como building blocks** en vez de reescribir el markup desde cero. Si no hay mapeo
   todavía y el patrón se repite en el proyecto, sugiere al usuario correr
   `/figma-code-connect` para crearlo — es la mejora de fidelidad de mayor apalancamiento.

## 4. Assets: se descargan, no se recrean

1. Cualquier logo, icono no vectorial-trivial o ilustración se trae con `download_assets`
   (o el export equivalente), directo a `cliente/assets/` con un nombre estable y descriptivo.
2. Nunca apruebes un SVG "aproximado a mano" cuando el asset real está a un tool-call de
   distancia. Iconos simples de línea sí pueden resolverse con la librería de iconos del
   proyecto (`~icons/mynaui/...` etc.) si el diseño usa ese set — revisa `governance/STYLE.md`.

## 5. Implementación

Reglas no negociables al escribir `cliente/<Nombre>.svelte`:

- **Cero hex hardcodeado.** Todo color/spacing/radio vía `var(--token)` de `cliente/tokens.css`.
  Verificable con: `grep -n "#[0-9a-fA-F]\{3,8\}" cliente/<Nombre>.svelte` (debe salir vacío,
  salvo dentro de un fallback de `var(--token, #fallback)` documentado).
- **Svelte 5 runes-only** (`$state`, `$derived`, `$props`, `{#snippet}`/`{@render}`) — nunca
  sintaxis de Svelte 4. Ver `governance/RULES_SVELTE5.md`.
- **No tocar `factory/`.** Si el diseño exige una variante que el componente factory no soporta,
  para y repórtalo — no improvises un fork ad-hoc dentro de `cliente/`.
- **No dejar placeholders silenciosos.** Si un dato (teléfono, dirección, copy legal) no está
  en el diseño ni te lo dieron, pregúntalo explícitamente; no inventes contenido de relleno.

## 6. Verificación (no opcional)

1. Levanta el sitio (`bun run dev` o la skill `/run` si aplica) y navega hasta la sección.
2. Toma un screenshot del render local y compáralo lado a lado contra el de `get_screenshot`
   (paso 3.2): spacing, tamaños de fuente, alineación, estados hover/focus si el diseño los define.
3. Presta atención especial a estados que **no aparecen en la revisión estática**: overlays de
   carga, transiciones de ruta, hover, error states — ahí es donde se filtran restos del cliente
   anterior o del sistema de diseño base (ver `governance/ASSESSMENT_CLIENTE_GENERICO.md` §2
   para el caso real que motivó esta regla).
4. Corre el pre-flight: `bun governance/integrity_check.ts && bun run check && bun run build`.

## 7. Cierre

Reporta en 3-5 líneas: qué componente se creó/actualizó, qué tokens nuevos se agregaron (si
los hubo), qué assets se descargaron, y cualquier discrepancia de fidelidad que haya quedado
pendiente (con el motivo — ej. "el diseño usa una fuente no self-hosted, se sustituyó por X
pendiente de definición de marca").
