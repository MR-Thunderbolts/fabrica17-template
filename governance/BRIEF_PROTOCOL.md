# BRIEF_PROTOCOL.md — Contrato de Trabajo Verificable

> Extraído de un workflow real de agencia (proyecto de cliente ejecutado sin la fábrica,
> ver `WORKFLOW_NOTES.md` original y el resumen en `FABRICA_STATE_PLAYBOOK.md` §7). La
> diferencia de fondo entre ese proceso y el riesgo que corre la fábrica no fue "usar
> agentes" — fue que **toda desviación del plan quedó escrita y trazable**. Este
> documento formaliza ese patrón como protocolo estándar de la fábrica.

---

## 1. El Brief no es una lista de tareas — es un contrato

Un brief débil dice "mejorar el hero para que se vea como V3". Un brief verificable
dice, por cada punto:

```markdown
### Punto N — <título corto>
**Archivo:** `ruta/al/componente.svelte` (línea aprox. XX)
**Valor actual:** `padding: 64px 32px;`
**Valor target:** `padding: var(--section-pad-lg) var(--gutter);`
**Por qué:** paridad con Figma nodo 2440:330 — el spacing actual no usa tokens fluidos.
**Checklist de aceptación:**
- [ ] El valor final es un token (`var(--x)`), no un literal.
- [ ] `bun run check` pasa sin nuevas violaciones de `architecture-check.ts`.
- [ ] Comparado visualmente contra el screenshot de Figma en 375/768/1280px.
```

**Por qué importa:** un checklist de aceptación por punto permite *verificar*, no
opinar sobre si "quedó bien". Una descripción general no se puede auditar; un
checklist sí.

---

## 2. Reglas negativas explícitas (tan importantes como las positivas)

Todo brief debe declarar qué **NO** tocar, no solo qué sí:

```markdown
## Fuera de alcance (NO TOCAR)
- No agregar dependencias nuevas a `package.json`.
- No modificar `ContactForm.svelte::handleSubmit` — lógica de negocio, fuera de este brief.
- No migrar la arquitectura de `factory/` — solo se consume, no se refactoriza.
```

Sin esto, un agente puede "mejorar de paso" algo fuera de alcance y romper otra cosa
sin que nadie lo haya pedido. Ver la prohibición equivalente en `AGENTS.md`
(Tier 2/3 — cambios a `factory/` o `main` requieren aprobación humana explícita).

---

## 3. Ejecución en batch — un agente por unidad de dueño real

- La unidad de paralelización es el **archivo o componente**, no un split arbitrario
  de líneas o de tiempo. Cada agente recibe alcance y contrato claros (los puntos del
  brief que le tocan a su archivo).
- **Riesgo conocido a vigilar:** paralelizar por archivo puede reproducir, a menor
  escala, la fragmentación que `DRIFT_LOG.md` existe para atrapar — dos agentes
  resolviendo el mismo problema de UI de formas distintas porque cada uno solo vio su
  propio archivo. Por eso el batch siempre cierra con el paso 4.

---

## 4. Registro de ambigüedades — automático, post-batch, no a mano

Al cerrar el batch, se genera (no se escribe a mano después, se genera como parte del
cierre) un registro de ambigüedades: por cada archivo, qué decidió el agente cuando el
brief no era 100% explícito, por qué, y qué queda pendiente de confirmar con el
humano.

```markdown
### Ambigüedad #N — <archivo>
**El brief decía:** "unificar el tratamiento de los links de nav"
**No especificaba:** si aplica igual al menú mobile o solo desktop.
**Decisión tomada:** se aplicó igual a ambos (asunción razonable, no confirmada).
**Pendiente de confirmar:** ¿el mobile debería tener tratamiento distinto?
```

**Reglas del registro:**
- **Todo criterio implícito se documenta, con el porqué.** Nunca una decisión de
  ambigüedad silenciosa.
- **Falsos positivos se marcan como tales, explícitamente**, en vez de "arreglarse"
  como si fueran bugs reales (ejemplo real: un título que aparecía duplicado en un
  paso resultó ser un artefacto de HMR del navegador de la sesión de QA, no un bug —
  se investigó y se documentó como descartado, no se "arregló" un síntoma fantasma).
