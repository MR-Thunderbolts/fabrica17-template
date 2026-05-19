# Fábrica Base — Atomic Component Factory (Svelte 5)

> **Fábrica Base** is a high-performance, atomic component library built with Svelte 5. It serves as a "Pure Seed" for building scalable, green-coding-compliant design systems.

## 🧬 Architectural Philosophy

This repository is built on a **"maximal-molecule, inline-organism"** philosophy:
1.  **Atoms & Molecules** live in the `/factory/` core. They are headless, agnostic, and feature-maximal.
2.  **Organisms** (Heros, Footers, Cards) are composed inline by agents at assembly time to ensure zero "Identity Debt."
3.  **Identity Injection**: Visual DNA is injected via `utils/client-brand.css`, keeping the component logic pure and daltonic.

## 🛠️ Project Structure

*   **`/factory/`**: The core Atomic Design System.
    *   `/src/lib/components/`: Atoms (primitives) and Molecules (compounds).
    *   `/assets/icons/`: Internal 1500+ icon collection (Phosphor). Use via `virtual:icons/factory/[name]`.
*   **`/governance/`**: "Steel Rails" for AI and Humans. Architecture, Style, and Green Coding rules.
*   **`/utils/`**: Identity bridge (CSS tokens, navigation config, theme settings).
*   **`FABRICA_STATE_PLAYBOOK.md`**: The living memory and correction log of the factory state.

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
Before contributing, you are **OBLIGATED** to read the `governance/` directory and the `FABRICA_STATE_PLAYBOOK.md`. Strictly follow the **Atomic Evolution** protocol (organisms are composed, not stored).
