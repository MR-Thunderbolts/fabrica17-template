# Fábrica17 — Atomic Component Factory (Svelte 5)

> **Fábrica17** is a high-performance, atomic component library built with Svelte 5. It serves as a "Pure Seed" for building scalable, green-coding-compliant design systems.

## 🧬 Architectural Philosophy

This repository is built on a **"maximal-molecule, inline-organism"** philosophy:
1.  **Atoms & Molecules** live in the `/factory/` core. They are headless, agnostic, and feature-maximal.
2.  **Organisms** (Heros, Footers, Cards) are composed inline by agents at assembly time to ensure zero "Identity Debt."
3.  **Grayscale by Default**: the baseline design system (`utils/tokens.css`) is 100% neutral grayscale with light/dark themes. Zero brand color ships with the factory.
4.  **Identity Injection**: the client's Visual DNA is injected via `cliente/tokens.css` (semantic token overrides only), keeping the component logic pure and daltonic.

## 🛠️ Project Structure

*   **`/factory/`**: The core Atomic Design System.
    *   `/src/lib/components/`: Atoms (primitives) and Molecules (compounds).
    *   `/scripts/`: Factory tooling (token sync, architecture & token gates, template cleaner).
*   **`/governance/`**: "Steel Rails" for AI and Humans. Architecture, Style, and Green Coding rules.
    *   `/skills/`: Design & engineering skill docs for agents (critique, polish, layout, …).
    *   `DESIGN.md`: Token specification (primitives → semantic → components).
    *   `FABRICA_STATE_PLAYBOOK.md`: The living memory and correction log of the factory state.
    *   `DECOUPLING_GUIDE.md`: **Launch Ready Protocol** — strip the factory infra before shipping a client site.
*   **`/utils/`**: Factory baseline (grayscale tokens, global shell CSS, navigation config, theme settings).
*   **`/cliente/`**: Client workspace — brand tokens (`tokens.css`), assets, and client-specific components.

## 🎨 Icons

Icons load on-demand from npm via `unplugin-icons` (`~icons/<set>/<name>`). Authorized sets: **MynaUI** (`~icons/mynaui/*`, default), **Lucide** (`~icons/lucide/*`), **Material Symbols** (`~icons/material-symbols/*`). Other Iconify sets (e.g. Phosphor `~icons/ph/*`) may be added when a client project requires them.

## 🚀 Key Commands

```bash
# Validate Svelte 5 syntax and types
bun run check

# Start development environment
bun run dev

# Build for distribution
bun run build:lib
```

## 🤖 For AI Agents
Before contributing, you are **OBLIGATED** to read the `governance/` directory and `governance/FABRICA_STATE_PLAYBOOK.md`. Strictly follow the **Atomic Evolution** protocol (organisms are composed, not stored).
