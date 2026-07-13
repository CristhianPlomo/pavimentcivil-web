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
    document.body.style.overflow = '';
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
  const projTriggers = Array.from(document.querySelectorAll('.home-projects__img[data-lightbox]'));
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
   FORMULARIO DE CONTACTO
   ============================================================ */
const form = document.getElementById('contactForm');

if (form) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const submitDefaultText = submitBtn ? submitBtn.textContent.trim() : 'Solicitar presupuesto';

  const rules = {
    nombre: (v) => (v.trim().length >= 2 ? '' : 'Indica tu nombre.'),
    telefono: (v) =>
      /^[+\d][\d\s().-]{6,}$/.test(v.trim())
        ? ''
        : 'Introduce un teléfono de contacto válido.',
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? ''
        : 'Introduce un email válido.',
    mensaje: (v) => (v.trim().length >= 5 ? '' : 'Cuéntanos brevemente tu proyecto.'),
  };

  function setError(name, message) {
    const errorEl = form.querySelector(
      `.ds-field-error[data-for="${name}"], .f-error[data-for="${name}"]`
    );
    const inputEl = form.querySelector(`[name="${name}"]`);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) {
      inputEl.classList.toggle('invalid', Boolean(message));
      inputEl.classList.toggle('is-invalid', Boolean(message));
    }
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

  Object.keys(rules).forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.addEventListener('blur', () => setError(name, rules[name](input.value)));
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid') || input.classList.contains('is-invalid')) {
          setError(name, rules[name](input.value));
        }
      });
    }
  });

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'ds-form-status form-status';
    if (type === 'sending') {
      statusEl.classList.add('ds-form-status--sending', 'sending');
    } else if (type === 'success') {
      statusEl.classList.add('ds-form-status--success', 'success');
    } else if (type === 'error') {
      statusEl.classList.add('ds-form-status--error', 'error');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      setStatus(
        'Gracias. Hemos recibido tu consulta y nos pondremos en contacto contigo.',
        'success'
      );
      form.reset();
      return;
    }

    if (!validateForm()) {
      setStatus('Revisa los campos marcados.', 'error');
      return;
    }

    if (FORMSPREE_ID === 'TU_ID_FORMSPREE') {
      setStatus(
        'Formulario aún no conectado. Escríbenos por WhatsApp o email mientras activamos el envío.',
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
        setStatus(
          'Gracias. Hemos recibido tu consulta y nos pondremos en contacto contigo.',
          'success'
        );
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        const msg =
          data && data.errors && data.errors.length
            ? data.errors.map((err) => err.message).join(' ')
            : 'No se pudo enviar. Inténtalo de nuevo o contáctanos por WhatsApp.';
        setStatus(msg, 'error');
      }
    } catch (err) {
      setStatus('Error de conexión. Inténtalo de nuevo o contáctanos por WhatsApp.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitDefaultText;
      }
    }
  });
}
