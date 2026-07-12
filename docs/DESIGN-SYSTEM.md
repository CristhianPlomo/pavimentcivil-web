# Design System — PAVIMENTCIVIL

Referencia oficial del sistema de diseño. Todo color del proyecto DEBE
provenir de estos tokens; no se permiten valores de color hardcodeados en
componentes ni en el marcado.

Fuente única de verdad: bloque `:root` de `styles.css`.

Fases:

1. **Color** — cerrado y aprobado por QA (este documento).
2. Tipografía + Espaciado — pendiente (siguiente fase).
3. Componentes / layouts — no iniciar hasta cerrar 1 y 2.

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
