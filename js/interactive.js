/**
 * TRIAS INSTITUTE - Interactive Modules
 * 1. +900 Topics Search & Filter
 * 2. Career Diagnostic Quiz (Assessor)
 * 3. 3D Card Tilt Effects
 * 4. Modals & Toast Feedback
 * 5. FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroTrilogySwitcher();
  initTopicsExplorer();
  initDiagnosticQuiz();
  init3DTilt();
  initFAQ();
  initModals();
  initForms();
});

/* ==========================================================================
   1. +900 TOPICS EXPLORER
   ========================================================================== */
const TOPICS_DATA = [
  // Oratoria & Escenario
  { title: "Oratoria y Comunicación de Alto Impacto", category: "oratoria", icon: "mic" },
  { title: "Diseño y Estructura de Conferencias Magistrales", category: "oratoria", icon: "presentation" },
  { title: "Storytelling Emocional y Persuasivo", category: "oratoria", icon: "sparkles" },
  { title: "Dominio de Escenario y Lenguaje No Verbal", category: "oratoria", icon: "activity" },
  { title: "Gestión del Miedo Escénico y Presencia Escénica", category: "oratoria", icon: "shield" },
  { title: "Negociación y Contratación de Conferencias", category: "oratoria", icon: "dollar-sign" },
  { title: "Comercialización de Keynotes para Empresas", category: "oratoria", icon: "briefcase" },

  // Marca Personal & Autoridad
  { title: "Construcción de Marca Personal de Élite", category: "marca", icon: "award" },
  { title: "Posicionamiento como Referente en tu Sector", category: "marca", icon: "trending-up" },
  { title: "Estrategia de Contenidos y Redes Sociales", category: "marca", icon: "share-2" },
  { title: "Relaciones Públicas y Aparición en Medios", category: "marca", icon: "tv" },
  { title: "Construcción de Autoridad y Reputación Digital", category: "marca", icon: "check-circle" },
  { title: "Networking de Alto Nivel con Tomadores de Decisión", category: "marca", icon: "users" },

  // Libros & Propiedad Intelectual
  { title: "Escritura y Estructuración de Libros Best-Seller", category: "editorial", icon: "book-open" },
  { title: "Creación de Metodologías y Marcos Propios", category: "editorial", icon: "layers" },
  { title: "Registro y Protección de Propiedad Intelectual", category: "editorial", icon: "lock" },
  { title: "Estrategias de Publicación y Distribución Global", category: "editorial", icon: "globe" },
  { title: "Monetización de Contenidos y Ecosistema Editorial", category: "editorial", icon: "file-text" },
  { title: "Transformación de Libros en Cursos y Masterclasses", category: "editorial", icon: "video" },

  // Consultoría & Modelos de Negocio
  { title: "Consultoría Profesional de Alto Valor", category: "consultoria", icon: "briefcase" },
  { title: "Diseño y Empaquetado de Servicios B2B", category: "consultoria", icon: "box" },
  { title: "Estructuración de Propuestas Comerciales Ganadoras", category: "consultoria", icon: "file-check" },
  { title: "Modelos de Monetización del Conocimiento", category: "consultoria", icon: "pie-chart" },
  { title: "Diagnóstico y Soluciones para Organizaciones", category: "consultoria", icon: "target" },
  { title: "Escalamiento de Procesos de Consultoría", category: "consultoria", icon: "bar-chart-2" },

  // Inteligencia Artificial & Innovación
  { title: "Inteligencia Artificial Aplicada al Conocimiento", category: "ia", icon: "cpu" },
  { title: "Herramientas de IA para Creación de Libros y Cursos", category: "ia", icon: "zap" },
  { title: "Automatización de Marca Personal con IA", category: "ia", icon: "sliders" },
  { title: "Innovación y Nuevos Formatos de Formación", category: "ia", icon: "compass" },

  // Liderazgo, Ventas & Negociación
  { title: "Liderazgo e Influencia Transformacional", category: "liderazgo", icon: "user-check" },
  { title: "Ventas Consultivas de Alto Ticket", category: "liderazgo", icon: "trending-up" },
  { title: "Negociación Estratégica Internacional", category: "liderazgo", icon: "anchor" },
  { title: "Coaching Ejecutivo y Mentoría de Líderes", category: "liderazgo", icon: "heart" },
  { title: "Productividad y Alto Rendimiento para Expertos", category: "liderazgo", icon: "clock" }
];

