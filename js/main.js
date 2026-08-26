
(() => {
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav-list");
  toggle?.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav-list a").forEach(a => a.addEventListener("click", () => list?.classList.remove("open")));
  const top = document.querySelector(".back-top");
  window.addEventListener("scroll", () => top?.classList.toggle("show", window.scrollY > 500));
  top?.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
  const year = document.querySelector("[data-year]");
  if(year) year.textContent = new Date().getFullYear();
})();
