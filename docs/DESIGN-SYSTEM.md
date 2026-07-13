# Design System — PAVIMENTCIVIL

Referencia oficial del sistema de diseño. Todo color del proyecto DEBE
provenir de estos tokens; no se permiten valores de color hardcodeados en
componentes ni en el marcado.

Fuente única de verdad: bloque `:root` de `styles.css`.

Fases:

1. **Color** — cerrado y aprobado por QA.
2. **Tipografía + Espaciado + Layout + Motion** — Entrega 2.1 (cerrada).
3. **Componentes `.ds-*` y cableado legacy** — Entrega 2.2 (este documento).
4. **Páginas y layouts** — Home V1.0 Bloques 1–3 (§8).

---

## 7. Componentes UI (Entrega 2.2)

Capa canónica en `styles.css` (bloque **DESIGN SYSTEM — Componentes**). Las clases
legacy siguen activas en el HTML vía selectores agrupados; aspecto visual preservado.

### 7.1 Botones

| Clase DS | Variante / tamaño | Alias legacy |
|---|---|---|
| `.ds-btn` | Base (tipografía, cursor, focus-visible, disabled) | — |
| `.ds-btn--primary` | Fondo acento | `.btn-primary`, `.btn-form`, `.btn-gold-sm`, `.nav-cta` |
| `.ds-btn--secondary` | Borde ghost | `.btn-secondary` |
| `.ds-btn--whatsapp` | CTA WhatsApp | `.wa-btn` |
| `.ds-btn--sm` | Compacto | `.btn-gold-sm`, `.nav-cta` |
| `.ds-btn--lg` | Desktop hero (768px+) | `.btn-primary`, `.btn-secondary` (media query); **Home V1.0 hero** |
| `.ds-btn--block` | Ancho completo | `.btn-form`, `.wa-btn` |

Estados: `:hover`, `:active` (primario en `.btn-primary` / `.btn-form`), `:focus-visible`, `:disabled`.

### 7.2 Formularios

| Clase DS | Rol | Alias legacy |
|---|---|---|
| `.ds-form` | Contenedor column | `.form` |
| `.ds-field` | Wrapper campo | `.f-field` |
| `.ds-label` | Etiqueta (preparado V1.0) | — |
| `.ds-input` | Input | `.f-input` |
| `.ds-textarea` | Textarea | `textarea.f-input` |
| `.ds-field-error` | Error campo | `.f-error` |
| `.ds-form-status` | Mensaje global | `.form-status` |
| `.ds-form-status--sending` | Enviando | `.form-status.sending` |
| `.ds-form-status--success` | Éxito | `.form-status.success` |
| `.ds-form-status--error` | Error | `.form-status.error` |

Estados input: `:focus`, `:focus-visible`, `.invalid` / `.is-invalid`.

### 7.3 Tags / Eyebrows

| Clase DS | Rol | Alias legacy |
|---|---|---|
| `.ds-tag` | Chip | `.tag` |
| `.ds-eyebrow` | Tipografía overline base | `.sec-tag`, `.cta-tag` |
| `.ds-eyebrow--accent` | Caja dorada | `.hero-tag` |
| `.ds-eyebrow--section` | Sección oscura | `.sec-tag` |
| `.ds-eyebrow--inverse` | Sobre fondo amarillo | `.cta-tag` |

### 7.4 Cards

| Clase DS | Rol | Alias legacy |
|---|---|---|
| `.ds-card` | Superficie base | `.pav-card`, `.proj-card` |
| `.ds-card--elevated` | Superficie negra elevada | `.contact-card` |
| `.ds-card--interactive` | Hover borde/fondo | `.sector-card` |
| `.ds-card--accent` | Fondo acento tenue | `.pav-cta-card` |

Estructura específica (`.pav-card::before`, grid `.proj-card`) permanece en legacy.

### 7.5 Tokens adicionales (Entrega 2.2)

