# Fábrica Base × Figma — Estado del proyecto, mejoras y cómo trabajar bien con Figma

> Documento de equipo · 2026-07-08 · Caso de estudio: GreenMIP (primer cliente real sobre el template)

---

## Resumen ejecutivo

La Fábrica Base (el template que reemplazó a la landing de Ciclo17 como punto de partida de
cada proyecto nuevo) pasó su primera prueba real con GreenMIP. La arquitectura de tres capas
(`factory/` core intocable, `cliente/` lo específico, `governance/` las reglas) funcionó: las
11 secciones de GreenMIP se construyeron sin tocar el core.

Pero el test también dejó algo claro: **quedaban restos de marca del cliente anterior
(Ciclo17) dentro del template** — logo, paleta, textos — escondidos en los lugares que nadie
revisa a simple vista (estados de carga, página de error, scripts de tooling). Ya están
corregidos. Este documento explica qué se encontró, qué se arregló, y — la parte que nos
interesa hacia adelante — **cómo trabajar con el Figma MCP para que cada próximo cliente tenga
más fidelidad y menos retrabajo que GreenMIP.**

---

## 1. Qué es hoy la Fábrica Base

| Capa | Contenido | Regla |
|---|---|---|
| `factory/` | Componentes compuestos genéricos (Button, Card, Navbar, Section, Carousel…) | Solo lectura para ensambladores de cliente |
| `cliente/` | Todo lo específico del cliente activo: secciones, assets, `tokens.css` | Aquí se trabaja siempre |
| `governance/` | Reglas de Svelte 5, estilo, green coding, workflow de tokens | Se lee antes de codear |

El flujo estándar: duplicar el template → `cliente/tokens.css` con la marca del nuevo cliente →
construir secciones en `cliente/` reusando componentes de `factory/` → al cerrar el proyecto,
`bun run clean:template` regenera un template limpio para el siguiente cliente.

---

## 2. Qué encontramos: fugas de marca del cliente anterior

Durante la prueba de GreenMIP aparecieron referencias a Ciclo17 que no deberían estar en un
template genérico. La causa raíz en todos los casos es la misma: **la marca no vive solo en
`tokens.css`, vive en cualquier archivo con un valor hardcodeado** — y esos archivos rara vez
se abren durante el desarrollo normal.

| # | Dónde | Qué pasaba |
|---|---|---|
| 1 | `PageLoadingOverlay.svelte` | Importaba el logo de Ciclo17 hardcodeado — el overlay de carga de GreenMIP mostraba el logo de la agencia. Solo visible al **navegar entre rutas**, invisible en una revisión estática de la página. |
| 2 | `+error.svelte` (página de error) | Usaba la paleta de "audit" de Ciclo17 (fondo azul oscuro, acento lima) vía fallbacks de variables que ya no existían. |
| 3 | `utils/client-brand.css` | Congelado con la marca de Ciclo17 (color Eucalyptus, tipografía Space Grotesk) en vez de ser un placeholder neutro. |
| 4 | `scripts/clean-template.ts` | Tenía **la lista de archivos del cliente anterior** hardcodeada. Correrlo hoy no habría limpiado GreenMIP — habría dejado sus componentes intactos y sobreescrito la demo con vars CSS inexistentes. |
| 5 | Documentación | Rutas de archivo absolutas a otro repo, comando `check:factory` que ya no existe. |

**La lección que nos llevamos:** el punto #4 es el más importante — un script de limpieza que
asume "el cliente de hoy" en vez de generalizar, se rompe silenciosamente en cada ciclo. Ya está
corregido: ahora el script declara el **núcleo genérico a conservar** y borra todo lo demás,
sin importar qué cliente sea.

---

## 3. Qué se corrigió (2026-07-08)

- ✅ `PageLoadingOverlay` recibe el logo como prop, con un fallback neutro si no se pasa ninguno.
- ✅ `+error.svelte` migrado a los tokens de marca vigentes del cliente activo.
- ✅ `client-brand.css` neutralizado y documentado como destino del pipeline `tokens:sync`.
- ✅ `clean-template.ts` generalizado — funciona para cualquier cliente, no solo para el anterior.
- ✅ `governance/integrity_check.ts` ahora también valida `cliente/tokens.css` (el archivo de
  marca que realmente se usa en runtime).
