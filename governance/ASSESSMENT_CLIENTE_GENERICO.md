# ASSESSMENT — Página de Cliente Genérica + Fábrica con Figma MCP

> **Generado:** 2026-07-08 | **Caso de estudio:** GreenMIP (primer cliente real de la Fábrica Base)
> **Propósito:** Consolidar el aprendizaje del ciclo completo Figma → Fábrica → Sitio publicado,
> y definir el protocolo repetible para el próximo cliente.

---

## 1. Qué se logró (progreso acumulado)

| Hito | Evidencia |
|:---|:---|
| Landing premium del cliente anterior (Ciclo17) con sistema OKLCH, carousel responsive, modal-first audit | commits `499376b` → `391310a` |
| Extracción de componentes genéricos (BadgePill, Tooltip, SkeletonCard, PageLoadingOverlay) | commit `75e872c` |
| Template de Fábrica Base: `clean:template`, `tokens:sync`, governance/, factory/ compound components | commit `2a6ea06` |
| Primer cliente real sobre el template: GreenMIP (11 secciones en `cliente/`, tokens propios) | working tree actual |
| Limpieza de fugas de marca del estado previo | sesión 2026-07-08 (ver §2) |

**Arquitectura validada:** la separación `factory/` (core intocable) + `cliente/` (todo lo específico) + `governance/` (reglas) funcionó — las 11 secciones de GreenMIP se construyeron sin tocar el core.

---

## 2. Qué falló: fugas de marca del cliente anterior

Detectadas durante el test de GreenMIP y corregidas el 2026-07-08:

1. **`PageLoadingOverlay` importaba `Logo-Ciclo17.svg` hardcodeado** — el overlay de carga de GreenMIP mostraba el logo de la agencia. *Fix:* el logo ahora es un prop (`logo?: string`) con fallback neutro; el layout del cliente lo inyecta.
2. **`+error.svelte` usaba la paleta de auditoría de Ciclo17** (`--color-audit-*` con fallbacks `#141827`/`#d6f47a`) — vars que ya no existían, así que los fallbacks pintaban la página de error con colores del proyecto anterior. *Fix:* migrada a tokens vigentes.
3. **`utils/client-brand.css` congelado con la marca Ciclo17** (Eucalyptus, Space Grotesk). *Fix:* neutralizado como placeholder documentado del pipeline `tokens:sync`.
4. **`scripts/clean-template.ts` tenía la lista de archivos del cliente anterior hardcodeada** — correrlo hoy no habría limpiado GreenMIP, y la página demo usaba vars inexistentes. *Fix:* enfoque invertido — se declara el **núcleo genérico a conservar** y se borra todo lo demás; el script ahora también resetea `tokens.css` a una paleta neutra y el `+layout.svelte`.
5. **Docs con rutas absolutas a otro repo y scripts inexistentes** (`CLIENTE_SETUP.md` → `fabrica17`, `check:factory`). *Fix:* links relativos y comando real.

**Lección raíz:** *la marca se fuga por los archivos que nadie mira en el happy path* — estados de carga, páginas de error, scripts de tooling, docs. El branding no vive solo en `tokens.css`.

---

## 3. Dónde es idóneo llamar al Figma MCP (pipeline por etapas)

El error más caro es pedir "implementa esta página de Figma" con la URL de la página completa. El MCP rinde al máximo con llamadas **pequeñas, por nodo, en el orden correcto**:

| Etapa | Herramienta MCP | Regla |
|:---|:---|:---|
| **0. Tokens primero** | `get_variable_defs` sobre el archivo | UNA vez, antes de cualquier componente. Exportar → `figma-tokens.json` → `bun run tokens:sync`. Si el diseño no usa Variables de Figma, detenerse y arreglar el archivo Figma primero. |
| **1. Inventario** | `get_metadata` sobre el frame raíz | Devuelve el mapa de node-IDs de secciones (barato en tokens). De aquí sale el plan: 1 sección = 1 componente = 1 iteración. |
| **2. Por sección** | `get_design_context` + `get_screenshot` **del nodo de la sección**, nunca de la página | El contexto por nodo mantiene la fidelidad (spacing, jerarquía, variantes). El screenshot es la ground truth visual para comparar el render. |
| **3. Assets** | `download_assets` / export por nodo | Logos e ilustraciones se **descargan**, jamás se redibujan ni se aproximan. Directo a `cliente/assets/` con nombre estable. |
| **4. Verificación** | `get_screenshot` (Figma) vs screenshot local | Levantar el sitio, capturar la sección renderizada y compararla lado a lado con la de Figma antes de dar la sección por cerrada. |
| **Transversal. Code Connect** | `add_code_connect_map` | Mapear componentes de `factory/` (Button, Section, Navbar, Card…) a los componentes de Figma. Después de esto, `get_design_context` devuelve *tus* componentes en vez de divs genéricos — **es la palanca de fidelidad más grande que existe**. |

