# DRIFT_LOG.md — Registro de Deriva Fábrica ↔ Implementación

> **Por qué existe este documento**: el problema de fondo detectado al comparar la fábrica contra un proyecto de cliente real (ver `FABRICA_STATE_PLAYBOOK.md` §7 y el reporte `WORKFLOW_NOTES.md` de GreenMip v2) no fue "usar agentes o no" — fue que la abstracción (`factory/`) y la implementación real se desincronizaron **sin que nada lo registrara**. En ese caso, el navbar de la fábrica nunca se usó: quedó escrito inline en un `+page.svelte` monolítico, y esa deriva no dejó rastro en ningún lado.
>
> Este archivo existe para que eso deje de pasar en silencio. Es el equivalente, a nivel de fábrica, del `DESIGN_AMBIGUITIES.md` que ese proyecto generó por batch.

---

## Regla obligatoria (todos los agentes Developer/QA)

**Cualquiera de estos tres eventos se registra como entrada nueva, el mismo día que ocurre:**

1. Un ensamblaje de cliente **no usa** un componente de `factory/` que en teoría cubre ese caso (lo reemplaza con HTML/CSS inline, o con un componente de librería externa).
2. Un componente de `factory/` se **extiende con un override local** (estilo ad-hoc en el archivo del cliente) en vez de agregarle una variante al componente compartido.
3. Dos ensamblajes distintos resuelven el **mismo problema de UI de formas distintas** (inconsistencia entre agentes/sesiones).

**Regla de oro (STYLE.md / AGENTS.md):** ante la tentación de un override local, la pregunta correcta es *"¿esto es un caso único, o es una variante que el componente debería soportar?"* — si se repite, es variante, no override.

---

## Formato de entrada

```markdown
### [YYYY-MM-DD] <Componente o área> — <tipo: no-uso / override / inconsistencia>
**Dónde:** `ruta/al/archivo.svelte`
**Qué pasó:** descripción concreta de la deriva.
**Por qué:** qué le faltaba al componente de factory para cubrir el caso (prop, variante, slot).
**Decisión tomada:** override temporal aceptado / variante agregada a factory / pendiente.
**Acción de seguimiento:** si quedó pendiente, qué se necesita para cerrarlo (Tier 2 — requiere confirm humano si toca `factory/`).
```

---

## Umbral de curación

- **1ª ocurrencia sobre un componente:** se registra, override temporal aceptado.
- **2ª ocurrencia sobre el mismo componente/patrón:** deja de ser aceptable dejarlo como override. El agente debe proponer la variante de `factory/` que lo resuelve (Tier 2 — diff + CONFIRM humano) o, si el componente resultó mal diseñado, marcarlo para revisión de `STYLE.md`.
- **Componente de factory con 0 usos reales tras 2+ proyectos de cliente:** candidato a eliminar de `factory/` — está actuando como "capa de papel" (deuda documentada, no deuda oculta).

---

## Log

_Sin entradas todavía. Primera entrada se agrega la próxima vez que un ensamblaje se desvíe de un componente de factory existente._