- ✅ Documentación con links relativos y comandos reales.
- ✅ Build y check de integridad verificados de punta a punta tras la limpieza.

El crédito "Sitio desarrollado por Ciclo17.cl" en el footer se mantuvo — es atribución de
agencia intencional, no una fuga.

---

## 4. Cómo trabajar bien con Figma (para que esto no vuelva a pasar)

### 4.1 El error más caro: pedir "toda la página" de una sola vez

El patrón que más baja la fidelidad es implementar un diseño completo en una sola pasada. El
MCP de Figma rinde mucho mejor con **llamadas pequeñas, por sección, en orden fijo**:

```
0. Tokens primero → get_variable_defs → cliente/tokens.css (UNA vez por proyecto)
1. Inventario → get_metadata del frame raíz → plan de secciones
2. Por sección → get_design_context + get_screenshot del NODO, no de la página
3. Assets → download_assets → cliente/assets/ (se descargan, no se recrean a mano)
4. Verificación → screenshot local vs screenshot de Figma, sección por sección
```

### 4.2 El "contrato de diseño" — responsabilidad del lado Figma

Para que el paso 2 funcione con fidelidad, el archivo de Figma tiene que cumplir un mínimo:

- **Auto Layout en todo.** Un frame sin Auto Layout se traduce a posiciones absolutas y rompe
  el responsive apenas cambia el viewport.
- **Variables de Figma para color, tipografía, radio y spacing.** Un fill hardcodeado es un
  token que el pipeline de sync nunca va a ver.
- **Frames de sección nombrados igual que el componente destino.** El nombre del frame *es* el
  contrato: `HeroSection` en Figma se traduce a `cliente/HeroSection.svelte`. Un frame llamado
  `Frame 42` obliga a adivinar.
- **Componentes de Figma para elementos que se repiten** (cards, badges, ítems de lista) — son
  lo único que se puede mapear con Code Connect (ver 4.3).

### 4.3 Code Connect: la palanca de mayor impacto

Mapear los componentes de `factory/` (Button, Section, Navbar, Card, BadgePill…) a sus
equivalentes en Figma es la mejora individual que más sube la fidelidad: una vez mapeado, el
MCP devuelve *nuestros* componentes reales en vez de divs genéricos que hay que reinterpretar
a mano. Se hace una vez por librería de componentes y se reutiliza en todos los clientes.

### 4.4 Gates automáticos en el repo

- Cero hex hardcodeado en `cliente/` — todo vía `var(--token)`.
- `bun governance/integrity_check.ts && bun run check && bun run build` antes de cada commit.
- (Propuesto) Un hook que grepee el nombre/paleta del cliente *anterior* antes de cada commit,
  para que el error de esta sesión no se repita silenciosamente.

---

## 5. Nueva herramienta: skill `/figma-seccion`

Para que el pipeline de la sección 4.1 no dependa de acordarse de los pasos cada vez, se creó
una **skill** — un archivo `SKILL.md` con instrucciones que el agente sigue automáticamente
cuando se invoca `/figma-seccion` o cuando detecta que la tarea calza con su descripción.

- **Input:** una URL de Figma apuntando a un frame/nodo concreto (una sección, no la página
  completa ni el archivo entero).
- **Qué hace:** ejecuta el pipeline completo — verifica tokens, inventario del nodo, contexto
  de diseño + screenshot de verdad, descarga de assets, implementación con reglas no
  negociables (cero hex, Svelte 5 runes-only, no tocar `factory/`), y una verificación final
  contra el screenshot original.
- **Por qué importa:** saca la variabilidad humana del prompt. Antes, la fidelidad dependía de
  cómo cada persona pedía la implementación; ahora el procedimiento es el mismo sin importar
  quién lo invoque.
- **Cómo se usa:** `/figma-seccion <url-del-frame-en-figma>`

### 5.1 Qué debe hacer el equipo para tener la skill disponible

