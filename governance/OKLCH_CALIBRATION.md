# OKLCH Calibration — Fábrica17 Color Protocol

> **Por qué existe este documento**: Los navegadores modernos (Safari, Chrome en Mac) pueden renderizar colores OKLCH en el gamut P3 — un espacio de color más amplio que sRGB. Esto hace que la misma chroma en OKLCH *se vea más saturada* en pantallas P3 de lo que se ve el hexadecimal equivalente en sRGB. Si usamos valores OKLCH sin calibrar, los botones de la UI se ven más vivos/neón que el color de marca original.

---

## 🔒 Regla de Autoría: Hex es la fuente de verdad, OKLCH es fallback/enhancement

> Confirmado por el equipo (2026-07-20): **Figma no maneja valores OKLCH.** Los diseñadores trabajan y exportan en hex/sRGB, y `figma-tokens.json` (vía `get_variable_defs`) solo entrega hex. Por lo tanto:

1. **Todo token de color se autora primero en hex**, en `:root` (`utils/tokens.css` para el baseline, `cliente/tokens.css` para overrides de marca). Este es el valor que `tokens:sync` escribe desde Figma y el que corre por defecto en cualquier navegador.
2. **OKLCH nunca es el valor primario/único de un token.** Solo se agrega como segunda capa dentro de un bloque `@supports (color: oklch(...))` que sobreescribe el hex en navegadores compatibles con P3. Si un agente escribe `--color-x: oklch(...)` como única declaración de un token (fuera de `@supports`), es una violación de esta regla — no hay forma de sincronizarlo de vuelta con Figma.
3. **Lectura correcta de "fallback":** el hex en `:root` es el fallback real (lo que ve cualquier navegador sin soporte P3, y lo que coincide 1:1 con el Figma-spec); el bloque `@supports` es la mejora progresiva opcional. No al revés.
4. Consecuencia práctica: **ante cualquier duda o falta de tiempo para calibrar, es válido no definir el override OKLCH de un token** (dejar que el navegador use el hex) — nunca al revés (nunca dejar un token solo en OKLCH sin su hex base). Ver la tabla de la sección siguiente: los tokens `--color-primary` y `--color-primary-hover` del caso trabajado deliberadamente NO tienen entrada en `@supports` por esta misma razón.

---

## El Problema

```
Figma (P3 nativo) → exporta #D790F0 en sRGB
↓
Si en CSS ponemos: oklch(0.75 0.14 310)  ← conversión matemática exacta
↓
El navegador P3 lo renderiza MÁS SATURADO que el #D790F0 original
↓
Inconsistencia: botón se ve diferente al Figma-spec
```

---

## La Solución: Calibración por Reducción de Chroma

En pantallas P3, la chroma OKLCH se amplifica. Para que el color *se vea igual* al hexadecimal en sRGB, hay que **reducir el chroma** en el bloque `@supports`.

**Regla empírica para esta marca:**
- Colores oscuros/superficies → conversión matemática directa (sin penalización, son sutiles)
- Colores de marca visibles (accents, primary) → reducir chroma en **~30%**

---

## Baseline de la Fábrica: sin calibración necesaria

El baseline de `utils/tokens.css` es **acromático** (`oklch(L 0 0)`, chroma 0): los grises no sufren amplificación P3, por lo que el bloque `@supports` del baseline usa conversión directa sin ajustes. **La calibración aplica cuando se inyecta la marca del cliente** (`cliente/tokens.css`) con colores saturados.

### Ejemplo trabajado (caso real de un proyecto de cliente)

| Token | Hex (sRGB base) | Estrategia OKLCH | Nota |
|---|---|---|---|
| Accent lima | `#D6F47A` | `oklch(0.92 0.16 125)` ← definido | Requería ajuste: la conversión directa (~0.15 H115) daba verde amarillento. Hue corregido a 125. |
| Primary violeta | `#D790F0` | **No definido en `@supports`** | El browser hace mapeo sRGB→P3 nativo que coincide con Figma. Cualquier valor OKLCH resulta en mismatch perceptual. |
| Primary hover | `#DFA6F3` | **No definido en `@supports`** | Misma razón que primary. |

> **Regla derivada de la experiencia**: Para colores donde el mapeo nativo del browser coincide con Figma, **no definir OKLCH**. Solo definir OKLCH cuando la conversión directa produce un resultado visualmente incorrecto y se puede ajustar con certeza.

---

## Proceso de Calibración para Nuevos Colores

Cuando se agrega un nuevo color de marca al bloque `@supports (color: oklch(...))`:

### Paso 1: Conversión inicial
Usa una herramienta para convertir el hexadecimal a OKLCH:
- [oklch.com](https://oklch.com) — recomendado
- [CSS Gradient OKLCH](https://www.csscolorconverter.com)

### Paso 2: Clasificar el token
| Tipo de token | Acción |
|---|---|
| Superficies, fondos, textos | Usar conversión directa sin ajuste |
| Colores de marca visibles en botones, badges, glows | Aplicar calibración |

### Paso 3: Aplicar calibración para colores de marca
Si la conversión da `oklch(L C H)`:
- Mantener L y H sin cambio
- Reducir C en ~30% para compensar amplificación P3

```
oklch(L  C       H)  ← conversión directa
oklch(L  C×0.70  H)  ← calibrado para P3
```

### Paso 4: Documentar en el token
Agregar comentario inline explicando la calibración:
```css
--color-primary: oklch(0.76 0.10 310); /* Calibrado: P3 match para #D790F0 — chroma ↓0.14→0.10 */
```

### Paso 5: Verificación visual
Comparar side-by-side en navegador vs. Figma:
1. Abrir Figma con el frame de referencia
2. Abrir el sitio local en safari/chrome
3. Captura + superposición para comparar la saturación del color

---

## Anti-patrones a Evitar

```css
/* ❌ MAL: conversión matemática sin calibrar para color de marca */
--color-primary: oklch(0.75 0.14 310);

/* ✅ BIEN: calibrado con chroma reducido + comentario */
--color-primary: oklch(0.76 0.10 310); /* Calibrado: P3 match para #D790F0 */
```

```css
/* ❌ MAL: eliminar el bloque @supports completo por el problema */
/* (pierde la mejora de gamut para superficies y neutrals) */

/* ✅ BIEN: mantener @supports, calibrar individualmente cada color de marca */
@supports (color: oklch(0.5 0.1 0)) {
  :root {
    --color-audit-bg: oklch(...);     /* conversión directa: OK */
    --color-primary:  oklch(...);     /* calibrado: chroma reducido */
  }
}
```

---

## Integración en el Flujo de Trabajo

Este proceso debe ejecutarse **cada vez que**:
1. Se agrega un nuevo token de color de marca (primary, secondary, accent)
2. Se actualiza un color en Figma y se sincroniza al CSS
3. Se detecta una discrepancia visual entre el diseño en Figma y el renderizado en browser

**Responsable de verificación**: El agente AI debe aplicar calibración proactivamente al escribir valores OKLCH para colores visibles de marca. No es opcional.
