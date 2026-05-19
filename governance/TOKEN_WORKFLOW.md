# Workflow: Design Token Verification & Sync

This workflow ensures that the **Fábrica Base** design system remains perfectly synchronized with the Figma source of truth.

## 1. The "Parity Check" Prompt
Copy and paste this prompt when you want the AI to verify tokens:

> **AI Instruction:**
> 1. Run `mcp_FigmaDesktop_get_variable_defs` on the active Figma selection.
> 2. Compare the output against `figma-tokens.json`.
> 3. Identify any mismatches in:
>    - Hex values (colors)
>    - Numeric values (radius, spacing)
>    - Font families
> 4. If mismatches exist:
>    - Update `figma-tokens.json`.
>    - Run `bun run scripts/sync-tokens.ts`.
>    - Report exactly what changed.

## 2. Automated Validation Script
We can use a script to automate the comparison if the JSON structure becomes complex.

### `scripts/verify-tokens.ts` (Planned)
```typescript
// Proposed logic:
// 1. Fetch live variables via MCP Tool (simulated or direct API)
// 2. Diff against local figma-tokens.json
// 3. Exit with error if delta > 0
```

## 3. Best Practices
- **Atomic Selection**: Always select the **Root Frame** of a screen or the **Local Variables** panel in Figma before running the check.
- **CamelCase Mapping**: Ensure Figma variable names are mapped correctly in `scripts/sync-tokens.ts`.
- **Green Coding Check**: Verify that new tokens don't introduce heavy external assets (like new font weights).

## 4. Current Token Map
| Figma Variable | CSS Variable | Purpose |
|---|---|---|
| `general/primary` | `--color-primary` | Main brand color |
| `general/foreground` | `--color-text-primary` | Main text color |
| `radius` | `--radius-md` | Base corner radius |