---

## 4. Prácticas de trabajo (lado diseño y lado repo)

### En Figma — el "contrato de diseño"
- **Auto Layout en todo.** Un frame sin Auto Layout se traduce a posiciones absolutas y rompe el responsive.
- **Variables de Figma para todo color/tipografía/radio/spacing.** Fills hardcodeados = tokens que `tokens:sync` nunca verá.
- **Frames de sección nombrados igual que el componente destino**: el frame `HeroSection` se convierte en `cliente/HeroSection.svelte`. El nombre ES el contrato.
- **Componentes Figma para elementos repetidos** (cards, badges, items de lista) — son lo único mapeable con Code Connect.

### En el repo — gates automáticos
- **Prohibido hex en `cliente/`**: todo color via `var(--token)`. Greppable: `grep -rn "#[0-9a-fA-F]\{3,8\}" cliente/ --include="*.svelte"`.
- **Gate anti-fuga de marca**: antes de cada commit, grep del nombre/paleta del cliente *anterior* en `cliente/ src/ utils/`. (Candidato ideal a hook de Claude Code.)
- **`bun governance/integrity_check.ts` + `bun run check` + `bun run build`** como pre-flight (ya documentado en CLIENTE_SETUP.md).

### Automatizar el prompt (la respuesta a "¿podemos automatizar cómo se lo pido?")
Sí: encapsular la receta del §3 en una **skill de proyecto** (`.claude/skills/figma-seccion/SKILL.md`). El input pasa a ser solo la URL del nodo; la skill fija los pasos: metadata → design context + screenshot → mapear a componentes factory → escribir `cliente/<Nombre>.svelte` solo con tokens → verificación visual. Así el prompt deja de depender de cómo se redacte cada vez — la variabilidad humana sale del loop, que es exactamente donde nacían los errores de fidelidad.

Complemento: un **CLAUDE.md en la raíz** (no existe hoy) que cargue automáticamente las reglas críticas de governance en cada sesión — hoy `governance/` solo sirve si alguien se acuerda de citarlo.

---

## 5. Slash commands disponibles que habrían mejorado este proceso

| Comando | Dónde habría ayudado |
|:---|:---|
| `/init` | Crear el `CLAUDE.md` raíz. La falta más importante: governance/ existe pero ninguna sesión lo carga sola. |
| `/verify` | Al cerrar cada sección: ejercita la app de punta a punta. Habría detectado el logo Ciclo17 en el overlay de navegación (solo aparece al navegar entre rutas — invisible en revisión estática). |
| `/run` | Levantar el sitio y capturar screenshots para el diff visual contra Figma (etapa 4 del pipeline). |
| `/code-review` | Sobre el diff antes de cada commit — habría marcado las vars CSS inexistentes en `+error.svelte` y el `clean-template.ts` desactualizado. |
| `/simplify` | Pasada de limpieza tras cada feature (deduplicación, tokens repetidos). |
| `/security-review` | Antes de producción: formulario de contacto, links de WhatsApp, targets `_blank`. |
| `/update-config` | Configurar hooks: gate anti-fuga de marca + integrity_check automático tras editar `factory/`. |
| `/figma-code-connect` (skill del MCP) | Ejecutar el mapeo Code Connect factory ↔ Figma del §3. |
| `/fewer-permission-prompts` | QoL: menos fricción en sesiones largas de fábrica. |

---

## 6. Protocolo resumido para el próximo cliente

```
1. Duplicar template → bun install → bun run dev
2. Figma: verificar contrato de diseño (§4) — si falla, arreglar Figma ANTES de codear
3. get_variable_defs → figma-tokens.json → bun run tokens:sync (o escribir cliente/tokens.css)
4. get_metadata del frame raíz → plan de secciones
5. Por sección: /figma-seccion <url-del-nodo> → componente → /verify → screenshot diff
6. Assets via download_assets → cliente/assets/
7. Pre-flight: integrity_check + check + build + gate anti-fuga de marca
8. Al terminar el ciclo: bun run clean:template para regenerar el template limpio
```
