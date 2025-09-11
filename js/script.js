console.log("JavaScript carregado!");

// Submenus: abrir/fechar ao clicar
const submenuToggles = document.querySelectorAll(".submenu-toggle");

submenuToggles.forEach((toggle) => {
  const button = toggle.querySelector(".menu-btn");
  const submenu = toggle.querySelector(".submenu");

  button.addEventListener("click", () => {
    const isVisible = submenu.style.display === "block";

    // Fecha todos os submenus
    document
      .querySelectorAll(".submenu")
      .forEach((s) => (s.style.display = "none"));

    // Abre ou fecha o submenu clicado
    submenu.style.display = isVisible ? "none" : "block";
  });
});

// Scroll suave para seções do menu principal
const menuLinks = document.querySelectorAll(".menu a, .submenu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Rodapé: mostrar seções ocultas
const footerLinks = document.querySelectorAll(".footer-links a");
const infoSections = document.querySelectorAll(".info-oculta");

footerLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.textContent.toLowerCase().replace(/ /g, "");
    infoSections.forEach((sec) => {
      sec.style.display = sec.id === targetId ? "block" : "none";
    });
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