- **Inconsistencias entre agentes se señalan, no se esconden** — si dos archivos
  resolvieron el mismo problema distinto, eso es una entrada de ambigüedad Y una
  entrada en `DRIFT_LOG.md` si involucra un componente de `factory/`.
- Estos documentos son **scaffolding, no documentación permanente** — ver §6.

---

## 5. Jerarquía de fuentes de verdad — declarada, nunca asumida en silencio

Durante la ejecución van a aparecer fuentes que se contradicen entre sí: el brief
escrito, el feedback verbal del humano, y los valores reales en Figma. **Ninguna gana
por default.**

**Regla:** cuando dos fuentes se contradicen, se pregunta explícitamente cuál manda
para ese tipo de decisión — y la respuesta se acota al alcance real, no se generaliza.
Ejemplo real ya resuelto en un proyecto de la agencia: *"el archivo de Figma se pasa
solo para confirmar tokens; el feedback verbal es lo que se debe hacer"* — es decir,
Figma manda en **sistema de color/tipografía**, el feedback humano manda en
**tamaños, espaciados y estructura puntual**. Esta jerarquía es específica de ese
proyecto — para uno nuevo, se vuelve a preguntar, no se hereda por default.

El brief mismo puede estar desactualizado respecto a Figma (puede haberse derivado de
un sitio hermano o versión anterior, no del Figma real) — si `get_variable_defs` /
`get_design_context` contradice un valor del brief, eso también se resuelve
preguntando, no heredando el valor viejo del brief silenciosamente.

---

## 6. Los docs de proceso son efímeros — pero primero se extrae lo duradero

El brief y el registro de ambigüedades no viven en el repo para siempre. Cuando el
trabajo cierra:

1. **Primero se extrae el conocimiento duradero** a un lugar permanente: valores de
   tokens descubiertos → `DESIGN.md` del cliente; reglas estructurales nuevas →
   `STYLE.md` o `ERROR_PATTERNS.md`; deriva de componentes → `DRIFT_LOG.md`.
2. **Recién después** se borran el brief y el registro de ambigüedades, en el mismo
   commit que consolida el resultado final.

Sin el paso 1, borrar el paso 2 pierde conocimiento real (ver punto débil documentado
en `FABRICA_STATE_PLAYBOOK.md` §7: sin extracción previa, el criterio de diseño queda
solo en el historial de git, y hay que reconstruirlo leyendo commits para el próximo
proyecto similar).

---

## 7. Features aislados y complejos: entender antes de comparar antes de ejecutar

Para un feature que no es "aplicar valores de un brief" sino comportamiento nuevo
(ej. un navbar con scroll + `IntersectionObserver`), no se salta directo a código:

1. **Desglose técnico puro** — cómo funciona la referencia/fuente, sin tocar nada.
2. **Comparación + plan** — tabla comparativa contra el estado actual, plan de acción
   concreto, y una sección explícita **"Puntos a decidir contigo"** con las preguntas
   abiertas antes de escribir código.
3. Recién ahí, código.

---

## 8. Commits al cierre de cada unidad, referenciando el punto del brief

Cada commit debe poder responder "¿qué punto del brief resuelve?" sin tener que
adivinar. Practicar:

- Commits atómicos, uno por unidad de cambio real (no mezclar refactor + feature +
  limpieza de docs en un commit gigante).
- El mensaje describe el diff real que queda en ese commit, no una intención de una
  iteración anterior que ya cambió antes de confirmar.
- El commit lo hace el agente al cerrar la unidad, no un batch manual posterior desde
  el IDE — eso es lo que rompe la trazabilidad en la práctica (mensaje que ya no
  refleja el diff, o texto de debugging pegado por accidente en el mensaje).

Ver `GIT.md` §2 para el formato Conventional Commits y los scopes.

---

## 9. QA real, no solo "compila" — ver `TESTING.md` §5-7

Este protocolo se cierra con verificación, no con la palabra del agente. Ver
`TESTING.md` para: comparación visual multi-breakpoint contra Figma, verificación de
comportamiento con datos (no solo screenshots), y el protocolo de borrado seguro de
assets.
