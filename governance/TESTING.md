# TESTING.md — Validation Protocols

> **Status:** Active

## Validation & Performance Checks

### 🛑 REGLA DE AUTOEVALUACIÓN OBLIGATORIA (FEEDBACK LOOP)
Ningún Agente de IA puede dar una tarea de código por terminada sin antes ejecutar una prueba de humo.

**Condición de salida:** Si `bun run check` devuelve ERRORES (exit code > 0), el Agente NO DEBE avisar al usuario. Debe leer el error, corregir el archivo `.svelte` y volver a ejecutar el comando hasta que pase limpiamente.

Before marking any task as complete, AI Agents must run the following validation commands:

### 1. Type Checking & Svelte Sync
```bash
bun run check
```
*Requirement:* Must return 0 errors.

### 2. Library Build (Packaging)
```bash
bun run build:lib
```
*Requirement:* Must successfully generate `/dist` via `@sveltejs/package`.

### 3. Demo App SSG Build
```bash
bun run build
```
*Requirement:* Must compile the static site output. Bundle sizes < 50KB.

### 4. Code Quality Gates (Grep)
Ensure no legacy code exists:
```bash
grep -r "\$:" src/
grep -r "<slot" src/
grep -r "on:" src/
```
