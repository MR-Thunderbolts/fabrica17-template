# ONBOARDING — Guía de Inducción a Fábrica17

> **Versión:** 1.0 | **Fecha:** 2026-05-26
> **Para:** Equipo completo de la agencia
> **Prerequisito:** Tener Git instalado y acceso al repo `MR-Thunderbolts/fabrica17`

---

## ¿Qué es Fábrica17?

Fábrica17 es nuestra **fábrica de componentes web** construida con Svelte 5. No es un proyecto de un solo cliente — es el sistema que usamos para ensamblar sitios de **cualquier cliente** rápidamente.

### La Analogía de la Fábrica

Piensa en una fábrica de autos:

| Concepto | En Fábrica17 | Carpeta |
|:---|:---|:---|
| **Las piezas estándar** (motor, ruedas, chasis) | Componentes Golden (Button, Card, Hero, Navbar) | `/factory/` |
| **La línea de ensamblaje** | Las reglas y governance | `/governance/` |
| **El auto final personalizado** | El sitio del cliente | `/cliente/` |

- Las **piezas** (`/factory/`) son genéricas, sin marca. Un botón es un botón.
- La **personalización** se hace con **tokens CSS** (colores, tipografía, espaciado).
- El **producto final** (`/cliente/`) combina piezas + marca del cliente.

---

## Estructura del Proyecto

```
fabrica17/
│
├── 🎨 cliente/              ← ENSAMBLAJE DEL CLIENTE ACTUAL
│   ├── LandingPage.svelte    # Página principal
│   ├── tokens.css            # Tokens de marca del cliente
│   └── ...otros componentes
│
├── 🏭 factory/              ← COMPONENTES GOLDEN (piezas reutilizables)
│   └── src/lib/components/
│       ├── button/           # Botón genérico
│       ├── hero/             # Sección hero genérica
│       └── ...17 componentes
│
├── 📋 governance/          ← REGLAS (leer, no editar sin permiso)
│   ├── AGENTS.md            # Roles de los agentes AI
│   ├── GIT.md               # Cómo usar Git y PRs ← LEER PRIMERO
│   └── ...otros docs
│
├── src/                      ← SvelteKit app shell
├── static/                   ← Assets estáticos (imágenes, fonts)
└── package.json              ← Scripts: dev, build, check
```

### ¿Qué puedo tocar?

| Carpeta | PM | Diseñador | Practicante/Lead | Dev Externo |
|:---|:---|:---|:---|:---|
| `/governance/` | 🔒 Solo leer | 🔒 Solo leer | ✅ Editar | 🔒 Solo leer |
| `/factory/` | 🔒 No tocar | 🟡 Con aprobación | ✅ Editar | 🟡 Con aprobación |
| `/cliente/` | 🔒 No tocar | ✅ Editar libremente | ✅ Editar | ✅ Editar |
| `src/` | 🔒 No tocar | 🟡 Con cuidado | ✅ Editar | ✅ Editar |

---

## Cómo Trabajar con Git (Paso a Paso)

### Setup Inicial (Solo la primera vez)

