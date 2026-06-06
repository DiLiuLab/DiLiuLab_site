const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const trackedLinks = Array.from(document.querySelectorAll(".nav-links a"));
const trackedSections = trackedLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const updateHeader = () => {
  if (!header) return;
  header.toggleAttribute("data-scrolled", window.scrollY > 8);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      trackedLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: 0.01 }
);

trackedSections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
