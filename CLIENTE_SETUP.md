# Guía de Inicio: Nuevo Proyecto Cliente (Fábrica Base)

¡Bienvenido! Este repositorio fue creado a partir del template `fabrica17`. Sigue esta guía estructurada para adaptar la fábrica al branding de tu nuevo cliente y comenzar a construir sin tocar el core del sistema.

---

## 🚀 Paso 1: Inicialización Rápida

1. Asegúrate de tener **Bun** instalado (nuestro gestor de paquetes de alto rendimiento).
2. Instala las dependencias:
   ```bash
   bun install
   ```
3. Levanta el servidor de desarrollo:
   ```bash
   bun run dev
   ```

---

## 🎨 Paso 2: Personalizar el Branding (Tokens de Diseño)

La fábrica arranca en **escala de grises neutra**: el baseline completo (primitivas + semánticos, temas light/dark) vive en `utils/tokens.css` y **no se edita**. Toda la identidad del cliente se inyecta como *overrides* en `cliente/tokens.css`. **No edites estilos directamente en los componentes globales.**

1. Abre `cliente/tokens.css` (trae un ejemplo comentado).
2. Sobreescribe SOLO los tokens semánticos que la marca define, por ejemplo:
   - `--color-primary` / `--color-primary-hover` / `--color-primary-foreground`: el color insignia de tu cliente y su texto de contraste.
   - `--color-bg-deep`, `--color-bg-base`, `--color-surface-base`: fondos y superficies, si la marca no es neutra.
   - `--color-accent-primary`: acento secundario si existe.
3. Sobreescribe las variables tipográficas:
   - `--font-headline` y `--font-body`: fuentes de marca **self-hosted** (woff2 subset en `cliente/assets/fonts/`), nunca vía CDN.
4. Si la marca requiere otras esquinas de botón o bordes:
   - Sobreescribe `--radius-sm/md/lg/full` según el spec de Figma.

> [!TIP]
> Para colores de marca saturados, calibra los valores `oklch(...)` siguiendo [governance/OKLCH_CALIBRATION.md](governance/OKLCH_CALIBRATION.md) (los grises del baseline no necesitan calibración).
> Si tienes `figma-tokens.json` extraído de Figma, `bun run tokens:sync` escribe los tokens mapeados automáticamente dentro del bloque FIGMA SYNC de `cliente/tokens.css`.

---

## 🏗️ Paso 3: Estructura del Proyecto

Esta es la separación de responsabilidades que debes mantener:

```
├── cliente/                ← 🔴 AQUÍ TRABAJAS TÚ (Específico del Cliente)
│   ├── assets/             ← Imágenes, logos y SVGs del cliente
│   ├── tokens.css          ← Paleta de colores e identidad de marca
│   └── [Componentes]       ← Tus secciones y vistas (ej. Hero, Metodos, etc.)
│
├── factory/                ← 🟢 CORE DE LA FÁBRICA (NO TOCAR)
│   ├── scripts/            ← Utilidades de automatización de la fábrica
│   └── templates/          ← Esquemas de inicio y documentación interna
│
├── governance/             ← 🟢 NORMAS Y REGLAS (LEER)
│   ├── ERROR_PATTERNS.md   ← Checklist para evitar fallos de compilación/diseño
│   └── BEST_PRACTICES.md   ← Guía de UI/UX premium y rendimiento
│
├── src/
│   └── routes/             ← 🟡 ENRUTADO (Solo para dar de alta páginas)
│       └── +page.svelte    ← Página de entrada. Llama a tus componentes de cliente
```

---

## 🛡️ Paso 4: Failsafes y Aseguramiento de Calidad

Antes de hacer cualquier commit o mandar a producción, ejecuta los verificadores automáticos:

1. **Chequeo completo** (tipos Svelte/TS + gates de arquitectura + paridad de tokens):
   ```bash
   bun run check
   ```
2. **Build de Producción Estático**:
   ```bash
   bun run build
   ```

Si alguno de estos comandos falla, consulta [governance/ERROR_PATTERNS.md](governance/ERROR_PATTERNS.md) para identificar la solución rápida antes de frustrarte.

---

## 💡 Reglas de Oro de la Agencia

* **Cero Placeholders**: Todos los elementos interactivos deben tener estados de carga (`SkeletonCard`, overlays o micro-animaciones).
* **Consistencia Extrema**: Los botones deben usar consistentemente `var(--radius-full)` o el radio de marca acordado. Nunca uses píxeles fijos como `border-radius: 12px` de forma ad-hoc.
* **Efectos Semánticos**: Si implementas fondos con gradientes de brillo (glow effects), defínelos como tokens semánticos en `cliente/tokens.css` (ej. `--glow-primary`) — nunca gradientes ad-hoc repetidos por componente.