```bash
# 1. Clonar el repositorio
git clone https://github.com/MR-Thunderbolts/fabrica17.git
cd fabrica17

# 2. Instalar dependencias
bun install

# 3. Verificar que todo funciona
bun run dev
# → Abre http://localhost:5173 en tu navegador

# 4. Configurar tu identidad (usa tu nombre y email de GitHub)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### Flujo Diario — El Ciclo Completo

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. git pull origin main          ← Actualizar          │
│         │                                               │
│  2. git checkout -b cliente/...   ← Crear branch        │
│         │                                               │
│  3. [editar archivos]             ← Trabajar            │
│         │                                               │
│  4. git add -A                    ← Preparar            │
│     git commit -m "..."           ← Guardar             │
│         │ (repetir 3-4 cuantas veces quieras)           │
│         │                                               │
│  5. git push origin cliente/...   ← Subir               │
│         │                                               │
│  6. [Abrir PR en GitHub]          ← Solicitar review    │
│         │                                               │
│  7. [PM/Lead aprueba]             ← Review              │
│         │                                               │
│  8. [Merge a main]                ← Producción! 🚀      │
│         │                                               │
│  9. git checkout main             ← Volver a main       │
│     git pull origin main          ← Actualizar          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Comandos Cheatsheet

| Qué quiero hacer | Comando |
|:---|:---|
| Actualizar mi copia local | `git pull origin main` |
| Ver en qué branch estoy | `git branch` |
| Crear un nuevo branch | `git checkout -b cliente/mi-feature` |
| Ver qué archivos cambié | `git status` |
| Guardar mis cambios | `git add -A && git commit -m "tipo(scope): descripción"` |
| Subir mi branch | `git push origin cliente/mi-feature` |
| Volver a main | `git checkout main` |
| Eliminar branch local después de merge | `git branch -d cliente/mi-feature` |
| Deshacer cambios no guardados | `git checkout -- .` |
| Ver el historial | `git log --oneline -10` |

### Nombres de Branch — Ejemplos

| Tipo de trabajo | Nombre del branch |
|:---|:---|
| Rediseñar la sección hero | `cliente/hero-redesign` |
| Ajustar colores de la landing | `cliente/ajuste-tokens-color` |
| Crear componente pricing card | `factory/pricing-card` |
| Arreglar tooltip en mobile | `fix/tooltip-mobile` |
| Agregar sección FAQ | `cliente/seccion-faq` |

---

## Flujo para Nuevos Clientes (Template Repository)

Nuestra `fabrica17` funciona como una **Semilla Pura**. No trabajamos distintos clientes en distintas ramas de este mismo repositorio, sino que creamos repositorios nuevos para cada cliente.

### ¿Cómo iniciar un proyecto nuevo?

1. El PM o Lead entra a GitHub a `MR-Thunderbolts/fabrica17`.
2. Hace clic en el botón verde **"Use this template"** (arriba a la derecha) -> **"Create a new repository"**.
3. Nombra el nuevo repositorio (ej. `MR-Thunderbolts/cliente-acme`).
4. El nuevo repositorio es un clon exacto de la fábrica, pero su historial de Git empieza limpio.
5. El equipo clona el nuevo repositorio y trabaja ensamblando la página dentro de `/cliente/`.

> **Mantenimiento:** Las mejoras y nuevos componentes genéricos (`/factory/` y `/governance/`) siempre deben hacerse primero en el repo base `fabrica17`, para que los futuros clientes nazcan con las últimas mejoras.

---

## Las 2 Fases de la Fábrica

### Phase 1: Factory Expansion 🏭

**Cuándo:** Cuando necesitamos un componente que NO existe en `/factory/`.

**Quién:** Practicante (Lead) + Devs Externos

**Qué se hace:**
1. Se analiza qué componente falta (gap analysis)
2. Se crea en `/factory/src/lib/components/` como componente Golden
3. El componente es **genérico** — sin colores de marca, sin contenido específico
4. Se exporta via compound namespace (`index.ts`)

**Ejemplo:** Necesitamos un `<Tabs>` que no existe → se crea `factory/src/lib/components/tabs/`

### Phase 2: Client Assembly 🎨

**Cuándo:** Cuando las piezas ya existen y hay que armar la página del cliente.

**Quién:** Diseñadores + Practicante

**Qué se hace:**
1. Se importan componentes Golden desde `/factory/`
2. Se aplican los tokens del cliente (`cliente/tokens.css`)
3. Se ensamblan las páginas con contenido real (textos, imágenes)
4. Se refinan detalles visuales (spacing, responsividad, animaciones)

**Ejemplo:** Tenemos `<Hero>` en factory → se crea `cliente/LandingHero.svelte` que lo usa con los colores y textos del cliente.

### ¿Cuándo estoy en Phase 1 vs Phase 2?

```
¿El componente que necesito existe en /factory/?
    │
    ├── SÍ → Phase 2 (Assembly)
    │         Importar y personalizar en /cliente/
    │
    └── NO → Phase 1 (Expansion)
              Crear primero en /factory/, luego Phase 2
```

---

## Svelte 5 — Lo Mínimo que Necesitas Saber

> No necesitas ser experto. Pero sí debes usar la syntax correcta.

### Esto SÍ ✅

```svelte
<script>
  // Props del componente
  let { title, subtitle } = $props();
  
  // Estado reactivo
  let count = $state(0);
  
  // Valor derivado (calculado automáticamente)
  let doubled = $derived(count * 2);
</script>

