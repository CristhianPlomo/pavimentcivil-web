# PavimentCivil — Landing de producción

Landing page profesional para **PavimentCivil**, empresa española de pavimentos industriales de alto rendimiento. Estática (HTML + CSS + JS vanilla), sin frameworks ni dependencias de build.

---

## 1. Estructura de archivos

```
pavimentcivil/
├── index.html            ← Página principal (landing)
├── styles.css            ← Todos los estilos
├── main.js               ← Menú, animaciones y lógica del formulario
├── aviso-legal.html      ← Página legal
├── privacidad.html       ← Política de privacidad (RGPD)
├── cookies.html          ← Política de cookies
├── favicon.svg           ← Favicon vectorial (marca)
├── site.webmanifest      ← Manifiesto PWA
├── robots.txt            ← Directivas para buscadores
├── sitemap.xml           ← Mapa del sitio
├── README.md             ← Este archivo
├── tools/
│   └── convert-webp.mjs  ← Script para optimizar imágenes a WebP (Node + sharp)
└── assets/
    ├── logo.png              (TODO: aportar)
    ├── og-image.jpg          (TODO: 1200x630, para redes sociales)
    ├── apple-touch-icon.png  (TODO: 180x180)
    ├── proyectos/            ← Imágenes de prueba (.webp) de "Proyectos destacados"
    └── pavimentos/           ← Imágenes de prueba (.webp) de las galerías de cada tipo
```

---

## 2. Cómo ejecutar en local

No requiere instalación. Al usar rutas y `fetch`, conviene servirlo con un servidor local (no abrir el archivo con `file://`):

**Opción A — Python (ya instalado en la mayoría de sistemas):**
```bash
python -m http.server 8000
```
Abre `http://localhost:8000`.

**Opción B — Node (npx, sin instalar nada):**
```bash
npx serve .
```

**Opción C — Extensión "Live Server" de VS Code:** clic derecho en `index.html` → *Open with Live Server*.

---

## 3. Cómo editar el contenido

- **Textos y secciones:** todo el contenido visible está en `index.html`, organizado por bloques comentados (HERO, NOSOTROS, PAVIMENTOS, SECTORES, PROYECTOS, PROCESO, CONTACTO, FOOTER).
- **Estilos (colores, tipografía, espaciados):** en `styles.css`. Los colores de marca están centralizados como variables CSS en `:root` (arriba del archivo): `--gold`, `--black`, etc.
- **Comportamiento (menú, animaciones, formulario):** en `main.js`.

### Datos de contacto a reemplazar (TODO)
Busca y sustituye en `index.html` (y páginas legales):
- `+34 900 000 000` → teléfono real (también el `tel:+34900000000`)
- `info@pavimentcivil.es` → email real
- `wa.me/34900000000` → número real de WhatsApp (formato internacional sin `+`)
- Datos legales entre `[corchetes]` en `aviso-legal.html` y `privacidad.html`

---

## 4. Cómo configurar el formulario (Formspree)

El formulario se envía con **Formspree** (plan gratuito suficiente para empezar).

1. Crea una cuenta en <https://formspree.io> y un nuevo formulario.
2. Copia tu ID (aparece en el endpoint `https://formspree.io/f/XXXXXXXX`).
3. Sustituye el placeholder `TU_ID_FORMSPREE` en **dos** sitios:
   - `main.js` → constante `FORMSPREE_ID` (envío vía JS con estados y validación).
   - `index.html` → atributo `action` del `<form>` (respaldo si el usuario tiene JS desactivado).
4. En Formspree, configura el email de destino donde quieres recibir los leads.

**Qué incluye ya el formulario:**
- Validación de nombre/empresa, teléfono y mensaje (sin envíos vacíos).
- Estados visuales: *enviando → éxito / error* (sin `alert()`).
- Protección anti-spam con honeypot (campo `_gotcha`).
- Botón de WhatsApp como canal alternativo.

> ¿Prefieres **Netlify Forms**? Añade `netlify` y `name="contact"` al `<form>`, y un campo oculto `form-name`. Avísame y lo adapto.

---

## 5. Assets pendientes (TODO)