| Token | Uso |
|---|---|
| `--component-btn-border-secondary` | Borde `.btn-secondary` |
| `--component-btn-letter-spacing-nav` | `.nav-cta` |
| `--component-wa-bg/border/bg-hover` | Botón WhatsApp |
| `--component-eyebrow-accent-bg/border` | `.hero-tag` |
| `--component-eyebrow-inverse-color` | `.cta-tag` |
| `--component-card-accent-bg/border` | `.pav-cta-card` |
| `--component-form-status-color-*` | Estados formulario |

---

## 5. Componentes preparados (Entrega 2.1 → cableados en 2.2)

Ver **§7 Componentes UI** para clases `.ds-*` y mapa legacy.

| Grupo | Prefijo token | Estado |
|---|---|---|
| Botones | `--component-btn-*` | Cableado (2.2) |
| Inputs | `--component-input-*` | Cableado (2.2) |
| Formularios | `--component-form-*`, `--component-field-*` | Cableado (2.2) |
| Cards | `--component-card-*` | Cableado (2.2) |
| Tags | `--component-tag-*` | Cableado (2.2) |
| Estados | `--state-*`, `--color-focus/hover/active/disabled` | Cableado (2.2) |

**No creado** (aparecerán cuando la V1.0 los necesite): breadcrumbs, tablas, alertas complejas, grid/container genérico, sprite SVG, iconografía.

---

## 6. Compatibilidad

- Alias de color Fase 1 intactos (`--gold`, `--dark`, `--light`, etc.).
- Clases HTML existentes sin cambios (`.btn-primary`, `.f-input`, `.pav-card`, etc.).
- Selectores legacy agrupados con `.ds-*`; aspecto visual preservado.
- Las clases `.ds-*` están en uso en Home V1.0 (Bloques 1–3). El resto de secciones legacy conservan clases antiguas hasta siguientes bloques.

---

## 8. Layout Home (Bloque 1 — V1.0)

Primitivas de sección y bloques específicos de la Home. Fuente: bloque **HOME V1.0** en `styles.css`.

### 8.1 Primitivas layout

| Clase | Rol |
|---|---|
| `.ds-section` | Padding vertical y horizontal de sección |
| `.ds-section--alt` | Fondo `--dark` |
| `.ds-section__inner` | Contenedor centrado (`--layout-max-cta`) |
| `.ds-rule` | Línea divisoria dorada (3px) |
| `.sr-only` | Título accesible oculto visualmente |

### 8.2 Bloques Home V1.0

| Bloque | Clases | Notas |
|---|---|---|
| Header | `.home-header`, `.home-nav`, `.home-nav__*` | Sticky; CTA `ds-btn--primary ds-btn--sm`; IDs `#menuBtn`, `#mobileMenu` para JS |
| Menú móvil | `.home-mobile-menu` | Clase `.open` controlada por `main.js` |
| Hero | `.home-hero`, `.home-hero__*` | Sin stats; eyebrow `ds-eyebrow--accent`; CTAs `ds-btn--lg` |
| Confianza | `.home-trust`, `.home-trust__*` | 4 cards `ds-card`; grid 1→2→4 columnas |
| Servicios | `.home-services`, `.home-services__*` | 6 cards; grid 1→2→3; `id="servicios"` |
| Presentación | `.home-about`, `.home-about__*` | `id="nosotros"`; pilares 1→3 columnas |
| Propuesta de valor | `.home-value`, `.home-value__*` | `id="propuesta-valor"`; 6 cards editoriales; CTA único |
| Sectores | `.home-sectors`, `.home-sectors__*` | `id="sectores"`; 5 cards funcionales; sin CTA sección |

### 8.3 Tamaño botón hero

| Clase | Comportamiento |
|---|---|
| `.ds-btn--lg` | Ancho completo en móvil; inline con padding md en ≥768px |

Legacy `.nav`, `.hero`, `.hero-stats` permanecen en CSS sin uso en Home V1.0 hasta limpieza futura.

