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

Toda la identidad del cliente reside en el archivo de tokens. **No edites estilos directamente en los componentes globales.**

1. Abre `cliente/tokens.css`.
2. Modifica las variables de color del **Brand Palette**:
   - `--color-primary`: El color insignia de tu cliente (ej. un verde menta, naranja, violeta).
   - `--color-bg-deep`: Color de fondo base para secciones oscuras (ej. `#0c0f1a`).
   - `--color-bg-base`: Color de fondo intermedio (ej. `#141827`).
   - `--color-surface-base`: Color para tarjetas y contenedores elevados (ej. `#191e31`).
3. Modifica las variables tipográficas:
   - `--font-sans`: Define la tipografía base de marca (ej. `'Inter', sans-serif`).
4. Si la marca requiere otras esquinas de botón o bordes:
   - Modifica `--radius-full` o los radios base.

> [!TIP]
> Si deseas aprovechar las capacidades modernas de renderizado de color, calibra los valores `oklch(...)` en la sección `@supports (color: oklch(...))` al final de `tokens.css`.

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

1. **Chequeo de Integridad de la Fábrica**:
   ```bash
   bun run check:factory
   ```
2. **Chequeo de Tipos de Svelte/TypeScript**:
   ```bash
   bun run check
   ```
3. **Build de Producción Estático**:
   ```bash
   bun run build
   ```

Si alguno de estos comandos falla, consulta [governance/ERROR_PATTERNS.md](file:///Users/amarolatoja/Proyectos/Ciclo17/fabrica17/governance/ERROR_PATTERNS.md) para identificar la solución rápida antes de frustrarte.

---

## 💡 Reglas de Oro de la Agencia

* **Cero Placeholders**: Todos los elementos interactivos deben tener estados de carga (`SkeletonCard`, overlays o micro-animaciones).
* **Consistencia Extrema**: Los botones deben usar consistentemente `var(--radius-full)` o el radio de marca acordado. Nunca uses píxeles fijos como `border-radius: 12px` de forma ad-hoc.
* **Glow Premium**: Si implementas fondos con gradientes de brillo (glow effects), hazlo con los tokens `--glow-purple` y `--glow-blue` definidos semánticamente para mantener armonía visual.
