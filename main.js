/* ============================================================
   CONFIGURACIÓN
   ============================================================
   TODO: sustituir por tu ID real de Formspree (https://formspree.io).
   Crea un formulario en Formspree y copia el identificador que
   aparece en la URL del endpoint: https://formspree.io/f/XXXXXXXX
   ============================================================ */
const FORMSPREE_ID = 'TU_ID_FORMSPREE'; // TODO: reemplazar (p.ej. 'xayzabcd')
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

/* ============================================================
   MENÚ MÓVIL
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  function setMenu(open) {
    mobileMenu.classList.toggle('open', open);
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
  });

  // Cerrar si se cambia a escritorio (evita estados bloqueados al rotar/redimensionar)
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

/* ============================================================
   ANIMACIÓN FADE-IN AL HACER SCROLL
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window && fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('visible'));
}

/* ============================================================
   LIGHTBOX (galería reutilizable)
   openLightboxWith(imagenes, indice) abre el visor con cualquier lista.
   Cada imagen: { src, alt, caption }
   ============================================================ */
let openLightboxWith = () => {};

(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');
  const pavModal = document.getElementById('pavModal');
  let images = [];
  let index = 0;
  let lastFocused = null;

  function render() {
    const item = images[index] || {};
    lbImg.src = item.src || '';
    lbImg.alt = item.alt || item.caption || '';
    lbCaption.textContent = item.caption || '';
    const multiple = images.length > 1;
    lbPrev.style.display = multiple ? '' : 'none';
    lbNext.style.display = multiple ? '' : 'none';
  }

  function show(i) {
    index = (i + images.length) % images.length;
    render();
  }

  function close() {
    lightbox.classList.remove('open');
    // Mantiene el scroll bloqueado si el modal de pavimentos sigue abierto
    document.body.style.overflow = pavModal && !pavModal.hidden ? 'hidden' : '';
    setTimeout(() => {
      lightbox.hidden = true;
      lbImg.src = '';
    }, 250);
    if (lastFocused) lastFocused.focus();
  }

  openLightboxWith = function (list, startIndex) {
    if (!list || !list.length) return;
    images = list;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.style.overflow = 'hidden';
    show(startIndex || 0);
    lbClose.focus();
  };

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => show(index - 1));
  lbNext.addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Galería de "Proyectos destacados"
  const projTriggers = Array.from(document.querySelectorAll('.proj-img[data-lightbox]'));
  const projImages = projTriggers.map((t) => ({
    src: t.getAttribute('data-lightbox'),
    caption: t.getAttribute('data-caption') || '',
    alt: (t.querySelector('img') || {}).alt || '',
  }));
  projTriggers.forEach((t, i) => {
    t.addEventListener('click', () => openLightboxWith(projImages, i));
  });
})();

/* ============================================================
   MODAL DE PAVIMENTOS (detalle ampliado + galería de 4 imágenes)
   ============================================================ */
