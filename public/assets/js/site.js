/*
  MOVNMOTION: site-script
  Doet drie dingen: mobiel menu, verschijn-animatie en het blokje "Volgende keer" bij MOVN SUNDAYS.
  De data voor dat blokje staat in data/events.js (daar pas je datums aan).
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

  /* ---------- Volgende MOVN SUNDAYS ---------- */
  function todayInAmsterdam() {
    // "2026-11-15"-notatie, zodat datums als tekst vergeleken kunnen worden
    return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" });
  }

  function formatDate(isoDate) {
    var date = new Date(isoDate + "T12:00:00Z");
    return date.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "Europe/Amsterdam",
    });
  }

  function initNextEdition() {
    var box = document.getElementById("nextEdition");
    if (!box) return;
    var events = Array.isArray(window.MOVN_EVENTS) ? window.MOVN_EVENTS : [];
    var today = todayInAmsterdam();
    var upcoming = events
      .filter(function (e) {
        return e && typeof e.datum === "string" && e.datum >= today;
      })
      .sort(function (a, b) {
        return a.datum < b.datum ? -1 : 1;
      });
    if (!upcoming.length) return; // niets gepland of alles voorbij: blok blijft verborgen

    var next = upcoming[0];
    var when = formatDate(next.datum) + (next.tijd ? " om " + next.tijd : "");
    box.querySelector(".next-edition__when").textContent = when;

    var where = box.querySelector(".next-edition__where");
    where.textContent = next.plaats || "";
    where.hidden = !next.plaats;

    var note = box.querySelector(".next-edition__note");
    note.textContent = next.opmerking || "";
    note.hidden = !next.opmerking;

    var link = box.querySelector(".next-edition__link");
    if (next.link) {
      link.href = next.link;
    }
    link.hidden = !next.link;

    box.hidden = false;
  }

  initMenu();
  initReveal();
  initNextEdition();
})();