function initTopicsExplorer() {
  const grid = document.getElementById('topics-grid');
  const searchInput = document.getElementById('topic-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const topicsCountEl = document.getElementById('topics-count-badge');

  if (!grid) return;

  let currentCategory = 'all';
  let searchTerm = '';

  function render() {
    const filtered = TOPICS_DATA.filter(t => {
      const matchCat = currentCategory === 'all' || t.category === currentCategory;
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (topicsCountEl) {
      topicsCountEl.textContent = `Mostrando ${filtered.length} de +900 temas`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
          <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--gold-light);"></i>
          <h3>No se encontraron temas con "${searchTerm}"</h3>
          <p>Prueba con otros términos como Oratoria, Liderazgo, IA, Libros o Consultoría.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="topic-tag-card shine-effect">
        <div class="topic-tag-icon">
          <i data-lucide="${item.icon || 'check-circle'}" style="width: 22px; height: 22px;"></i>
        </div>
        <div class="topic-tag-title">${item.title}</div>
      </div>
    `).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      render();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      render();
    });
  });

  render();
}

/* ==========================================================================
   2. CAREER DIAGNOSTIC QUIZ (ASSESSOR)
   ========================================================================== */
function initDiagnosticQuiz() {
  const steps = document.querySelectorAll('.quiz-step');
  const progressBars = document.querySelectorAll('.progress-bar-seg');
  const nextBtns = document.querySelectorAll('.quiz-next-btn');
  const prevBtns = document.querySelectorAll('.quiz-prev-btn');
  const resetBtn = document.getElementById('quiz-restart-btn');

  if (steps.length === 0) return;

  let currentStep = 1;
  const userAnswers = {
    profession: 'empresario',
    years: '15+',
    goal: 'all'
  };

  // Option selection with immediate visual feedback & smooth auto-advance
  document.querySelectorAll('.quiz-option-card').forEach(card => {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.closest('.quiz-step');
      if (!parent) return;

      parent.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');

      const field = this.getAttribute('data-field');
      const val = this.getAttribute('data-value');
      if (field) userAnswers[field] = val;

      // Auto-advance to next step smoothly after a responsive 260ms delay
      setTimeout(() => {
        if (currentStep < 4) {
          goToStep(currentStep + 1);
        }
      }, 260);
    });
  });

  function goToStep(stepNum) {
    if (stepNum < 1 || stepNum > 4) return;
    currentStep = stepNum;

    steps.forEach((s, idx) => {
      if (idx + 1 === currentStep) {
        s.classList.add('active');
        s.style.display = 'block';
      } else {
        s.classList.remove('active');
        s.style.display = 'none';
      }
    });

    progressBars.forEach((bar, idx) => {
      bar.classList.toggle('completed', idx < currentStep);
    });

    if (currentStep === 4) {
      computeResult();
    }
  }

  // Next buttons
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const activeStepEl = document.querySelector('.quiz-step.active');
      if (activeStepEl) {
        let selected = activeStepEl.querySelector('.quiz-option-card.selected');
        if (!selected) {
          selected = activeStepEl.querySelector('.quiz-option-card');
          if (selected) {
            selected.classList.add('selected');
            const field = selected.getAttribute('data-field');
            const val = selected.getAttribute('data-value');
            if (field) userAnswers[field] = val;
          }
        }
      }

      if (currentStep < 4) {
        goToStep(currentStep + 1);
      }
    });
  });

  // Prev buttons
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  });

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
      userAnswers.profession = '';
      userAnswers.years = '';
      userAnswers.goal = '';
      goToStep(1);
    });
  }

  // Clickable progress bar to go back to any step
  progressBars.forEach((bar, idx) => {
    bar.style.cursor = 'pointer';
    bar.addEventListener('click', () => {
      goToStep(idx + 1);
    });
  });

  function computeResult() {
    const titleEl = document.getElementById('result-program-title');
    const descEl = document.getElementById('result-program-desc');
    const badgeEl = document.getElementById('result-program-badge');

    let title = "TRIAS 360: Programa Integral";
    let badge = "Recomendación: Trilogía Completa";
    let desc = "Tu perfil y nivel de experiencia están listos para la dimensión completa de Trias. Desarrollarás de forma coordinada tu carrera como Conferencista Magistral, tu primer Libro y tu metodología de Consultoría de Alto Valor.";
    let programVal = "trias360";

    if (userAnswers.goal === 'speaker') {
      title = "PROGRAMA DE ALTO IMPACTO PARA CONFERENCISTAS";
      badge = "Especialidad: Oratoria, Escenario & Keynotes";
      desc = "Tu prioridad es subirte a escenarios y monetizar tus keynotes. Trias te estructurará tu discurso magistral, técnicas de oratoria, presencia y estrategia de venta a congresos y empresas.";
      programVal = "conferencista";
    } else if (userAnswers.goal === 'author') {
      title = "PROGRAMA EDITORIAL PARA AUTORES DE AUTORIDAD";
      badge = "Especialidad: Libros & Propiedad Intelectual";
      desc = "Transformaremos tus años de conocimientos en un libro insignia, estructurado bajo una metodología propia registrada que te posicionará como la máxima referencia en tu área.";
      programVal = "autor";
    } else if (userAnswers.goal === 'consultant') {
      title = "PROGRAMA PARA CONSULTORES ESTRATÉGICOS";
      badge = "Especialidad: Consultoría B2B de Alto Valor";
      desc = "Convertirás tu know-how en soluciones empaquetadas de alto ticket para empresas que pagarán por tus diagnósticos y metodología probada.";
      programVal = "consultor";
    }

    if (titleEl) titleEl.textContent = title;
    if (badgeEl) badgeEl.textContent = badge;
    if (descEl) descEl.textContent = desc;

    const modalInterest = document.getElementById('program-interest');
    if (modalInterest) {
      modalInterest.value = programVal;
    }
  }

  goToStep(1);
}

/* ==========================================================================
   3. 3D CARD TILT EFFECT
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   5. MODALS & TOAST FEEDBACK
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-backdrop');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target === btn || btn.classList.contains('modal-close-btn') || btn.closest('.modal-close-btn')) {
        const activeModal = document.querySelector('.modal-backdrop.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Stop propagation inside modal container
  document.querySelectorAll('.modal-container').forEach(c => {
    c.addEventListener('click', (e) => e.stopPropagation());
  });
}

function showToast(message, title = "¡Solicitud Recibida!") {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(212, 175, 55, 0.2); display: flex; align-items: center; justify-content: center; color: var(--gold-light); font-size: 1.3rem;">
      ✓
    </div>
    <div>
      <h4 style="color: #fff; font-size: 1rem; margin-bottom: 2px;">${title}</h4>
      <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">${message}</p>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// ==========================================================================
// CONFIGURACIÓN DE WHATSAPP OFICIAL TRIAS INSTITUTE
// ==========================================================================
const TRIAS_WHATSAPP_CONFIG = {
  phoneNumber: "5511914285660", // WhatsApp oficial Trias Institute (+55 11 91428-5660)
  
  getWhatsAppUrl: function(message) {
    return `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodeURIComponent(message)}`;
  }
};

function initForms() {
  // 1. Formulario Principal de la Landing (#main-lead-form)
  const mainLeadForm = document.getElementById('main-lead-form');
  if (mainLeadForm) {
    mainLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('full-name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const programSelect = document.getElementById('program-interest');
      const programText = programSelect ? programSelect.options[programSelect.selectedIndex]?.text : 'Trias 360';
      
      const submitBtn = mainLeadForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : 'Postular';
      
      if (submitBtn) {
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin" style="width: 18px; height: 18px;"></i> <span>Abriendo WhatsApp...</span>';
        submitBtn.setAttribute('disabled', 'true');
        if (window.lucide) lucide.createIcons();
      }

      const whatsappMessage = `🏛️ *SOLICITUD DE ADMISIÓN - TRIAS INSTITUTE*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Nombre y Apellidos:* ${name}
📧 *Correo Profesional:* ${email}
📱 *Teléfono / WhatsApp:* ${phone}
🎯 *Programa de Interés:* ${programText}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *Mensaje:* Hola, acabo de completar el formulario en la web de Trias Institute y deseo recibir asesoría para iniciar mi proceso de admisión.`;

      const whatsappUrl = TRIAS_WHATSAPP_CONFIG.getWhatsAppUrl(whatsappMessage);

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalHtml;
          submitBtn.removeAttribute('disabled');
          if (window.lucide) lucide.createIcons();
        }

        // Abrir chat de WhatsApp en una pestaña nueva
        window.open(whatsappUrl, '_blank');

        mainLeadForm.reset();
        showToast("Se ha abierto WhatsApp con tu solicitud lista para enviar. ¡Un asesor te responderá de inmediato!", "¡Conexión WhatsApp Exitosa!");
      }, 600);
    });
  }

  // 2. Modal de Admisión / Evaluación (#modal-lead-form)
  const modalLeadForm = document.getElementById('modal-lead-form');
  if (modalLeadForm) {
    modalLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('m-name')?.value.trim() || '';
      const email = document.getElementById('m-email')?.value.trim() || '';
      const phone = document.getElementById('m-phone')?.value.trim() || '';
      const programSelect = document.getElementById('m-program');
      const programText = programSelect ? programSelect.options[programSelect.selectedIndex]?.text : 'Trias 360';

      const submitBtn = modalLeadForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : 'Confirmar';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Abriendo WhatsApp...</span>';
        submitBtn.setAttribute('disabled', 'true');
      }

      const whatsappMessage = `🏛️ *EVALUACIÓN DE PERFIL - TRIAS INSTITUTE*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Nombre Completo:* ${name}
📧 *Correo Electrónico:* ${email}
📱 *Teléfono / WhatsApp:* ${phone}
🎯 *Especialidad:* ${programText}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *Mensaje:* Hola, deseo coordinar mi entrevista de admisión para mi postulación en Trias Institute.`;

      const whatsappUrl = TRIAS_WHATSAPP_CONFIG.getWhatsAppUrl(whatsappMessage);

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalHtml;
          submitBtn.removeAttribute('disabled');
        }

        const activeModal = document.querySelector('.modal-backdrop.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
        }

        window.open(whatsappUrl, '_blank');
        modalLeadForm.reset();
        showToast("Conectando con WhatsApp para coordinar tu entrevista de admisión.", "¡Solicitud Enviada!");
      }, 600);
    });
  }

  // 3. Modal de Franquicias (#modal-franchise-form)
  const modalFranchiseForm = document.getElementById('modal-franchise-form');
  if (modalFranchiseForm) {
    modalFranchiseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('f-name')?.value.trim() || '';
      const email = document.getElementById('f-email')?.value.trim() || '';
      const phone = document.getElementById('f-phone')?.value.trim() || '';
      const city = document.getElementById('f-city')?.value.trim() || '';

      const submitBtn = modalFranchiseForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : 'Solicitar';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Abriendo WhatsApp...</span>';
        submitBtn.setAttribute('disabled', 'true');
      }

      const whatsappMessage = `🏛️ *POSTULACIÓN DE FRANQUICIA - TRIAS INSTITUTE*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Nombre y Apellidos:* ${name}
📧 *Correo Corporativo:* ${email}
📱 *Teléfono / WhatsApp:* ${phone}
🌍 *Ciudad y País Propuestos:* ${city}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 *Mensaje:* Hola, deseo solicitar el dossier de franquicias y postular para la representación oficial de Trias Institute en mi territorio.`;

      const whatsappUrl = TRIAS_WHATSAPP_CONFIG.getWhatsAppUrl(whatsappMessage);

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalHtml;
          submitBtn.removeAttribute('disabled');
        }

        const activeModal = document.querySelector('.modal-backdrop.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
        }

        window.open(whatsappUrl, '_blank');
        modalFranchiseForm.reset();
        showToast("Conectando con el equipo de Expansión por WhatsApp.", "¡Postulación Enviada!");
      }, 600);
    });
  }
}

/* ==========================================================================
   HERO TRILOGY & IMAGE SWITCHER (Syncing Text & Visuals)
   ========================================================================== */
const HERO_DATA = {
  speaker: {
    img: "assets/images/hero_speaker_stage.jpg",
    badge1Icon: "mic",
    badge1Title: "🎤 Disertante / Conferencista",
    badge1Sub: "Inspira · Motiva · Trasciende",
    badge2Icon: "radio",
    badge2Title: "Oratoria de Élite",
    badge2Sub: "Keynotes & Auditorios Masivos"
  },
  author: {
    img: "assets/images/hero_author_spotlight.jpg",
    badge1Icon: "book-open",
    badge1Title: "📚 Autor Referente",
    badge1Sub: "Escribe tu Legado · Ideas que Trascienden",
    badge2Icon: "feather",
    badge2Title: "Sello Editorial Trias",
    badge2Sub: "Metodología y Marcos Propios"
  },
  consultant: {
    img: "assets/images/hero_consultant_summit.jpg",
    badge1Icon: "briefcase",
    badge1Title: "💼 Consultor & Mentor",
    badge1Sub: "Experto · Estratégico · Esencial",
    badge2Icon: "trending-up",
    badge2Title: "Mentoría B2B de Alto Nivel",
    badge2Sub: "Soluciones de Alto Valor"
  },
  trias360: {
    img: "assets/images/trias_hero_main.jpg",
    badge1Icon: "award",
    badge1Title: "👑 Trilogía Trias Institute",
    badge1Sub: "Tres Caminos. Un Propósito: Dejar Huella.",
    badge2Icon: "globe",
    badge2Title: "Academia Internacional",
    badge2Sub: "Autores · Disertantes · Consultores"
  }
};

function initHeroTrilogySwitcher() {
  const switchTriggers = document.querySelectorAll('[data-hero-target]');
  const heroImg = document.getElementById('hero-active-image');
  const badge1Title = document.getElementById('hero-badge1-title');
  const badge1Sub = document.getElementById('hero-badge1-sub');
  const badge1Icon = document.getElementById('hero-badge1-icon');
  const badge2Title = document.getElementById('hero-badge2-title');
  const badge2Sub = document.getElementById('hero-badge2-sub');
  const badge2Icon = document.getElementById('hero-badge2-icon');

  if (!switchTriggers.length || !heroImg) return;

  function switchHero(targetKey) {
    const data = HERO_DATA[targetKey];
    if (!data) return;

    // Update active class on both tab buttons and trilogy pills
    switchTriggers.forEach(el => {
      if (el.getAttribute('data-hero-target') === targetKey) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Smooth image transition
    heroImg.classList.add('fade-out');
    setTimeout(() => {
      heroImg.src = data.img;
      if (badge1Title) badge1Title.textContent = data.badge1Title;
      if (badge1Sub) badge1Sub.textContent = data.badge1Sub;
      if (badge1Icon) badge1Icon.innerHTML = `<i data-lucide="${data.badge1Icon}"></i>`;
      
      if (badge2Title) badge2Title.textContent = data.badge2Title;
      if (badge2Sub) badge2Sub.textContent = data.badge2Sub;
      if (badge2Icon) badge2Icon.innerHTML = `<i data-lucide="${data.badge2Icon}"></i>`;

      if (window.lucide) lucide.createIcons();
      heroImg.classList.remove('fade-out');
    }, 220);
  }

  switchTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-hero-target');
      switchHero(target);
    });
  });
}