(function initPavModal() {
  const modal = document.getElementById('pavModal');
  if (!modal) return;

  const elClose = document.getElementById('pavModalClose');
  const elNum = document.getElementById('pavModalNum');
  const elTitle = document.getElementById('pavModalTitle');
  const elText = document.getElementById('pavModalText');
  const elGallery = document.getElementById('pavModalGallery');
  const elCta = document.getElementById('pavModalCta');
  const lightbox = document.getElementById('lightbox');
  let lastFocused = null;

  const BASE = 'assets/pavimentos/';
  const DATA = {
    hormigon: {
      num: '01',
      title: 'Hormigón Industrial',
      text: 'El hormigón industrial es la opción más robusta y duradera del mercado, diseñado especialmente para soportar cargas extremas y un tráfico continuo. Mediante el uso de aditivos avanzados, se logra una alta resistencia mecánica que evita el agrietamiento prematuro. Es la base indispensable para naves industriales, centros logísticos y parkings de gran actividad.',
      images: [
        { src: BASE + 'hormigon-1.webp', alt: 'Nave logística con pavimento de hormigón industrial pulido' },
        { src: BASE + 'hormigon-2.webp', alt: 'Carretilla elevadora circulando sobre pavimento de hormigón industrial' },
        { src: BASE + 'hormigon-3.webp', alt: 'Ejecución de pavimento de hormigón con fratasadora mecánica' },
        { src: BASE + 'hormigon-4.webp', alt: 'Detalle de la superficie de hormigón industrial pulido' },
      ],
    },
    adoquines: {
      num: '02',
      title: 'Adoquines',
      html: `
        <p>El adoquín es un elemento de pavimentación individual, con forma de bloque macizo, diseñado para colocarse de manera entrelazada sobre una base flexible de arena. Al conjunto de estas piezas se le conoce técnicamente como <strong>pavimento articulado</strong>.</p>
        <p>A diferencia de las grandes losas continuas, el adoquín destaca por su enorme durabilidad, su valor estético en cascos históricos o residenciales y su capacidad única para ser desmontado y reutilizado sin generar escombros.</p>
        <h4>Los 3 tipos de adoquines principales</h4>
        <p>Dependiendo de su material de fabricación y su resistencia, los adoquines se clasifican en:</p>
        <ul>
          <li><strong>Adoquines de hormigón:</strong> son los más utilizados por ayuntamientos e industrias. Se fabrican en masa, ofrecen una altísima resistencia a cargas pesadas y permiten una gran variedad de formas geométricas que encajan entre sí (intertrabados) y una amplia gama de colores.</li>
          <li><strong>Adoquines de piedra natural (granito, pórfido, basalto):</strong> los adoquines tradicionales por excelencia. Destacan por su estética noble e inalterable al paso del tiempo. Son extremadamente duros, resistentes al desgaste climático y los preferidos para zonas peatonales históricas y accesos residenciales de lujo.</li>
          <li><strong>Adoquines cerámicos o de arcilla:</strong> fabricados con arcilla cocida a altas temperaturas. Ofrecen un color cálido y natural muy duradero que no se decolora con el sol. Tienen un excelente comportamiento ante el hielo y son ideales para tráficos ligeros, plazas y aceras.</li>
        </ul>
        <h4>Tipos de movimientos en los pavimentos de adoquines</h4>
        <p>Al ser un sistema articulado compuesto por miles de piezas unidas por arena de sellado, su comportamiento ante los esfuerzos es completamente diferente al del hormigón o el asfalto continuo. Sus movimientos se dividen en tres grandes categorías:</p>
        <h5>1. Movimientos térmicos (climatología)</h5>
        <ul>
          <li><strong>Dilatación y contracción individual:</strong> a diferencia de las grandes losas de hormigón que se agrietan con el frío o el calor, cada adoquín se expande o encoge de forma milimétrica e independiente. El estrés térmico no rompe la estructura, sino que es absorbido de manera uniforme por la arena de las juntas.</li>
          <li><strong>Resistencia al alabeo:</strong> al tratarse de piezas de tamaño reducido, no sufren tensiones internas por diferencias de temperatura entre su cara superior e inferior, eliminando por completo el riesgo de curvatura o rotura por alabeo.</li>
        </ul>
        <h5>2. Movimientos por carga (tráfico e intertrabado)</h5>
        <ul>
          <li><strong>Rotación y desplazamiento vertical:</strong> cuando una rueda pesada pisa un adoquín, este tiende a inclinarse o hundirse levemente. Si las juntas de arena están bien compactadas, esa fuerza se transmite a los adoquines vecinos, activando el «efecto intertrabado» que reparte la carga y devuelve la pieza a su sitio.</li>
          <li><strong>Desplazamiento horizontal (frenado y aceleración):</strong> el tráfico vehicular ejerce fuerzas horizontales que intentan «empujar» los adoquines hacia adelante o atrás. Sin un buen bordillo de confinamiento lateral, los adoquines de los extremos se moverán, abriendo las juntas y desestabilizando el diseño.</li>
        </ul>
        <h5>3. Movimientos del terreno (subbase y asentamientos)</h5>
        <ul>
          <li><strong>Asentamiento elástico (acomodo):</strong> durante las primeras semanas tras la instalación, el paso del tráfico provoca pequeños reajustes verticales en la capa de arena. Es un movimiento natural de compactación final que estabiliza la estructura.</li>
          <li><strong>Deformación por fallas de la base:</strong> si el terreno inferior cede o se hunde por humedades o mala compactación, los adoquines copiarán ese hundimiento de forma localizada. La gran ventaja técnica es que estos baches se reparan fácilmente: se desmontan solo las piezas afectadas, se nivela el suelo y se vuelven a colocar los mismos adoquines.</li>
        </ul>
      `,
      images: [
        { src: BASE + 'adoquines-1.webp', alt: 'Colocación de adoquines en la urbanización de un chalet' },
        { src: BASE + 'adoquines-2.webp', alt: 'Pavimentación con adoquines en el acceso de un chalet' },
        { src: BASE + 'adoquines-3.webp', alt: 'Calle adoquinada en casco urbano con aceras terminadas' },
        { src: BASE + 'adoquines-4.webp', alt: 'Obra de renovación de pavimento en calle comercial' },
      ],
    },
    poliuretano: {
      num: '03',
      title: 'Poliuretano',
      text: 'El pavimento de poliuretano destaca por su excelente flexibilidad y memoria térmica, lo que le permite absorber de manera eficiente los movimientos de dilatación y contracción del suelo base sin agrietarse. Gracias a su alta resistencia a los choques térmicos, es el sistema preferido para cámaras frigoríficas, zonas de lavado con agua caliente y entornos industriales exigentes.',
      images: [
        { src: BASE + 'poliuretano-1.webp', alt: 'Pavimento de poliuretano en cámara frigorífica' },
        { src: BASE + 'poliuretano-2.webp', alt: 'Pavimento de poliuretano en zona de lavado industrial con agua caliente' },
        { src: BASE + 'poliuretano-3.webp', alt: 'Pavimento de poliuretano en planta de bebidas' },
        { src: BASE + 'poliuretano-4.webp', alt: 'Detalle de pavimento de poliuretano antideslizante' },
      ],
    },
    cemento: {
      num: '04',
      title: 'Cemento Pulido',
      text: 'Fusionando elegancia industrial con un alto rendimiento técnico, el cemento pulido proporciona un carácter visual único, minimalista y moderno. Su superficie lisa es extremadamente fácil de mantener y limpiar, lo que lo transforma en una alternativa rentable y estéticamente atractiva para locales comerciales, showrooms, áreas de retail y oficinas corporativas.',
      images: [
        { src: BASE + 'cemento-1.webp', alt: 'Cemento pulido en showroom minimalista' },
        { src: BASE + 'cemento-2.webp', alt: 'Cemento pulido en tienda de retail' },
        { src: BASE + 'cemento-3.webp', alt: 'Cemento pulido en oficina corporativa' },
        { src: BASE + 'cemento-4.webp', alt: 'Detalle de cemento pulido con acabado satinado' },
      ],
    },
    mma: {
      num: '05',
      title: 'Resina MMA (Metil Metacrilato)',
      text: 'Los sistemas de resina de metil metacrilato (MMA) son la solución definitiva para proyectos urgentes gracias a su fraguado ultrarrápido, alcanzando su curado total y máxima dureza en tan solo una o dos horas. Además de minimizar los tiempos de inactividad, este pavimento mantiene una adherencia perfecta y puede aplicarse incluso bajo temperaturas extremas bajo cero, siendo ideal para la rehabilitación exprés de suelos industriales.',
      images: [
        { src: BASE + 'mma-1.webp', alt: 'Aplicación de resina MMA por operarios con rodillo' },
        { src: BASE + 'mma-2.webp', alt: 'Pavimento de resina MMA en cámara de congelación bajo cero' },
        { src: BASE + 'mma-3.webp', alt: 'Rehabilitación exprés de suelo industrial con resina MMA' },
        { src: BASE + 'mma-4.webp', alt: 'Detalle de resina MMA con chips decorativos' },
      ],
    },
  };

  function open(key) {
    const d = DATA[key];
    if (!d) return;
    lastFocused = document.activeElement;
    elNum.textContent = d.num;
    elTitle.textContent = d.title;
    if (d.html) elText.innerHTML = d.html;
    else elText.textContent = d.text;

    const captions = d.images.map((im) => ({ src: im.src, alt: im.alt, caption: d.title + ' · ' + im.alt }));
    elGallery.innerHTML = '';
    d.images.forEach((im, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Ampliar imagen: ' + im.alt);
      const img = document.createElement('img');
      img.src = im.src;
      img.alt = im.alt;
      img.loading = 'lazy';
      img.width = 400;
      img.height = 300;
      btn.appendChild(img);
      btn.addEventListener('click', () => openLightboxWith(captions, i));
      elGallery.appendChild(btn);
    });

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
    elClose.focus();
  }

  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.hidden = true;
      elGallery.innerHTML = '';
    }, 300);
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.pav-card[data-pav]').forEach((card) => {
    const key = card.getAttribute('data-pav');
    const btn = card.querySelector('.pav-more');
    if (btn) btn.addEventListener('click', () => open(key));
  });

  elClose.addEventListener('click', close);
  if (elCta) elCta.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (lightbox && !lightbox.hidden) return; // el lightbox gestiona su propio ESC
    if (e.key === 'Escape') close();
  });
})();