<h1>{title}</h1>
<p>{subtitle}</p>
<button onclick={() => count++}>Clicks: {count} (doubled: {doubled})</button>
```

### Esto NO ❌ (Svelte 4 — Prohibido)

```svelte
<script>
  // ❌ PROHIBIDO
  export let title;
  let count = 0;
  $: doubled = count * 2;
</script>

<!-- ❌ PROHIBIDO -->
<button on:click={() => count++}>...</button>
```

### Regla Simple
| Svelte 4 (NO usar) | Svelte 5 (SÍ usar) |
|:---|:---|
| `export let prop` | `let { prop } = $props()` |
| `let x = 0` (reactivo) | `let x = $state(0)` |
| `$: derived = ...` | `let derived = $derived(...)` |
| `on:click={fn}` | `onclick={fn}` |
| `<slot />` | `{@render children()}` |

---

## Convenciones de Estilo (CSS)

### Lo que usamos
- **Vanilla CSS** con Custom Properties (variables CSS)
- **OKLCH** para colores (mejor percepción visual)
- **`data-*` attributes** para estados (no clases condicionales)
- **No Tailwind** — prohibido

### Ejemplo de tokens del cliente (`cliente/tokens.css`)
```css
:root {
  --color-primary: oklch(0.55 0.15 250);
  --color-secondary: oklch(0.7 0.1 180);
  --font-headline: 'Inter', system-ui, sans-serif;
  --spacing-section: clamp(3rem, 8vw, 6rem);
}
```

### ¿Cómo aplico colores?
```css
.hero-title {
  color: var(--color-primary);
  font-family: var(--font-headline);
}
```

---

## Deploy y Previews

### Flujo Automático con Vercel

```
Tu branch con PR → Vercel genera Preview URL automático
                     ↓
              PM revisa el Preview
                     ↓
              Aprueba PR en GitHub
                     ↓
              Merge a main → Deploy a producción 🚀
```

### ¿Qué significa esto?
- **No necesitas deployar manualmente** — nunca
- **Cada PR tiene su propio URL** de preview para revisar
- **Producción se actualiza sola** cuando algo entra a `main`

---

## Plan de Capacitación

### Semana 1: Fundamentos

| Día | Tema | Rol | Ejercicio |
|:---|:---|:---|:---|
| Lunes | Git Basics | Todos | Clonar repo, crear branch, hacer commit, abrir PR |
| Martes | Estructura del Proyecto | Todos | Navegar las carpetas, identificar qué hace cada una |
| Miércoles | Dev Server | Diseñadores | `bun run dev`, editar un `.svelte`, ver cambios en vivo |
| Jueves | Svelte 5 Basics | Diseñadores | Modificar props, estilos, texto en un componente existente |
| Viernes | PR Workflow | Todos | Flujo completo: branch → cambio → commit → PR → review → merge |

### Semana 2: Práctica Guiada

| Día | Tema | Rol | Ejercicio |
|:---|:---|:---|:---|
| Lunes | Tokens CSS | Diseñadores | Modificar `tokens.css`, ver cómo cambia toda la landing |
| Martes | Componentes Cliente | Diseñadores | Editar `LandingHero.svelte`: cambiar textos, ajustar spacing |
| Miércoles | Resolución de conflictos | Todos | Simular un conflicto Git y resolverlo |
| Jueves | Factory tour | Diseñadores | Explorar `/factory/`, entender compound components |
| Viernes | Mini-proyecto | Diseñadores | Crear una variante nueva de una sección existente (branch → PR → merge) |

### Semana 3: Autonomía

| Día | Tema | Rol | Ejercicio |
|:---|:---|:---|:---|
| Lunes | Responsive | Diseñadores | Verificar y ajustar componentes en mobile (375px) |
| Martes | Figma → Código | Diseñadores | Extraer tokens de Figma, mapear a custom properties |
| Miércoles | Green Coding | Todos | Correr `bun run check`, interpretar resultados |
| Jueves | Review cruzado | Todos | Practicar code review en PRs de compañeros |
| Viernes | Retrospectiva | Todos | ¿Qué funciona? ¿Qué ajustar en el flujo? |

---

## Ejercicios de Práctica

### Ejercicio 1: Tu Primer PR (30 min)

```bash
# 1. Asegúrate de estar en main actualizado
git checkout main
git pull origin main

