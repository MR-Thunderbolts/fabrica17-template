# SETUP.md — Scaffolding & Assembly Protocols

> **Status:** Active | **Domain:** GLOBAL GOVERNANCE

---

## Infrastructure Initialization

### New Project Command
```bash
npx sv create . --template minimal --types ts --no-add-ons --install bun --no-dir-check
```

### Shell Rules
- **ALWAYS** use `;` for sequencing (PowerShell compatibility).
- **NEVER** use `&&` (fails silently in PowerShell).
- **NEVER** install Tailwind, external UI libraries, or use CDNs.

---

## New Client Scaffolding

### Trigger
When the user says: "Configurar nuevo cliente" or "Ensamblar cliente para [URL]".

### Execution Flow

#### 1. Create Client Domain
```bash
mkdir clients/<client-name>
mkdir clients/<client-name>/routes
```

Create `clients/<client-name>/PROJECT_STATUS.json`:
```json
{
  "client": "<client-name>",
  "current_phase": "token_extraction",
  "factory_coverage": { "required": [], "available": [], "gaps": [] },
  "completed_tasks": [],
  "audit_results": { "green_grade": null, "bun_check": null, "wcag_aa": null }
}
```

#### 2. Token Extraction (Design Agent)
Connect to Figma URL via MCP. Execute:
1. `mcp_FigmaDesktop_get_variable_defs` on the root frame.
2. Compare output against `figma-tokens.json`.
3. Create `clients/<client-name>/DESIGN.md` with brand-specific overrides.
4. Generate `clients/<client-name>/client-brand.css`.

#### 3. Gap Analysis (Scout Agent)
1. Parse Figma node tree via `mcp_FigmaDesktop_get_metadata`.
2. List all component types in the design.
3. Cross-reference against `factory/src/lib/components/`.
4. Update `PROJECT_STATUS.json` → `factory_coverage.gaps`.

#### 4. Factory Expansion (if gaps exist)
For each gap, the Developer Agent:
1. Creates the missing Golden Component in `factory/src/lib/components/`.
2. Follows `RULES_SVELTE5.md` + `STYLE.md`.
3. Runs `bun run check`.

#### 5. Page Assembly (Developer Agent)
1. Import Golden Components from the factory.
2. Map Figma props to component props.
3. Generate `clients/<client-name>/routes/+page.svelte`.
4. **STRICT:** No inline HTML/CSS. Assembly ONLY.

#### 6. Green Audit (QA Agent)
1. Run `bun run check` — must return 0 errors.
2. Run `bun run build` — check bundle sizes.
3. Validate WCAG AA contrast.
4. Update `PROJECT_STATUS.json` → `audit_results`.

#### 7. Curator Pass
- If errors found: document in `governance/ERROR_PATTERNS.md`.
- If Grade A+: extract patterns to `governance/BEST_PRACTICES.md`.

---

## Asset Protocols

### Fonts
- **Prototyping:** Google Fonts CDN permitted.
- **Production:** Self-hosted, subsetted WOFF2 in `factory/assets/fonts/`.

### Icons
- **Default Official Collection:** Use `unplugin-icons` with `@iconify-json/mynaui` (MynaUI Icons). Import individually: `import IconLightning from '~icons/mynaui/lightning'`.
- **Project Specificity:** Other collections (e.g. `@iconify-json/ph` for Phosphor, `@iconify-json/lucide` for Lucide) are allowed if the client's project specifically requires them.
- **NEVER** import full icon packages in bundle; always import individually to preserve treeshaking.

#### 👥 Protocolo Interactivo de Inicialización de Iconos (SETUP AGENT)
Al configurar o inicializar un nuevo proyecto/cliente, el Agente de Setup **deberá formular interactivamente** al usuario la siguiente consulta para alinearse con sus requisitos específicos:
> *"¿Este proyecto requiere una librería de iconos personalizada o específica? (Si la respuesta es afirmativa, indícame si deseas instalarla mediante un paquete de NPM, un enlace directo o si incluirás manualmente una carpeta con los SVGs en `/src` para configurarla)"*

### Images
- WebP/AVIF only.
- `loading="lazy"` + `decoding="async"` below the fold.
- Use `<picture>` + `srcset` for responsive images.
