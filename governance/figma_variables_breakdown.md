# Estructura de Variables en Figma vs. Fábrica17

A continuación, te entrego los dos análisis solicitados: primero cómo *debería* estar estructurado para tener una paridad 1:1 con el código actual (Svelte 5 + `tokens.css`), y luego un desglose de cómo está tu configuración actual según las capturas.

---

## 1. Estructura Ideal (El Flujo de la Fábrica)

Para que el diseño en Figma se traduzca de manera impecable y directa a nuestro archivo `tokens.css` (Green-coding & Fluid Design), la estructura de colecciones debería simplificarse y enfocarse en escalas fluidas y tokens semánticos:

### Colección 1: Primitives (Equivalente a tu "Brand")
Valores absolutos y crudos. Nunca se aplican directamente a los componentes.
*   **Colors**: Nombres crudos de colores en base a la paleta del proyecto (Ej: `Purple-300`, `Lime-500`, `Deep-Blue-900`).
*   **Spacing Base**: Valores fijos en pixeles para la grilla menor (`4`, `8`, `12`, `16`, `24`, `32`...).
*   **Radii**: Valores crudos (`6`, `12`, `20`, `28`, `9999`).

### Colección 2: Semantic & Layout (Equivalente a tu "Mapped / Alias")
Esta es la capa que los diseñadores **sí deben usar**. Mapean a la Colección 1 y coinciden exactamente con los nombres de variables en el CSS.
*   **Brand Palette**: 
    *   `color-primary` (Apunta a Purple-300)
    *   `color-audit-surface` (Apunta a Deep-Blue-900)
    *   `color-audit-accent` (Apunta a Lime-500)
    *   `color-card-green-1`, `color-card-purple`, etc.
*   **Text Colors**: `color-text-primary`, `color-text-muted`, `color-audit-fg`.
*   **Borders**: `color-border-card`, `color-border-outline`.
*   **Border Radius**: `radius-sm`, `radius-base`, `radius-lg`, `radius-full`.

### Colección 3: Fluid Typography & Spacing (Reemplaza a tu "Responsive")
En nuestro código, **no usamos breakpoints rígidos (Desktop vs Mobile)** para el tamaño de fuente. Usamos funciones `clamp()` de CSS para que el texto crezca fluidamente con la pantalla. Como Figma aún no soporta `clamp()` nativamente en las variables, la mejor forma de representarlo es usar **modos (Desktop/Mobile)** pero usando la **escala semántica de tokens** en los nombres, no nombres de etiquetas HTML (`h1`, `h2`):
*   **Text Scale (Nombres en Figma)**: 
    *   `text-xs` (Desktop: 12, Mobile: 11)
    *   `text-sm` (Desktop: 14, Mobile: 12)
    *   `text-base` (Desktop: 16, Mobile: 16)
    *   `text-lg` (Desktop: 20, Mobile: 16)
    *   `text-xl` (Desktop: 24, Mobile: 19)
    *   `text-2xl` (Desktop: 40, Mobile: 24)
    *   `text-3xl` (Desktop: 48, Mobile: 32)
    *   `text-hero` (Desktop: 80, Mobile: 60)
*   **Fluid Layout**:
    *   `gutter` (Desktop: 156, Mobile: 20) -> Mapea a `--gutter` en CSS.
    *   `section-pad-lg` (Desktop: 96, Mobile: 72) -> Mapea a `--section-pad-lg`.

---

## 2. Análisis de tu Configuración Actual

Tu configuración actual tiene una arquitectura de sistema de diseño **muy avanzada y de estándar corporativo** (arquitectura de 3 niveles: Primitives -> Semantic -> Component). Sin embargo, tiene algunas fricciones menores con el enfoque "ligero/fluido" de este proyecto en particular.

### Lo que está excelente:
1.  **Colección Brand (Primitives):** Tienes bien separados tus valores fundacionales (Rosa suave, Limon, Gris).
2.  **Colección Alias (Semantic):** Traduces muy bien los primitivos a roles (Primary, Accent, Neutral).
3.  **Colección Mapped (Contextual):** Mapear `Surface/Action` a `Primary/Default` es una excelente práctica para componentes gigantes, permite crear temas oscuros/claros de forma muy sencilla.

### Fricciones con la Fábrica (Puntos de mejora):
1.  **Colección Responsive - Nomenclatura de Tipografía:** 
    *   *Actual:* Nombra las variables de texto como etiquetas semánticas HTML (`h1`, `h2`, `body lg`). 
    *   *Problema:* En la web moderna, una etiqueta `<h1>` podría verse pequeña en un contexto, y un `<h2>` podría ser gigante en otro. 
    *   *Solución:* Cambiar los nombres de `h1`, `h2` a escalas abstractas basadas en tallas (T-shirt sizing): `text-3xl`, `text-2xl`, `text-base`. Esto calza 1:1 con las clases y variables CSS (`var(--text-2xl)`).
2.  **Exceso de Profundidad en Mapped:**
    *   *Actual:* Tienes tokens a nivel de componente (`Surface/Action-hover`, `Tag-bg`, `Badge-bg`).
    *   *Problema:* En un sistema de alto rendimiento como Ciclo17, intentamos mantener el CSS lo más pequeño posible. Si cada componente tiene su propia variable, el archivo CSS crece.
    *   *Solución:* Reutilizar los tokens semánticos (Alias). En lugar de usar un token especial `Tag-bg`, en el código directamente le asignamos a ese tag el color `color-card-green-1` o `color-surface-tag`.
3.  **Falta de Gutter / Section Padding fluido:**
    *   *Actual:* No veo variables que controlen el espaciado horizontal de los bordes (margins/gutters) ni el padding vertical de las secciones entre Desktop y Mobile.
    *   *Solución:* Agregar tokens como `Layout/gutter` y `Layout/section-pad` en tu colección "Responsive", para que los diseñadores no pongan anchos de frame arbitrarios, sino que respeten el grid.