### 8.4 Anclas (Bloque 2 — estado actual)

| Ancla | Elemento | Enlaces activos |
|---|---|---|
| `#servicios` | `<section id="servicios">` | CTA hero «Ver soluciones» |
| `#pavimentos` | `<span class="home-anchor">` dentro de `#servicios` | Nav, menú móvil, footer (alias temporal) |
| `#nosotros` | `<section class="home-about">` | Nav «Nosotros», footer |

**Pendiente:** cuando exista `/servicios`, actualizar CTA «Consultar todos los servicios» y redirigir enlaces `#pavimentos` del footer. Eliminar alias `#pavimentos` cuando no queden referencias.

### 8.5 Bloque 2 — Servicios y presentación

- Orden DOM: confianza → servicios → presentación → **propuesta de valor** → **sectores** → **proyectos** → **proceso** → **faq** → **contacto** → footer (legacy).
- Sin `.fade-in` en Bloque 2 (contenido visible de inmediato).
- Modal `#pavModal` y `initPavModal` eliminados; lightbox de proyectos intacto.
- CTA sección servicios: `Consultar todos los servicios` → `#contacto` (TODO: `/servicios`).
- Imagen presentación: `assets/pavimentos/adoquines-1.webp` (pendiente confirmar obra real).

### 8.6 Bloque 3 — Propuesta de valor y sectores

| Bloque | ID | Grid | Diferenciación visual |
|---|---|---|---|
| Propuesta de valor | `#propuesta-valor` | 1→2→3 cols; 6 items | Cards estáticas `.ds-card`; más padding; CTA primario centrado |
| Sectores | `#sectores` | 1→2→3 cols; 5 items | `.ds-card--interactive`; labels overline; estructura necesidad/solución; sin CTA |

- Sin `.fade-in`, sin iconos unicode, sin imágenes.
- Sectores: 5 perfiles cliente (sin Comunidades hasta confirmación).
- CTA valor: «Cuéntanos tu proyecto» → `#contacto`.
- Legacy `.sector-*` sin uso; no eliminar CSS aún.

### 8.7 Sprint 4 — Proyectos y proceso

| Bloque | ID | Fondo | Grid | Diferenciación visual |
|---|---|---|---|---|
| Proyectos | `#proyectos` | `.ds-section` | 1→2→3 cols; 4 items | Cards con imagen + lightbox; `.ds-tag` metadatos; CTA secundario |
| Proceso | `#proceso` | `.ds-section--alt` | 1→2→5 cols; 5 fases | Timeline tipográfico; `<ol>` semántico; sin círculos decorativos |

- Sin `.fade-in`, sin tile «+500 proyectos», sin claims no verificables (m², ciudades, garantías).
- Imágenes de proyecto: estado **provisional** (`assets/proyectos/*.webp`); sustituir por fotos reales de obra PAVIMENTCIVIL.
- Lightbox: triggers `.home-projects__img[data-lightbox]`; markup `#lightbox` sin cambios.
- CTA proyectos: «Consultar proyectos» → `#contacto` (TODO: `/proyectos`).
- Proceso: 5 fases obra civil (replanteo → planificación → ejecución → control → entrega); sin CTA en sección.
- Legacy `.proj-*`, `.process-*`, `.proc-*` sin uso en Home; no eliminar CSS aún (deprecación post-migración completa).

### 8.8 Sprint 5 — FAQ y embudo de conversión

| Bloque | ID | Fondo | Estructura |
|---|---|---|---|
| FAQ | `#faq` | `.ds-section` | Acordeón `<details>` ×6; sin cards ni iconos |
| Contacto | `#contacto` | `.ds-section--alt` | Transición → CTA → formulario → WhatsApp secundario |