**"Agent Skills" es un estándar abierto** — una carpeta con un `SKILL.md` (frontmatter `name` +
`description`) — pero **cada herramienta busca esa carpeta en un lugar distinto**. Por eso el
mismo archivo existe hoy en tres ubicaciones:

| Ubicación | Herramienta | Alcance | ¿Qué hace falta para tenerla? |
|---|---|---|---|
| `.claude/skills/figma-seccion/` | Claude Code | Solo este repo | Nada — viaja con `git pull`. Al abrir este repo con Claude Code, la skill ya aparece. |
| `.agents/skills/figma-seccion/` | Antigravity | Solo este repo | Nada — viaja con `git pull` (es un symlink al archivo de `.claude/skills/`, una sola fuente de verdad). |
| `~/.gemini/config/skills/figma-seccion/` | Antigravity | **Todos** tus proyectos, no solo este repo | Instalación manual por persona (paso a paso abajo) — es una carpeta en tu `$HOME`, no viaja con el repo. |

**Para trabajar en este repo: no hay que instalar nada.** Cualquiera del equipo que clone/actualice
GreenMip y abra el proyecto con Claude Code o con Antigravity va a poder escribir
`/figma-seccion` de inmediato. Si el editor no la detecta, recargar/reiniciar la sesión del
agente suele bastar (ambas herramientas leen las skills al iniciar la sesión, no en caliente).

**Para tenerla disponible en cualquier otro proyecto (opcional, por persona):**

- **Antigravity — instalación global:**
  ```bash
  mkdir -p ~/.gemini/config/skills/figma-seccion
  cp <ruta-al-repo>/GreenMip/.claude/skills/figma-seccion/SKILL.md \
     ~/.gemini/config/skills/figma-seccion/SKILL.md
  ```
  Ruta reconocida por las tres variantes (Antigravity, Antigravity CLI, Antigravity IDE).

- **Claude Code — instalación global (equivalente):**
  ```bash
  mkdir -p ~/.claude/skills/figma-seccion
  cp <ruta-al-repo>/GreenMip/.claude/skills/figma-seccion/SKILL.md \
     ~/.claude/skills/figma-seccion/SKILL.md
  ```

⚠️ **Ojo con las copias globales:** a diferencia de las del repo (symlink/git), estas son
copias sueltas en tu `$HOME`. Si la skill se actualiza en el repo, la copia global **no se
actualiza sola** — hay que repetir el `cp`. Para trabajar específicamente en GreenMip, usa
siempre la versión del repo (ya está resuelta); la global es solo para reusar el mismo
procedimiento en otros clientes/proyectos fuera de este repo.

---

## 6. Protocolo estándar para el próximo cliente

```
1. Duplicar template → bun install → bun run dev
2. Verificar el contrato de diseño en Figma (§4.2) — si falla, arreglar Figma ANTES de codear
3. get_variable_defs → cliente/tokens.css (manual o vía tokens:sync)
4. get_metadata del frame raíz → plan de secciones
5. Por cada sección: /figma-seccion <url-del-nodo>
6. Pre-flight: integrity_check + check + build + gate anti-fuga de marca
7. Al terminar el proyecto: bun run clean:template para dejar el template listo para el siguiente
```

---

## 7. Pendientes / próximos pasos

- [ ] Crear un `CLAUDE.md` raíz que cargue las reglas de `governance/` automáticamente en cada
  sesión (hoy solo se aplican si alguien se acuerda de citarlas).
- [ ] Configurar el hook anti-fuga de marca (grep pre-commit del cliente anterior + hex
  hardcodeado en `cliente/`).
- [ ] Ejecutar `/figma-code-connect` para mapear la librería de `factory/` a componentes de
  Figma — es la mejora de fidelidad de mayor apalancamiento pendiente.
- [ ] Definir quién es dueño de mantener el contrato de diseño (Auto Layout + Variables) del
  lado del equipo de diseño, para que no se descubra recién en desarrollo.

---

*Documento vivo — actualizar cada vez que el ciclo con un nuevo cliente deje un aprendizaje
nuevo. Versión técnica completa (con detalle de cada archivo tocado) en
`governance/ASSESSMENT_CLIENTE_GENERICO.md`.*
