/* ============================================================
   NEXTMEDIA — interacciones
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav: scroll state + barra de progreso */
  var nav = document.getElementById("nm-nav");
  var toggle = document.getElementById("nm-toggle");
  var menu = document.getElementById("nm-menu");

  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
    var bar = document.getElementById("nm-progress-bar");
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (menu) menu.classList.remove("is-open");
    if (toggle) { toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }

  /* Spotlight que sigue el cursor */
  var spot = document.getElementById("nm-spotlight");
  if (spot && !reduceMotion && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", function (e) {
      spot.style.opacity = "1";
      spot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
    }, { passive: true });
    window.addEventListener("pointerleave", function () { spot.style.opacity = "0"; });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Contadores animados */
  function animateCount(el) {
    var to = parseFloat(el.getAttribute("data-to")) || 0;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var miles = el.getAttribute("data-format") === "miles";
    function fmt(n) { return miles ? n.toLocaleString("es-AR") : String(n); }
    if (reduceMotion) { el.textContent = prefix + fmt(to) + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.round(to * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".nm-count");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* Link activo segun seccion */
  var sections = document.querySelectorAll("section[id], header[id]");
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* Filtros de galeria */
  var filters = document.querySelectorAll(".nm-filter");
  var shots = document.querySelectorAll(".nm-shot");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      shots.forEach(function (shot) {
        var show = f === "all" || shot.getAttribute("data-category") === f;
        shot.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* Lightbox */
  var lb = document.getElementById("nm-lightbox");
  var lbImg = document.getElementById("nm-lightbox-img");
  var lbCap = document.getElementById("nm-lightbox-caption");
  var lbClose = document.getElementById("nm-lightbox-close");

  function openLightbox(src, caption) {
    if (!lb) return;
    lbImg.src = src; lbImg.alt = caption || "";
    lbCap.textContent = caption || "";
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.src = "";
  }
  shots.forEach(function (shot) {
    shot.addEventListener("click", function () {
      openLightbox(shot.getAttribute("data-src"), shot.getAttribute("data-caption"));
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

  /* Tracking GA4: cualquier elemento con data-ga-event dispara un evento nombrado
     (clics en WhatsApp, CTAs y servicios), en vez de depender del "click" genérico
     que no distingue qué se tocó. */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-ga-event]");
    if (!t || typeof gtag !== "function") return;
    gtag("event", t.getAttribute("data-ga-event"), {
      label: t.getAttribute("data-ga-label") || undefined,
      link_url: t.getAttribute("href") || undefined
    });
  });

  /* Formulario -> WhatsApp (convierte más que mailto, sobre todo en móvil) */
  var form = document.getElementById("nm-contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var text = "Hola Nextmedia, quiero consultar sobre una campaña.\n\n" +
                 "Nombre: " + form.name.value +
                 "\nEmail: " + form.email.value +
                 (form.company.value ? "\nMarca/empresa: " + form.company.value : "") +
                 "\n\n" + form.message.value;
      window.open("https://wa.me/5491165750770?text=" + encodeURIComponent(text),
                  "_blank", "noopener");
      // Registrar el lead en GA4 si está configurado
      if (typeof gtag === "function") gtag("event", "generate_lead", { method: "whatsapp_form" });
    });
  }
})();