- Journey único: FAQ → puente corporativo → «Hablemos de tu proyecto» → formulario → WhatsApp alternativo.
- Sin `.fade-in`, sin `.cta-sec` dorado, sin `.cta-checks`, sin claims no verificables.
- Formulario: `.ds-form` con labels visibles; campos `nombre*`, `empresa`, `telefono*`, `email*`, `proyecto` (select), `mensaje*`.
- Submit: «Solicitar presupuesto» — CTA principal de toda la Home.
- WhatsApp: `.ds-btn--whatsapp` fuera del `<form>`, debajo del status.
- Estados formulario: `.ds-form-status--sending/success/error` (alias legacy `.form-status` en JS).
- Validación `main.js`: nombre, teléfono, email, mensaje; honeypot `_gotcha`.
- Formspree: placeholder `TU_ID_FORMSPREE` — sin cambiar en sprint.
- Legacy `.cta-*`, `.contact-card`, `.f-field`, `.wa-btn` en form sin uso; no eliminar CSS aún.
- Sin JSON-LD FAQPage ni cambios SEO head.

---

## 2. Sistema tipográfico (Entrega 2.1)

Fuente: **Barlow** (cuerpo, UI, formularios) + **Barlow Condensed** (display, títulos).

Base: `--font-size-root: 16px` en `html`.

### 2.1 Primitivos

| Token | Valor |
|---|---|
| `--font-family-body` | `'Barlow', sans-serif` |
| `--font-family-display` | `'Barlow Condensed', sans-serif` |
| `--font-weight-light` | `300` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |
| `--font-weight-black` | `900` |

### 2.2 Jerarquía semántica

Cada nivel expone **4 propiedades** (`-size`, `-line-height`, `-weight`, `-letter-spacing`) + `-family` cuando aplica.

| Nivel | Uso principal | Size (móvil) | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|---|
| **Display XL** | Hero H1 | `clamp(52px,14vw,80px)` → md `60–96px` → lg `80–110px` | `0.92` | `900` | `-0.01em` |
| **Display L** | CTA invertido | `clamp(38px,10vw,52px)` | `1` | `700` | `0` |
| **H1** | Títulos sección | `clamp(34px,9vw,48px)` → md `40–56px` | `1` | `700` | `0` |
| **H2** | Modales, legal | `clamp(26px,6vw,36px)` | `1.05` | `700` | `0` |
| **H3** | Tarjetas 20px | `20px` | `1.2` | `700` | `0.03em` |
| **H4** | Subtítulos 17–18px | `17px` / sm `14px` / lg `18px` | `1.2` | `700` | `0.03em` |
| **H5** | Subtítulos menores | `15px` | `1.3` | `700` | `0.02em` |
| **H6** | Footer columnas | `12px` | `1.3` | `700` | `0.1em` |
| **Lead** | Hero subtítulo | `15px` → md `18px` | `1.65` | `300` | `0` |
| **Body Large** | Párrafos desktop | `17px` | `1.65` | `400` | `0` |
| **Body** | Texto estándar | `15px` → md `16px` | `1.65` | `400` | `0` |
| **Body Small** | Descripciones | `13px` | `1.6` | `400` | `0` |
| **Caption** | Footer, errores | `12px` / sm `11px` | `1.3` | `400` | `0` |
| **Label** | Contacto, campos | `10px` | `1.3` | `700` | `0.08em` |
| **Button** | CTAs | `14px` / sm `12px` / md `13px` | `1.2` | `700` | `0.07em` |
| **Overline** | Eyebrows, tags | `10px` → md `11px` | `1.3` | `700` | `0.12–0.14em` |

Tokens en CSS: `--type-{nivel}-{propiedad}` (ej. `--type-h1-size`, `--type-body-line-height`).

---

## 3. Sistema de espaciado (Entrega 2.1)

Escala **4 px** con mapeo 1:1 de todos los valores en uso:

`2, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48, 52, 56, 60, 62, 64, 72, 80, 88, 96, 100`

Convención: `--space-{px}` (ej. `--space-20: 20px`).

---

## 4. Layout, radius y motion (Entrega 2.1)

