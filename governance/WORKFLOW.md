# WORKFLOW.md — Factory Expansion vs. Client Assembly

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE

This document defines the two operational modes of the Fábrica17 pipeline.

---

## The 2-Phase Model

### Phase 1: Factory Expansion (Building the Library)

- **Objective:** Populate `/factory/src/lib/components/` with atoms, molecules, organisms, and templates.
- **The Rule of Gold:** Components MUST be named exactly as their counterparts in the Figma design system.
- **Permitted Actions:** Code generation is allowed to create new Golden Components.
- **Output:** Pure, daltónic, agnostic Svelte 5 components wired to CSS custom properties.

**Entry Criteria:** User requests a new component OR Scout detects a gap.
**Exit Criteria:** Component passes `bun run check` + Green Audit.

### Phase 2: Client Assembly (Production)

- **Objective:** Translate Figma node trees into assembled pages within `/clients/<name>/`.
- **STRICT ASSEMBLY RULE:** Once Factory phase is complete for a component, agents are FORBIDDEN from inventing HTML/CSS. They must:
  1. Import Golden Components from the factory.
  2. Map Figma props (text, images, links) to component props.
  3. Generate `+page.svelte` files using `Template.ClientAssembly.svelte`.

**Entry Criteria:** Factory library covers all required components.
**Exit Criteria:** Page passes Green Audit + visual parity with Figma.

---

## Agent Workflow Sequence

```
1. USER provides Figma link
   │
2. ORCHESTRATOR reads AGENTS.md, determines phase
   │
3. SCOUT analyzes Factory inventory vs. Figma requirements
   │  └─ Outputs: Component Manifest → PROJECT_STATUS.json
   │
4. DESIGN extracts tokens via Figma MCP
   │  └─ Outputs: client DESIGN.md (brand tokens)
   │
5. DEVELOPER assembles pages (imports Golden Components)
   │  └─ Outputs: /clients/<name>/routes/+page.svelte
   │
6. QA runs Green Audit + bun run check
   │  └─ Outputs: audit_results in PROJECT_STATUS.json
   │
7. CURATOR documents errors → ERROR_PATTERNS.md
   │         documents wins  → BEST_PRACTICES.md
```

---

## Communication Protocols (Agent-to-Agent)

Handoff snippets ensure smooth transitions:

- **Scout → Orchestrator:** "Gap analysis complete. 2 missing components: `Card.Pricing`, `Tabs.Standard`. Recommend Factory Expansion before assembly."
- **Design → Developer:** "Visual domain finalized. Primary tokens mapped in `DESIGN.md` L24-L45. Cleared for assembly."
- **Developer → QA:** "Assembly complete at `/clients/acme/routes/+page.svelte`. No new dependencies. Awaiting Green Audit."
- **QA → Curator:** "Audit passed Grade A (0.15g CO₂). Extracting patterns to BEST_PRACTICES.md."

---

## State Machine: PROJECT_STATUS.json

Every client project includes a persistent state tracker:

```json
{
  "client": "acme",
  "current_phase": "assembly",
  "factory_coverage": {
    "required": ["Navbar.Standard", "Hero.Split", "Card.Pricing"],
    "available": ["Navbar.Standard", "Hero.Split"],
    "gaps": ["Card.Pricing"]
  },
  "completed_tasks": [
    { "task": "token_extraction", "agent": "design", "status": "done" },
    { "task": "page_assembly", "agent": "developer", "status": "in_progress" }
  ],
  "audit_results": {
    "green_grade": null,
    "bun_check": null,
    "wcag_aa": null
  }
}
```