# 2. Crea un branch de práctica
git checkout -b cliente/practica-mi-nombre

# 3. Abre cliente/LandingHero.svelte
#    Cambia algún texto visible (título, subtítulo)

# 4. Guarda y commitea
git add -A
git commit -m "docs(practica): primer PR de [tu nombre]"

# 5. Sube tu branch
git push origin cliente/practica-mi-nombre

# 6. Ve a GitHub y abre un PR
#    Título: "docs(practica): primer PR de [tu nombre]"
#    Descripción: "Ejercicio de onboarding - mi primer PR"
```

### Ejercicio 2: Modificar Tokens (20 min)

```bash
# 1. Crear branch
git checkout -b cliente/practica-tokens

# 2. Abrir cliente/tokens.css
#    Cambiar el valor de --color-primary a otro color OKLCH
#    Ver el resultado en el dev server (bun run dev)

# 3. Commitear con mensaje descriptivo
git add -A
git commit -m "style(tokens): explorar variación de color primario"
git push origin cliente/practica-tokens
```

### Ejercicio 3: Resolver un Conflicto (30 min)

> Hacer en pareja — dos personas editan la misma línea en branches diferentes.

1. Persona A crea `cliente/conflicto-a`, edita línea 5 de `LandingHero.svelte`
2. Persona B crea `cliente/conflicto-b`, edita la misma línea 5
3. Persona A mergea primero (sin conflicto)
4. Persona B intenta mergear → conflicto
5. Persona B resuelve el conflicto localmente, push, y completa el merge

---

## FAQ — Preguntas Frecuentes

### ¿Necesito saber programar para contribuir?
No necesitas ser developer. Si puedes editar HTML y CSS, puedes trabajar en `/cliente/`. Los componentes de `/factory/` son más técnicos.

### ¿Qué pasa si rompo algo?
Nada permanente. Si estás en un branch (no en `main`), tus cambios están aislados. Si algo se rompe en tu branch, puedes revertir o pedir ayuda. `main` está protegida por PRs.

### ¿Cada cuánto debo hacer commit?
Cada vez que tengas un cambio coherente. No esperes a tener todo terminado. Commits pequeños y frecuentes > un commit gigante.

### ¿Qué hago si `bun run dev` no arranca?
```bash
# Reinstalar dependencias
rm -rf node_modules
bun install
bun run dev
```

### ¿Puedo usar Tailwind?
No. Está prohibido en la gobernanza de la fábrica. Usamos Vanilla CSS con Custom Properties.

### ¿Cómo sé si alguien más cambió algo?
```bash
git fetch origin
git log origin/main --oneline -5  # Ver últimos 5 commits en main remoto
```

### ¿Qué hago si estoy perdido?
1. Lee `/governance/GIT.md` — tiene el flujo completo
2. Pregunta en el chat del equipo
3. El Practicante/Lead puede hacer pair programming

---

## Contacto y Escalación

| Situación | Acción |
|:---|:---|
| Duda sobre Git | Preguntar al Practicante (Lead) |
| Conflicto que no puedo resolver | Preguntar al Practicante (Lead) |
| No sé si mi cambio es correcto | Abrir PR como Draft y pedir feedback |
| Algo se rompió en producción | Notificar al PM + Practicante inmediatamente |
| Necesito un componente nuevo | Abrir issue en GitHub describiendo qué se necesita |

---

## Glosario

| Término | Significado |
|:---|:---|
| **Branch** | Una copia paralela del código donde trabajas sin afectar a otros |
| **Commit** | Un "punto de guardado" con descripción de qué cambiaste |
| **PR (Pull Request)** | Una solicitud para integrar tu branch a `main` |
| **Merge** | El acto de integrar un branch a otro |
| **Preview Deploy** | Un sitio temporal que Vercel crea para cada PR |
| **Golden Component** | Un componente genérico reutilizable de `/factory/` |
| **Token** | Una variable CSS que define un valor de diseño (color, font, spacing) |
| **Runes** | El sistema de reactividad de Svelte 5 (`$state`, `$derived`, etc.) |
| **OKLCH** | Un espacio de color perceptualmente uniforme que usamos |
| **SSG** | Static Site Generation — el sitio se pre-genera como HTML estático |