### Layout

| Token | Valor | Uso |
|---|---|---|
| `--layout-nav-height` | `56px` | Nav móvil |
| `--layout-nav-height-md` | `62px` | Nav desktop |
| `--layout-scroll-padding` | `70px` | Anclas sticky |
| `--layout-container-gutter` | `20px` | Padding horizontal móvil |
| `--layout-section-py` | `64px` | Secciones móvil |
| `--layout-section-py-md` | `88px` | Secciones tablet+ |
| `--layout-section-py-lg` | `100px` | Secciones XL |
| `--layout-max-legal` | `820px` | Páginas legales |
| `--layout-max-modal` | `860px` | Modal pavimentos |
| `--layout-max-cta` | `1100px` | Bloque contacto |

### Radius

`--radius-1` (1px) · `--radius-3` · `--radius-4` · `--radius-5` · `--radius-6` · `--radius-8` · `--radius-10` · `--radius-full`

### Motion

| Token | Valor |
|---|---|
| `--duration-instant` | `0.15s` |
| `--duration-fast` | `0.2s` |
| `--duration-normal` | `0.25s` |
| `--duration-medium` | `0.3s` |
| `--duration-slow` | `0.45s` |
| `--duration-enter` | `0.65s` |
| `--focus-ring-width` | `2px` |
| `--focus-ring-offset` | `2px` |
| `--opacity-disabled` | `0.55` |

---

## 5. Componentes preparados (Entrega 2.1)

Tokens semánticos listos para Entrega 2.2. **No hay clases `.ds-*` ni HTML nuevo.**

| Grupo | Prefijo token | Estado |
|---|---|---|
| Botones | `--component-btn-*` | Preparado |
| Inputs | `--component-input-*` | Preparado + focus `:focus-visible` |
| Formularios | `--component-form-*`, `--component-field-*` | Preparado |
| Cards | `--component-card-*` | Preparado |
| Tags | `--component-tag-*` | Preparado |
| Estados | `--state-*`, `--color-focus/hover/active/disabled` | Preparado |

**No creado en esta entrega** (aparecerán cuando la V1.0 los necesite): breadcrumbs, tablas, alertas complejas, grid/container genérico, sprite SVG, iconografía.

---

## 6. Compatibilidad

- Alias de color Fase 1 intactos (`--gold`, `--dark`, `--light`, etc.).
- Clases HTML existentes sin cambios (`.btn-primary`, `.f-input`, `.pav-card`, etc.).
- Selectores legacy cableados internamente a tokens; aspecto visual preservado.

---

## 1. Sistema de color

Arquitectura de tres capas:

- **Primitivos**: la paleta cruda. No usar directamente en componentes.
- **Semánticos**: describen el rol (`--color-*`). Es la capa que deben usar
  los componentes nuevos.
- **Alias de compatibilidad**: nombres previos que apuntan a semánticos. Se
  mantienen mientras dure la migración; no eliminar sin sustituir su uso.

El tema activo es **oscuro**. Existen tokens claros preparados para futuras
secciones claras, todavía sin cablear a ningún selector.

### 1.1 Tokens primitivos

#### Canales RGB (para transparencias `rgba(var(--x-rgb), a)`)

| Token | Valor | Uso |
|---|---|---|
| `--gold-rgb` | `255,192,0` | Amarillo corporativo #FFC000 |
| `--blue-rgb` | `30,53,94` | Azul Ingeniería #1E355E (paneles translúcidos, reserva) |
| `--white-rgb` | `255,255,255` | Bordes, superficies y textos translúcidos |
| `--black-rgb` | `11,13,16` | Fondos translúcidos (nav, scrims), alineado con `--slate-1000` |
| `--pure-black-rgb` | `0,0,0` | Texto/sombra sobre CTA amarilla (máximo contraste) |
| `--near-black-rgb` | `6,7,9` | Scrims de modal / lightbox |
| `--green-rgb` | `37,211,102` | WhatsApp translúcido |

