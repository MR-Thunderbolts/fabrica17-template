# GIT.md — Branching Strategy & Collaboration Protocol

> **Status:** Active | **Updated:** 2026-05-26 | **Domain:** GLOBAL GOVERNANCE

---

## 1. Branch Architecture

```
main (PROTEGIDA — solo merge vía Pull Request)
 │
 ├── factory/<nombre-componente>     ← Phase 1: Factory Expansion
 │     Ejemplo: factory/pricing-card
 │
 ├── cliente/<nombre-feature>        ← Phase 2: Client Assembly
 │     Ejemplo: cliente/hero-redesign
 │
 └── fix/<descripción-corta>         ← Hotfixes urgentes
       Ejemplo: fix/tooltip-mobile
```

### Reglas de Branching

| Branch | Quién crea | Quién aprueba PR | Deploy |
|:---|:---|:---|:---|
| `factory/*` | Developer / Diseñador | PM o Lead (Tier 2 — Soft Approval) | Preview automático |
| `cliente/*` | Diseñador / Developer | Cualquier peer + PM (Tier 2) | Preview automático |
| `fix/*` | Cualquiera | PM o Lead (Tier 3 — Strong Approval) | Preview automático |
| `main` | **Nadie directamente** | PR aprobado + checks verdes | **Deploy a producción** (automático vía Vercel) |

### Regla de Oro
> 🚫 **PROHIBIDO** hacer `git push origin main` directamente.
> ✅ **OBLIGATORIO** crear branch → hacer PR → obtener aprobación → merge.

---

## 2. Commit Conventions (Conventional Commits)

### Formato
```
type(scope): subject
```

### Tipos Permitidos

| Type | Uso | Ejemplo |
|:---|:---|:---|
| `feat` | Nuevo componente o feature | `feat(hero): implementar animación de entrada` |
| `fix` | Corrección de bug | `fix(tooltip): corregir posición en mobile` |
| `style` | Tokens, colores, spacing, tipografía | `style(tokens): ajustar paleta OKLCH` |
| `refactor` | Reestructuración sin cambio visual | `refactor(nav): migrar a Svelte 5 runes` |
| `docs` | Cambios en documentación/governance | `docs(git): agregar estrategia de branching` |
| `perf` | Mejoras de rendimiento | `perf(images): convertir a AVIF` |
| `chore` | Configuración, deps, tooling | `chore(deps): actualizar vite a 8.x` |

### Scopes Comunes
- `hero`, `nav`, `footer`, `card`, `tooltip`, `carousel` — componentes
- `tokens`, `brand` — design tokens
- `landing`, `report` — páginas
- `factory` — componentes Golden
- `deps`, `config` — infraestructura

---

## 3. Flujo de Trabajo Diario

### Para Diseñadores (Flujo Simplificado)

```bash
# 1. ANTES de empezar a trabajar — siempre actualizar
git pull origin main

# 2. Crear branch para tu feature
git checkout -b cliente/nombre-de-tu-cambio

# 3. Trabajar normalmente... editar archivos, ver en dev server

# 4. Guardar progreso (puedes hacer esto múltiples veces)
git add -A
git commit -m "style(hero): ajustar spacing del título"

# 5. Subir tu branch a GitHub
git push origin cliente/nombre-de-tu-cambio

# 6. Abrir Pull Request en GitHub
#    → Ve a github.com/MR-Thunderbolts/fabrica17
#    → GitHub te sugerirá crear un PR automáticamente
#    → Describe qué cambiaste y por qué

# 7. Después de que aprueben y mergeen tu PR:
git checkout main
git pull origin main
```

### Para Developers (Flujo Completo)

```bash
# 1. Actualizar main
git pull origin main

# 2. Crear branch según fase
git checkout -b factory/pricing-card    # Si es Factory Expansion
git checkout -b cliente/form-validation # Si es Client Assembly

# 3. Desarrollar + commits frecuentes
git add -A
git commit -m "feat(pricing-card): implementar variantes con slots"

# 4. Push + PR
git push origin factory/pricing-card

# 5. Post-merge: limpiar
git checkout main
git pull origin main
git branch -d factory/pricing-card
```

---

## 4. Pull Request — Checklist

Todo PR debe incluir:

- [ ] **Título** con formato Conventional Commit: `feat(scope): descripción`
- [ ] **Descripción** de qué se cambió y por qué
- [ ] **Screenshot** si hay cambios visuales (Vercel Preview genera URL automática)
- [ ] `bun run check` pasa sin errores (se validará automáticamente)
- [ ] No introduce dependencias externas prohibidas (ver AGENTS.md)

### Template de PR (sugerido)

```markdown
## ¿Qué cambió?
Breve descripción del cambio.

## ¿Por qué?
Contexto: ticket, feedback de cliente, decisión de diseño.

## Screenshot / Preview
[Vercel Preview: URL automática]

## Checklist
- [ ] `bun run check` pasa
- [ ] Revisé en mobile (375px)
- [ ] Los tokens usan custom properties existentes
```

---

## 5. Deploy Automático (Vercel)

| Evento | Acción de Vercel |
|:---|:---|
| Push a cualquier branch con PR abierto | **Preview Deploy** — URL única para revisar |
| Merge a `main` | **Production Deploy** — sitio en vivo se actualiza |
| Push directo a `main` (si ocurre) | Production Deploy inmediato ⚠️ |

### ¿Cómo aprovecharlo?
1. Cada PR genera un **Preview URL** automático
2. Comparte ese URL con el PM para aprobación visual
3. El PM revisa el Preview, aprueba el PR en GitHub
4. Al mergear → producción se actualiza sola

> **No necesitas hacer nada manual para deployar.** Vercel detecta cada push.

---

## 6. Resolución de Conflictos

Si GitHub dice que hay conflictos en tu PR:

```bash
# En tu branch de trabajo:
git checkout cliente/mi-feature
git pull origin main          # Trae los cambios de main
# Resolver conflictos manualmente en los archivos marcados
git add -A
git commit -m "fix: resolver conflictos con main"
git push origin cliente/mi-feature
```

### Regla de Conflictos
- **Si el conflicto es en `cliente/`** → el diseñador puede resolverlo
- **Si el conflicto es en `factory/`** → consultar con el dev lead
- **Si el conflicto es en `governance/`** → consultar con el PM/creador de la fábrica

---

## 7. Mapeo con Tiers de Gobernanza (AGENTS.md)

| Tier | Git Equivalent | Quién |
|:---|:---|:---|
| **Tier 1 — Autonomous** | Commits en branch `cliente/*` | Diseñadores y Devs libremente |
| **Tier 2 — Soft Approval** | PR de `factory/*` o `cliente/*` | Requiere 1 review |
| **Tier 3 — Strong Approval** | Merge a `main` | PR aprobado + checks verdes |
