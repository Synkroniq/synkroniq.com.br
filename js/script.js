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


  function openInBrowser() {
  window.location.href = "https://www.synkroniq.com.br";
}

function continueInInstagram() {
  document.getElementById("instagramModal").style.display = "none";
  alert("⚠️ Você optou por continuar no Instagram. Ao clicar em links de compra, selecione 'Abrir no navegador' para garantir o funcionamento correto.");
}

window.addEventListener("load", function () {
  const ua = navigator.userAgent.toLowerCase();
  const ref = document.referrer.toLowerCase();
  const isInstagram = ua.includes("instagram");
  const cameFromInstagram = ref.includes("instagram.com") || ref === "";

  const alreadyShown = sessionStorage.getItem("instagramModalShown");

  if (isInstagram && cameFromInstagram && !alreadyShown) {
    document.getElementById("instagramModal").style.display = "flex";
    sessionStorage.setItem("instagramModalShown", "true");
  }

  document.getElementById("openBrowserBtn").addEventListener("click", openInBrowser);
  document.getElementById("continueInstagramBtn").addEventListener("click", continueInInstagram);
});