#### Colores de marca (lámina corporativa)

| Token | HEX | Notas |
|---|---|---|
| `--amber-500` | `#FFC000` | Amarillo corporativo — acento protagonista |
| `--blue-700` | `#1E355E` | Azul Ingeniería — estructural |
| `--graphite` | `#25282C` | Grafito |
| `--asphalt` | `#3B3F45` | Asfalto |
| `--steel` | `#59616B` | Acero |
| `--concrete-500` | `#7A838C` | Gris Hormigón — bordes/decorativo, **nunca texto** |
| `--concrete-300` | `#BFC3C7` | Hormigón — texto secundario sobre oscuro |
| `--gray-light` | `#F4F5F6` | Gris Claro — fondos claros (fases futuras) |
| `--earth` | `#8E7454` | Tierra — reserva |
| `--neutral-0` | `#FFFFFF` | Blanco |

#### Colores derivados (no están en la lámina; justificados)

| Token | HEX | Justificación |
|---|---|---|
| `--amber-700` | `#D99700` | Amarillo oscuro para hover/active (la marca no aporta uno) |
| `--slate-1000` | `#0B0D10` | Fondo de página: near-black frío, conserva contraste |
| `--slate-900` | `#12171F` | Superficie base |
| `--slate-850` | `#1A212B` | Superficie de tarjetas |
| `--slate-800` | `#232C38` | Superficie hover |
| `--ink-100` | `#E8E8E8` | Tinta de cuerpo |

#### Colores funcionales (sin equivalente de marca)

| Token | HEX | Uso |
|---|---|---|
| `--green-500` | `#25D366` | WhatsApp |
| `--red-500` | `#FF6B6B` | Error |

### 1.2 Tokens semánticos (capa recomendada para componentes)

#### Base

| Token | Apunta a | Rol |
|---|---|---|
| `--color-accent` | `--amber-500` | Acento: CTA, estado activo, indicador, línea, etiqueta, dato, icono |
| `--color-accent-strong` | `--amber-700` | Hover/active del acento |
| `--color-on-accent` | `--color-bg` | Texto sobre superficie amarilla (~12:1) |
| `--color-bg` | `--slate-1000` | Fondo de página |
| `--color-surface` | `--slate-900` | Superficie base |
| `--color-surface-2` | `--slate-850` | Superficie de tarjetas |
| `--color-surface-3` | `--slate-800` | Superficie hover |
| `--color-text` | `--ink-100` | Texto de cuerpo |
| `--color-text-strong` | `--neutral-0` | Titulares / énfasis |
| `--color-text-muted` | `--concrete-300` | Texto secundario (nunca `#7A838C`) |
| `--color-danger` | `--red-500` | Errores |
| `--color-whatsapp` | `--green-500` | WhatsApp |

#### Superficies claras / oscuras (preparadas, sin cablear)

| Token | Apunta a |
|---|---|
| `--color-bg-dark` | `--slate-1000` |
| `--color-surface-dark` | `--slate-900` |
| `--color-bg-light` | `--gray-light` |
| `--color-surface-light` | `--neutral-0` |
| `--color-text-on-dark` | `--ink-100` |
| `--color-text-on-light` | `--graphite` |
| `--color-text-muted-on-light` | `--steel` |

#### Estructural, estados, bordes, enlaces y botones

