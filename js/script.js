const submenuToggles = document.querySelectorAll('.submenu-toggle');

submenuToggles.forEach(toggle => {
  const button = toggle.querySelector('.menu-btn');
  const submenu = toggle.querySelector('.submenu');

  button.addEventListener('click', () => {
    const isOpen = submenu.classList.contains('ativo');

    // Fecha todos os submenus
    document.querySelectorAll('.submenu').forEach(s => s.classList.remove('ativo'));

    // Se estava fechado, abre; se já estava aberto, fecha
    if (!isOpen) {
      submenu.classList.add('ativo');
    }
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
document.addEventListener("DOMContentLoaded", () => {
  const footerLinks = document.querySelectorAll(".footer-links a");
  const infoSections = document.querySelectorAll(".info-oculta");

  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Impede o salto pro topo
      const targetId = link.dataset.id;
      infoSections.forEach((sec) => {
        sec.style.display = sec.id === targetId ? "block" : "none";
      });
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
