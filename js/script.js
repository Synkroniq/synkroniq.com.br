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

// modal-instagram
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

const continueBtn = document.getElementById("continueInstagramBtn");
  if (continueBtn) {
    continueBtn.addEventListener("click", continueInInstagram);
  }
});

//ProdutosJSON
const produtosContainer = document.getElementById("produtos");
const buscaInput = document.getElementById("buscaProduto");
const alternarBtn = document.getElementById("alternarVisualizacao");
const letras = document.querySelectorAll(".filtro-alfabeto span");

let todosProdutos = [];

fetch("js/produtos.json")
  .then(res => res.json())
  .then(data => {
    todosProdutos = data;
    renderizarProdutos(data);
  });

function renderizarProdutos(lista) {
  produtosContainer.innerHTML = "";

  lista.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.dataset.nome = produto.nome.toLowerCase();

    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <a href="#" class="botao">Ver mais</a>
    `;

    produtosContainer.appendChild(div);
  });
}

buscaInput.addEventListener("input", () => {
  const termo = buscaInput.value.toLowerCase();
  const filtrados = todosProdutos.filter(p => p.nome.toLowerCase().includes(termo));
  renderizarProdutos(filtrados);
});

alternarBtn.addEventListener("click", () => {
  produtosContainer.classList.toggle("grade");
  produtosContainer.classList.toggle("lista");
});

letras.forEach(letra => {
  letra.addEventListener("click", () => {
    const letraSelecionada = letra.dataset.letra;
    letras.forEach(l => l.classList.remove("ativo"));
    letra.classList.add("ativo");

    if (letraSelecionada === "todos") {
      renderizarProdutos(todosProdutos);
    } else {
      const filtrados = todosProdutos.filter(p =>
        p.nome.toLowerCase().startsWith(letraSelecionada)
      );
      renderizarProdutos(filtrados);
    }
  });
});