| Token | Apunta a | Rol |
|---|---|---|
| `--color-structural` | `--blue-700` | Paneles/superficies rellenas; nunca CTA principal |
| `--color-on-structural` | `--neutral-0` | Texto sobre azul |
| `--color-focus` | `--color-accent` | Anillo de foco |
| `--color-hover` | `--color-accent-strong` | Hover genérico |
| `--color-active` | `--color-accent-strong` | Estado activo |
| `--color-disabled` | `--concrete-500` | Deshabilitado no textual |
| `--color-disabled-text` | `--concrete-300` | Texto deshabilitado |
| `--color-border` | `rgba(white,0.1)` | Borde por defecto |
| `--color-border-subtle` | `rgba(white,0.06)` | Borde tenue |
| `--color-border-strong` | `--concrete-500` | Borde perceptible no textual (≥3:1) |
| `--color-link` | `--color-text-muted` | Enlace en reposo |
| `--color-link-hover` | `--color-accent` | Enlace hover |
| `--color-btn-primary-bg` | `--color-accent` | Botón primario: fondo |
| `--color-btn-primary-text` | `--color-on-accent` | Botón primario: texto |
| `--color-btn-primary-bg-hover` | `--color-accent-strong` | Botón primario: hover |
| `--color-btn-secondary-bg` | `transparent` | Botón secundario: fondo |
| `--color-btn-secondary-text` | `--color-text-strong` | Botón secundario: texto |
| `--color-btn-secondary-border` | `--color-border` | Botón secundario: borde |
| `--color-btn-secondary-text-hover` | `--color-accent` | Botón secundario: hover |

### 1.3 Alias de compatibilidad (transición)

Se mantienen mientras haya componentes que los usen. No renombrar ni eliminar
sin migrar antes su uso a la capa semántica.

| Alias | → Semántico |
|---|---|
| `--gold` | `--color-accent` |
| `--gold-dark` | `--color-accent-strong` |
| `--black` | `--color-bg` |
| `--dark` | `--color-surface` |
| `--dark2` | `--color-surface-2` |
| `--dark3` | `--color-surface-3` |
| `--light` | `--color-text-muted` |
| `--white` | `--color-text-strong` |
| `--text` | `--color-text` |
| `--green-wa` | `--color-whatsapp` |
| `--error` | `--color-danger` |

### 1.4 Reglas de uso del amarillo `#FFC000`

**Sí**: CTA principal, estado activo, indicador visual, línea decorativa,
etiqueta, dato destacado, icono puntual.

**No**: párrafos, textos largos ni color general de lectura.

### 1.5 Contraste (WCAG 2.1, verificado por QA — APROBADO)

Pares en uso sobre tema oscuro:

| Par | Ratio | Nivel |
|---|---|---|
| `--color-text` `#E8E8E8` sobre `--color-bg` `#0B0D10` | 15.9:1 | AAA |
| `#E8E8E8` sobre `--color-surface-3` `#232C38` | 11.5:1 | AAA |
| `--color-text-muted` `#BFC3C7` sobre `#0B0D10` | 11.0:1 | AAA |
| `#BFC3C7` sobre `#232C38` (peor caso) | 8.0:1 | AAA |
| `--color-text-strong` `#FFFFFF` sobre `#0B0D10` | 19.5:1 | AAA |
| Texto near-black sobre CTA `#FFC000` | 11.9:1 | AAA |
| Acento `#FFC000` como gráfico/borde sobre `#0B0D10` | 11.9:1 | ≥3:1 |
| `--color-border-strong` `#7A838C` sobre fondos slate | 3.7–5.1:1 | ≥3:1 (no textual) |

Combinaciones preparadas (al cablearse):

| Par | Ratio | Nivel |
|---|---|---|
| `--color-text-on-light` `#25282C` sobre claro | 13.4–14.8:1 | AAA |
| `--color-text-muted-on-light` `#59616B` sobre claro | 5.7–6.3:1 | AA |
| Blanco sobre `--color-structural` `#1E355E` | 12.2:1 | AAA |

### 1.6 Notas de implementación

- `theme-color` de los HTML y `site.webmanifest` se fijan a `#0B0D10` (los `<meta>`
  y el manifest no admiten `var()`, por lo que es el único color literal permitido
  fuera de `:root`, y debe mantenerse igual al fondo oficial).
- `styles.css` no contiene colores hardcodeados fuera de la capa primitiva:
  todos los usos son `var(--*)` o `rgba(var(--*-rgb), a)`.
