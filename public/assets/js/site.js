/*
  MOVNMOTION: site-script
  Doet twee dingen: mobiel menu en verschijn-animatie.
*/
(function () {
  "use strict";

  /* ---------- Mobiel menu ---------- */
  function initMenu() {
    var button = document.getElementById("menuToggle");
    if (!button) return;
    button.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-mobile a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Verschijn-animatie bij scrollen ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  initMenu();
  initReveal();
})();
