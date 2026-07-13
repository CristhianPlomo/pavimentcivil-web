# Arquitectura

## Filosofía

Cada página debe responder una intención de búsqueda.

## Mapa de rutas (V1.0)

| Ruta | Archivo | Estado | Misión |
|---|---|---|---|
| `/` | `index.html` | ✅ V1.0 | Entrada, confianza, conversión |
| `/servicios/` | `servicios/index.html` | ✅ Hub V1.0 | Catálogo ampliado de servicios |
| `/empresa` | — | Pendiente | Quiénes somos, sede, valores |
| `/proyectos` | — | Pendiente | Portfolio real |
| `/contacto` | — | Pendiente | Formulario dedicado (hoy: `/#contacto`) |
| Legales | `*.html` | ✅ | Aviso legal, privacidad, cookies |

## Menú (objetivo sitio)

Inicio

Empresa

Servicios

Proyectos

Sectores

Blog

Contacto

## Servicios — hub `/servicios/` (V1.0)

### Principales (secciones con ancla)

| Ancla | Servicio |
|---|---|
| `#pavimentacion` | Pavimentación |
| `#adoquines` | Colocación de adoquines |
| `#urbanizacion` | Urbanización |
| `#acerados` | Acerados |
| `#bordillos` | Bordillos |
| `#obra-civil` | Obra civil de pavimentación |

### Complementarios (resumen en `#complementarios`, sin página hija)

- Pavimentos prefabricados de hormigón — *Pendiente de confirmar*
- Reparación y mantenimiento — *Pendiente de confirmar*
- Pavimentos decorativos — *Pendiente de confirmar*

### Excluidos V1.0

- Asfaltado
- Páginas hijas `/servicios/{slug}/` (fase posterior)
- Páginas geográficas

### Servicios futuros (ARQUITECTURA original)

- Pavimentos decorativos → página hija cuando se confirme
- Reparación → página hija cuando se confirme
- Mantenimiento → página hija cuando se confirme

## Enlazado interno

```
Home (/)
  ├─→ /servicios/           (nav, hero, CTA todos los servicios)
  └─← /servicios/           (logo, nav contextual)

/servicios/
  ├─→ ../index.html#contacto   (CTAs)
  ├─→ ../index.html#proceso
  ├─→ ../index.html#sectores
  └─→ ../index.html#faq
```

## Home — anclas temporales

| Ancla | Estado |
|---|---|
| `#pavimentos` | Alias legacy en Home; nav ya apunta a `/servicios/` |
| `#servicios` | Resumen en Home (bloque V1.0) |

## Futuro

Provincias

Materiales

Casos de éxito

FAQs (página dedicada)

Blog

Páginas hijas `/servicios/{slug}/`

## Sprint Producción (gate)

Requisito para SEO técnico definitivo y purga CSS legacy:

- Home ✅
- Servicios ✅ (hub)
- Empresa
- Proyectos
- Contacto