| Archivo | Recomendación |
|---|---|
| `assets/logo.png` | PNG transparente, mínimo 80×80 px |
| `assets/og-image.jpg` | 1200×630 px, para vista previa en redes sociales |
| `assets/apple-touch-icon.png` | 180×180 px |
| `assets/proyectos/*.webp` | Fotos reales, 800×600 px o superior, formato WebP (~30% más ligero) |

### Optimizar imágenes a WebP

Las imágenes de prueba ya están en WebP. Para convertir imágenes nuevas (PNG/JPG) a WebP:

```bash
npm install                 # solo la primera vez (instala sharp)
node tools/convert-webp.mjs assets/proyectos assets/pavimentos
```

El script redimensiona a un ancho máximo de 1400 px, comprime a calidad 80 y **borra el archivo original** tras convertirlo. Ajusta `MAX_WIDTH` y `QUALITY` dentro de `tools/convert-webp.mjs` si lo necesitas.

### Galería de "Tipos de pavimento"

Cada tarjeta tiene un botón **"Ver más"** que abre un modal con la descripción ampliada y una galería de 4 imágenes (ampliables en el visor). Para editar el texto o las imágenes de cada pavimento, modifica el objeto `DATA` en `main.js` (sección *MODAL DE PAVIMENTOS*). Las imágenes viven en `assets/pavimentos/` con nombres `tipo-1..4.webp`.

---

## 6. Cómo desplegar

La web es estática: vale cualquier hosting de archivos.

**Netlify (recomendado, gratis y con HTTPS automático):**
1. Arrastra la carpeta al panel de Netlify, o conecta el repositorio Git.
2. Configura el dominio `pavimentcivil.es`.

**Vercel:**
```bash
npx vercel deploy
```

**Hosting tradicional (cPanel/FTP):** sube todos los archivos a la raíz pública (`public_html`).

> Recuerda actualizar el dominio real en: `index.html` (canonical, Open Graph, JSON-LD), `robots.txt` y `sitemap.xml` (todos marcados con `TODO`).

---

## 7. Checklist de producción

**Contenido y datos**
- [ ] Teléfono, email y WhatsApp reales sustituidos
- [ ] Logo `assets/logo.png` añadido
- [ ] Imagen `assets/og-image.jpg` (1200×630) añadida
- [ ] Fotos reales de proyectos con `alt` descriptivo
- [ ] Datos legales completados (razón social, CIF, dirección)

**Funcionalidad**
- [ ] `FORMSPREE_ID` configurado en `main.js` y en el `action` del form
- [ ] Prueba de envío del formulario correcta (llega el email)
- [ ] Botón de WhatsApp abre el chat correcto

**SEO / técnico**
- [ ] Dominio real actualizado en canonical, OG, JSON-LD, `robots.txt` y `sitemap.xml`
- [ ] `sitemap.xml` enviado en Google Search Console
- [ ] Favicons definitivos (`favicon.ico`, `apple-touch-icon.png`)
- [ ] Revisado en móvil, tablet y escritorio
- [ ] Lighthouse: Performance / Accessibility / Best Practices / SEO en verde

**Legal**
- [ ] Aviso legal, privacidad y cookies revisados por la empresa
- [ ] Banner de cookies añadido si se instala analítica

---

## 8. Recomendaciones (siguientes pasos)

- **Dominio:** registrar `pavimentcivil.es` (y opcionalmente `.com`) en un registrador con DNSSEC.
- **Hosting:** Netlify o Vercel (gratis, CDN global, HTTPS automático). Para email corporativo, Zoho Mail o Google Workspace.
- **Analítica sin cookies:** Plausible o Cloudflare Web Analytics evitan el banner de consentimiento; Google Analytics 4 requiere banner.
- **Conversión:** añadir testimonios/logos de clientes reales y certificaciones (ISO, marcado CE) para reforzar confianza.
- **SEO local:** crear ficha de Google Business Profile y añadir dirección real al JSON-LD (`ProfessionalService`).

---

## 9. Tecnología

- HTML5 semántico, un único `<h1>`.
- CSS3 con variables y media queries mobile-first (`styles.css`).
- JavaScript vanilla (`main.js`), sin dependencias.
- Google Fonts: Barlow + Barlow Condensed.
