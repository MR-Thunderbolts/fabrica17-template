# Fábrica17 - Procedimiento de Cierre de Sesión (SOP)

Este documento establece el estándar para finalizar exitosamente una sesión de trabajo en el proyecto Fábrica17. Su objetivo es garantizar la calidad del código, la sincronización con el sistema de diseño y la continuidad fluida entre sesiones.

## Pasos para Finalizar la Sesión

Al terminar un bloque de trabajo, el agente y el desarrollador deben ejecutar obligatoriamente los siguientes pasos:

### 1. Auditoría de Código y Build
- **Ejecutar Build de Producción:** Correr `bun run build` para asegurar que el adaptador estático (SSG) no tenga enlaces rotos (ej. `#href` inválidos) ni dependencias circulares.
- **A11y Check:** Verificar que Svelte Check (`vite-plugin-svelte`) indique **cero warnings de accesibilidad** (ej. elementos interactivos sin teclado o `tabindex`).
- **Limpieza de Consola:** Remover `console.log` residuales de pruebas de API o interactividad.

### 2. Verificación de Regresiones Visuales (Layout & Tokens)
- **Token Check:** Asegurarse de que no queden valores "quemados" (`hardcoded`) en pixeles para colores, topografías o espaciados importantes. Todo debe usar `var(--...)`.
- **Z-Index y Stacking Contexts:** Comprobar que los "glows" y fondos absolutos no interfieran con las capas superiores (leer sección de mejores prácticas).
- **Responsividad:** Verificar que los nuevos componentes usen `max-width: var(--content-max)` dentro de `.container` y no directamente en las etiquetas `<section>` de fondo completo (full-bleed).

### 3. Generación del Reporte de Cierre (Session Report)
Crear un resumen para dejar trazabilidad del estado actual del proyecto. (El formato se detalla más abajo).

---

## Patrones de Error Identificados y Mejores Prácticas (Aprendizajes Recientes)

Durante el desarrollo de la Landing Page, documentamos las siguientes fricciones críticas:

### Error Patrón 1: Clipping Geométrico por Z-Index en Glows
*   **Síntoma:** Un `radial-gradient` (glow) diseñado para iluminar entre dos secciones se ve "cortado" por una línea recta horizontal.
*   **Causa:** La sección inferior (que contiene el glow absoluto) carece de fondo y se renderiza _encima_ de la sección superior porque está después en el DOM. Al "subir" el glow con top negativo (`top: -150px`), este choca con su propio contenedor posicionado relativo, o se superpone a elementos que tienen su propio color de fondo estático.
*   **Mejor Práctica (Solución):** 
    1. Quitar el color de fondo opaco (`background: var(--color-audit-surface)`) de las etiquetas `<section>` involucradas, pasándolo a `transparent`.
    2. Dejar que el contenedor global (ej. `page-landing`) dicte el color oscuro unificado (`#141827`).
    3. Asignar explícitamente jerarquía con `z-index` (Ej. Sección superior `z-index: 10`, Sección inferior con glow `z-index: 5`) para que el contenido siempre pinte por encima del brillo, logrando que este último se difumine armónicamente.

### Error Patrón 3: OKLCH P3 Gamut Amplification
*   **Síntoma:** Un color de marca (botón, badge, texto accent) se ve más saturado/vivo en el browser que en Figma.
*   **Causa:** Los navegadores modernos en Mac/iPhone renderizan OKLCH en el gamut P3 (wide color). Al convertir matemáticamente un hexadecimal a OKLCH sin ajuste, la chroma se amplifica en la pantalla.
*   **Mejor Práctica (Solución):**
    1. Para colores **visibles de marca** (primary, accent), reducir el valor de chroma OKLCH en ~30% respecto a la conversión directa.
    2. Para **superficies, fondos y neutrals**, la conversión directa es aceptable (son sutiles, la amplificación es imperceptible).
    3. Documentar el ajuste con un comentario inline: `/* Calibrado: P3 match para #HEXVAL */`.
    4. Ver proceso completo en `governance/OKLCH_CALIBRATION.md`.

### Error Patrón 2: Layouts Rígidos vs. Figma "Responsive Modes"
*   **Síntoma:** El desarrollador crea componentes `min-height` restrictivos, provocando distorsión en tarjetas o contenedores flex/grid cuando el contenido cambia.
*   **Causa:** Intentar igualar un prototipo de Figma que usa anchos y altos en píxeles fijos, en lugar de priorizar el "Fluid Design".
*   **Mejor Práctica (Solución):** Reemplazar altos fijos por `min-height`, implementar `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` cuando sea posible, y utilizar siempre `clamp()` para tipografías y paddings. En Figma, las escalas tipográficas abstractas (`text-xl`) previenen confusiones respecto a las etiquetas semánticas (`h1`).

---

## Reporte de Cierre de Sesión (Template)

**Fecha/Hora:** 2026-05-18
**Módulo Trabajado:** Landing Page (Reporte de Auditoría UI)

**1. Logros Alcanzados:**
*   Se corrigió el layout de las tarjetas en la sección "Te Suena Familiar" (LandingPainPoints) para calcarlas 1:1 al diseño original (3 columnas simétricas en Desktop).
*   Se resolvió el error visual de clipping horizontal entre las secciones "Pain Points" y "Oferta" ajustando las capas de contexto (Z-Index y fondos transparentes).
*   Se refinaron tokens tipográficos, áreas clickeables y botones interactivos para accesibilidad.
*   Se logró un build SSG (`bun run build`) con 0 advertencias de accesibilidad tras implementar controles de teclado (Escape) en modales.

**2. Estado del Código:**
*   [x] SSR Build Exitoso
*   [x] 0 A11y Warnings
*   [x] Tokens sincronizados

**3. Pendientes (Next Steps para la próxima sesión):**
*   Continuar con la integración del backend (API wiring) para que los formularios de calculadora persistan datos en base de datos de manera asíncrona.
*   Implementar el manejo de estados de error de red (loading/success/failure) en la interacción del QuoteForm.
