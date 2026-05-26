# AGENTS.md — Master Index & Agent Topology

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE

You are operating within the **Fábrica17 Multi-Agent Architecture**. This file is the single entry point for all agents. Before performing any task, identify your role below and read only the files relevant to your assignment.

---

## Agent Topology

| Agent | Role | Primary Context Files |
|:---|:---|:---|
| **Orchestrator** | High-level delegation & task routing | This file + User Request |
| **Scout** | Gap Analysis between Figma and Factory | `factory/` components + client `DESIGN.md` |
| **Design** | Token Extraction from Figma MCP | Figma MCP → client `DESIGN.md` |
| **Developer** | Component implementation & page assembly | `RULES_SVELTE5.md` + `GREEN_CODING.md` + client `DESIGN.md` |
| **QA** | Green Audit & validation | `TESTING.md` + client routes |
| **Curator** | Error documentation & success patterns | `ERROR_PATTERNS.md` + `BEST_PRACTICES.md` |

---

## Hierarchical Discovery Protocol

Agents inherit rules in this priority order:

1. **Global Governance** (`/governance/`) — Universal rules. ALWAYS apply.
2. **Factory Domain** (`/factory/`) — Golden Component standards. READ-ONLY for assembly agents.
3. **Client Domain** (`/clients/<name>/`) — Local tokens & routes. WRITE scope for Developer/QA.

---

## Context File Index (Progressive Disclosure)

### Architecture & Performance
👉 **[GREEN_CODING.md](./GREEN_CODING.md)** — Carbon budgets, bundle sizes, asset strategy.

### Svelte 5 Engineering
👉 **[RULES_SVELTE5.md](./RULES_SVELTE5.md)** — Runes, Snippets, prohibited Svelte 4 patterns.

### Workflow & Phases
👉 **[WORKFLOW.md](./WORKFLOW.md)** — Factory Expansion vs. Client Assembly logic.

### Component Standards
👉 **[STYLE.md](./STYLE.md)** — Atomic Design, semantic naming, composition rules.

### Token Synchronization
👉 **[TOKEN_WORKFLOW.md](./TOKEN_WORKFLOW.md)** — Figma MCP parity protocol.

### Validation
👉 **[TESTING.md](./TESTING.md)** — Pre-flight checks, self-healing loops.

### Version Control
👉 **[GIT.md](./GIT.md)** — Branching Strategy, PR Workflow, Conventional Commits.

### Onboarding & Training
👉 **[ONBOARDING.md](./ONBOARDING.md)** — Team induction guide, role mapping, training plan.

### Error Memory
👉 **[ERROR_PATTERNS.md](./ERROR_PATTERNS.md)** — Curator's playbook of known failures.

### Success Patterns
👉 **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** — A+ audit patterns extracted by QA.

### Client Setup Skill
👉 **[SETUP.md](./SETUP.md)** — Scaffolding & assembly protocols.

---

## Quality Gates (STRICT)

**REGLA MECÁNICA (ALWAYS):** Before writing HTML for a new component, use `list_dir` on `factory/src/lib/components/`. If a compound namespace exists, IMPORT from it. NEVER duplicate.

**REGLA DE ICONOS:**
- ❌ NO RECOMENDADO: Usar SVGs inline ad-hoc no estructurados (dificultan la sustentabilidad y consistencia).
- ✅ RECOMENDADO: Usar la colección oficial **MynaUI Icons** expuesta como `~icons/mynaui/<icon>`. MynaUI es la librería estándar por defecto de la Fábrica y este proyecto.
- 💡 FLEXIBILIDAD: Se permite plenamente el uso de otras librerías oficiales (como Phosphor `~icons/ph/*`, Lucide `~icons/lucide/*`, etc.) o colecciones personalizadas cuando los requerimientos específicos del proyecto del cliente lo exijan.

**REGLA DE ENSAMBLAJE (NEVER):** NEVER use Figma Code Connect. Our flow is 100% **Semantic Match**.
- Figma layer `Navbar.Standard` → `import * as Navbar from '$factory/components/navbar'`
- Figma layer `Hero.Split` → `import * as Hero from '$factory/components/hero'`
- Import from compound namespace `index.ts`, NOT from individual `.svelte` files.

**COMPOUND IMPORT RULE:**
```typescript
// ✅ CORRECT
import * as Dialog from '$factory/components/dialog';
<Dialog.Root bind:open><Dialog.Trigger>Open</Dialog.Trigger></Dialog.Root>

// ❌ PROHIBITED
import DialogRoot from '$factory/components/dialog/DialogRoot.svelte';
```

**3-TIER GOVERNANCE:**
| Tier | Scope | Rule |
|:---|:---|:---|
| **Tier 1 — Autonomous** | `/clients/` directory | Agents can create/edit freely within assigned client folder. |
| **Tier 2 — Soft Approval** | `/factory/` components | Modifications require diff + human CONFIRM. |
| **Tier 3 — Strong Approval** | `main` branch / Deploy | No agent can commit to `main` without human signature. |

**SELF-HEALING PROTOCOL:** If `bun run check` fails, the agent is PROHIBITED from stopping. Analyze → Fix → Retry. If unresolved after **3 iterations**, pause and request **Human Assistance (Tier 3)**.

**MANTRA:** "If the contraste fails in Light Mode, my work is a system failure."
