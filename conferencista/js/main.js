/* =========================================================================
   SPEAKER MILLIONAIRE® · Trias Institute
   Interacciones: cabecera, filtros de temario, zona horaria, cuenta regresiva y reservas
   ========================================================================= */
(function () {
  'use strict';

  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Configuración oficial del programa ---------- */
  var INICIO = new Date('2026-11-12T17:00:00-06:00');     // Jueves 12 nov · 5:00 pm Chicago (CST)
  var ANTICIPADO = new Date('2026-11-09T23:59:59-06:00'); // Lunes 9 nov · cierre matrícula bonificada
  var WHATSAPP = '18127572838';

  /* ---------- 1. Barra fija y menú móvil ---------- */
  var barra = $('#barra');
  var nav = $('#nav');
  var hamburguesa = $('#hamburguesa');
  var llamada = $('#llamada');

  function alDesplazar() {
    var y = window.scrollY || window.pageYOffset;
    if (barra) barra.classList.toggle('apoyada', y > 20);
    if (llamada) llamada.classList.toggle('visible', y > window.innerHeight * 0.75);
  }
  alDesplazar();
  window.addEventListener('scroll', alDesplazar, { passive: true });

  function cerrarMenu() {
    if (!nav || !hamburguesa) return;
    nav.classList.remove('abierto');
    hamburguesa.setAttribute('aria-expanded', 'false');
    hamburguesa.setAttribute('aria-label', 'Abrir menú');
    hamburguesa.innerHTML = '<svg width="24" height="24" aria-hidden="true"><use href="#i-menu"></use></svg>';
  }

  if (hamburguesa && nav) {
    hamburguesa.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      hamburguesa.setAttribute('aria-expanded', String(abierto));
      hamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      hamburguesa.innerHTML = '<svg width="24" height="24" aria-hidden="true"><use href="#' +
        (abierto ? 'i-cerrar' : 'i-menu') + '"></use></svg>';
    });
    $$('#nav a').forEach(function (a) { a.addEventListener('click', cerrarMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) {
        cerrarMenu();
        hamburguesa.focus();
      }
    });
  }

  /* ---------- 2. Indicador de sección activa en la barra ---------- */
  var secciones = ['inicio', 'calendario', 'mentoria', 'inversion']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secciones.length) {
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$('.nav > a').forEach(function (a) {
          a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    secciones.forEach(function (s) { vigia.observe(s); });
  }

  /* ---------- 3. Aparición suave al desplazar ---------- */
  var revelables = $$('.revelar');
  if ('IntersectionObserver' in window && !quieto) {
    var ojo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        ojo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revelables.forEach(function (el) { ojo.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 4. Conversión automática de 5:00 pm Chicago a hora local ---------- */
  try {
    var zonaUsuario = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (zonaUsuario && zonaUsuario !== 'America/Chicago') {
      var horaLocal = new Intl.DateTimeFormat('es', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(INICIO);

      var ciudad = zonaUsuario.split('/').pop().replace(/_/g, ' ');
      var heroHora = $('#horaLocalHero');
      var kpiHora = $('#horaLocalKpi');
      var calHora = $('#horaLocalCalendario');

      if (heroHora) {
        heroHora.textContent = 'Mar y Jue · 5:00 pm Chicago (' + horaLocal + ' en ' + ciudad + ')';
      }
      if (kpiHora) {
        kpiHora.textContent = '5:00 pm Chicago (' + horaLocal + ' local)';
      }
      if (calHora) {
        calHora.innerHTML = '· Equivalente a <b>' + horaLocal + '</b> en tu zona horaria (' + ciudad + ')';
      }
    }
  } catch (err) {
    // Si el navegador no soporta Intl, mantiene 5:00 pm hora de Chicago
  }

  /* ---------- 5. Filtro interactivo de los 4 Módulos en Vivo ---------- */
  var botonesFiltro = $$('[data-filtro]');
  var vivoGrid = $('#vivoGrid');
  var tarjetasMod = $$('.modulo-card');

  botonesFiltro.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var valor = btn.getAttribute('data-filtro');
      botonesFiltro.forEach(function (b) { b.classList.toggle('activo', b === btn); });
      if (vivoGrid) vivoGrid.classList.toggle('filtrado', valor !== 'todos');

      tarjetasMod.forEach(function (card) {
        var mostrar = (valor === 'todos') || (card.getAttribute('data-mod') === valor);
        card.hidden = !mostrar;
        if (mostrar) card.classList.add('visible');
      });
    });
  });

  /* ---------- 6. Cuenta regresiva en tiempo real ---------- */
  var cuentaMini = $('#cuentaMini');
  var cdDias = $('#cdDias');
  var cdHoras = $('#cdHoras');
  var cdMins = $('#cdMins');
  var cdSegs = $('#cdSegs');
  var relojRotulo = $('#relojRotulo');
  var llamadaCuenta = $('#llamadaCuenta');
  var avisoPlazo = $('#avisoPlazo');

  function dosCifras(n) { return n < 10 ? '0' + n : String(n); }

  function tictac() {
    var ahora = Date.now();
    var falta = INICIO.getTime() - ahora;

    if (falta > 0) {
      var dias = Math.floor(falta / 86400000);
      var horas = Math.floor(falta / 3600000) % 24;
      var mins = Math.floor(falta / 60000) % 60;
      var segs = Math.floor(falta / 1000) % 60;

      if (cdDias) cdDias.textContent = dosCifras(dias);
      if (cdHoras) cdHoras.textContent = dosCifras(horas);
      if (cdMins) cdMins.textContent = dosCifras(mins);
      if (cdSegs) cdSegs.textContent = dosCifras(segs);

      if (cuentaMini) {
        cuentaMini.innerHTML = 'Inicia en <b>' + dias + 'd ' + dosCifras(horas) + 'h ' + dosCifras(mins) + 'm</b>';
      }
      if (llamadaCuenta) {
        llamadaCuenta.textContent = 'Inicia en ' + dias + 'd ' + dosCifras(horas) + 'h';
      }
    } else {
      if (relojRotulo) relojRotulo.textContent = 'Edición en curso · Consulta admisión e incorporación inmediata:';
      if (cdDias) cdDias.textContent = '00';
      if (cdHoras) cdHoras.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSegs) cdSegs.textContent = '00';
      if (cuentaMini) cuentaMini.innerHTML = '<b>Inscripciones activas</b>';
      if (llamadaCuenta) llamadaCuenta.textContent = 'Cupos disponibles';
    }

    if (avisoPlazo) {
      var faltaAnt = ANTICIPADO.getTime() - ahora;
      if (faltaAnt > 0) {
        var d = Math.ceil(faltaAnt / 86400000);
        avisoPlazo.textContent = d === 1 ? '(¡Último día disponible!)' : '(Quedan ' + d + ' días para el cierre anticipado).';
      } else {
        avisoPlazo.textContent = '(Consulta disponibilidad de beca de matrícula con un asesor).';
      }
    }
  }
  tictac();
  setInterval(tictac, 1000);

  /* ---------- 7. Preselección de plan y enfoque del formulario ---------- */
  var seleccionPlan = $('#reserva select[name="plan"]');
  $$('a[href="#reservar"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var plan = a.getAttribute('data-plan');
      if (plan && seleccionPlan) {
        $$('option', seleccionPlan).forEach(function (o) {
          if (o.textContent.trim() === plan) seleccionPlan.value = o.value || o.textContent;
        });
      }
      window.setTimeout(function () {
        var primero = $('#reserva input[name="nombre"]');
        if (primero) primero.focus({ preventScroll: true });
      }, quieto ? 60 : 650);
    });
  });

  /* ---------- 8. Envío de reserva por WhatsApp o Email ---------- */
  var reserva = $('#reserva');
  var error = $('#reservaError');

  if (reserva) {
    reserva.addEventListener('submit', function (e) {
      e.preventDefault();
      var datos = new FormData(reserva);
      var nombre = (datos.get('nombre') || '').toString().trim();
      var email = (datos.get('email') || '').toString().trim();
      var pais = (datos.get('pais') || '').toString().trim();
      var tel = (datos.get('telefono') || '').toString().trim();
      var plan = (datos.get('plan') || '').toString().trim();

      if (!nombre || !email || email.indexOf('@') < 1) {
        if (error) {
          error.textContent = 'Por favor ingresa tu nombre y un correo electrónico válido para procesar tu reserva.';
          error.hidden = false;
        }
        var campoFoco = nombre ? $('#reserva input[name="email"]') : $('#reserva input[name="nombre"]');
        if (campoFoco) campoFoco.focus();
        return;
      }
      if (error) error.hidden = true;

      var lineas = [
        'Hola Trias Institute, deseo reservar mi lugar en el Diplomado Internacional Speaker Millionaire® (inicio 12 de noviembre).',
        '',
        '• Nombre: ' + nombre,
        '• Email: ' + email
      ];
      if (pais) lineas.push('• País / Ciudad: ' + pais);
      if (tel) lineas.push('• Teléfono / WhatsApp: ' + tel);
      lineas.push('• Plan de interés: ' + plan);

      var cuerpo = lineas.join('\n');

      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(cuerpo), '_blank', 'noopener');
    });
  }

  /* ---------- 9. Carrusel de razones ---------- */
  $$('.carrusel').forEach(function (caja) {
    var pista = $('.carrusel__pista', caja);
    var prev = $('[data-carrusel="prev"]', caja);
    var next = $('[data-carrusel="next"]', caja);
    if (!pista || !prev || !next) return;

    // Avanza un ancho visible menos una tarjeta, para no perder el hilo.
    function salto() {
      var tarjeta = pista.firstElementChild;
      var paso = tarjeta ? tarjeta.getBoundingClientRect().width + 16 : 300;
      return Math.max(paso, pista.clientWidth - paso);
    }

    function refrescar() {
      var max = pista.scrollWidth - pista.clientWidth - 2;
      prev.disabled = pista.scrollLeft <= 2;
      next.disabled = pista.scrollLeft >= max;
    }

    function mover(signo) {
      pista.scrollBy({ left: signo * salto(), behavior: quieto ? 'auto' : 'smooth' });
    }

    prev.addEventListener('click', function () { mover(-1); });
    next.addEventListener('click', function () { mover(1); });
    pista.addEventListener('scroll', refrescar, { passive: true });
    window.addEventListener('resize', refrescar);
    refrescar();
  });

  /* ---------- 10. Año dinámico en el pie ---------- */
  var anio = $('#anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
