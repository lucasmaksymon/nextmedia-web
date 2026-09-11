/* Recuerda el idioma elegido al hacer clic en el selector */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".nm-lang a[data-lang]");
    if (!a) return;
    try { localStorage.setItem("nm-lang-choice", a.getAttribute("data-lang")); } catch (_) {}
  });
})();