/* ============================================================
   FORMULARIO DE CONTACTO
   ============================================================ */
const form = document.getElementById('contactForm');

if (form) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitDefaultText = submitBtn ? submitBtn.textContent : 'Enviar';

  // Reglas de validación por campo
  const rules = {
    nombre: (v) => (v.trim().length >= 2 ? '' : 'Indica tu nombre y empresa.'),
    telefono: (v) =>
      /^[+\d][\d\s().-]{6,}$/.test(v.trim())
        ? ''
        : 'Introduce un teléfono de contacto válido.',
    mensaje: (v) => (v.trim().length >= 5 ? '' : 'Cuéntanos brevemente tu proyecto.'),
  };

  function setError(name, message) {
    const errorEl = form.querySelector(`.f-error[data-for="${name}"]`);
    const inputEl = form.querySelector(`[name="${name}"]`);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.toggle('invalid', Boolean(message));
    return !message;
  }

  function validateForm() {
    let valid = true;
    Object.keys(rules).forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      const value = input ? input.value : '';
      const ok = setError(name, rules[name](value));
      if (!ok) valid = false;
    });
    return valid;
  }

  // Validación en vivo al salir del campo
  Object.keys(rules).forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.addEventListener('blur', () => setError(name, rules[name](input.value)));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          setError(name, rules[name](input.value));
        }
      });
    }
  });

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'form-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    // Honeypot anti-spam: si está relleno, es un bot -> simulamos éxito y salimos.
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      setStatus('Gracias por tu consulta.', 'success');
      form.reset();
      return;
    }

    if (!validateForm()) {
      setStatus('Revisa los campos marcados en rojo.', 'error');
      return;
    }

    // Si no se ha configurado Formspree, avisamos con claridad.
    if (FORMSPREE_ID === 'TU_ID_FORMSPREE') {
      setStatus(
        'Formulario aún no conectado. Configura FORMSPREE_ID en main.js o escríbenos por WhatsApp.',
        'error'
      );
      console.warn('[PavimentCivil] Configura FORMSPREE_ID en main.js para activar el envío.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';
    }
    setStatus('Enviando tu consulta…', 'sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('¡Gracias! Te contactaremos en menos de 24 horas.', 'success');
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const msg =
          data && data.errors && data.errors.length
            ? data.errors.map((err) => err.message).join(' ')
            : 'No se pudo enviar. Inténtalo de nuevo o usa WhatsApp.';
        setStatus(msg, 'error');
      }
    } catch (err) {
      setStatus('Error de conexión. Revisa tu red o escríbenos por WhatsApp.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitDefaultText;
      }
    }
  });
}
