
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

document.addEventListener("DOMContentLoaded", () => {
  // Rodapé: mostrar seções ocultas
  const footerLinks = document.querySelectorAll(".footer-links a");
  const infoSections = document.querySelectorAll(".info-oculta");

  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.id;

      infoSections.forEach((sec) => sec.classList.remove("ativo"));

      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add("ativo");
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Menu: controle de submenus
  const toggles = document.querySelectorAll(".submenu-toggle");

  toggles.forEach((toggle) => {
    const button = toggle.querySelector(".menu-btn");
    const submenu = toggle.querySelector(".submenu");

    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita conflito com clique fora
      document.querySelectorAll(".submenu").forEach((sm) => {
        if (sm !== submenu) sm.classList.remove("ativo");
      });
      submenu.classList.toggle("ativo");
    });
  });

  // Fecha submenus ao clicar fora
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".submenu-toggle")) {
      document.querySelectorAll(".submenu").forEach((sm) => sm.classList.remove("ativo"));
    }
  });

  // Fecha submenu ao clicar em um link interno
  document.querySelectorAll(".submenu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".submenu").forEach((sm) => sm.classList.remove("ativo"));
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
const categorias = document.querySelectorAll(".filtro-categorias span");

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    const categoriaSelecionada = cat.dataset.categoria;
    categorias.forEach(c => c.classList.remove("ativo"));
    cat.classList.add("ativo");

    const filtrados = categoriaSelecionada === "todos"
      ? todosProdutos
      : todosProdutos.filter(p => p.categoria === categoriaSelecionada);

    renderizarProdutos(filtrados);
  });
});
const filtroCategorias = document.getElementById("filtroCategorias");
let todosProdutos = [];

fetch("js/produtos.json")
  .then(res => res.json())
  .then(data => {
    todosProdutos = data;
    gerarCategorias(data);
    renderizarProdutos(data);
  });
    
function gerarCategorias(lista) {
  const categoriasUnicas = [...new Set(lista.map(p => p.categoria))].sort();

  filtroCategorias.innerHTML = "";

  const todas = document.createElement("span");
  todas.textContent = "Todas";
  todas.dataset.categoria = "todos";
  todas.classList.add("ativo");
  filtroCategorias.appendChild(todas);

  categoriasUnicas.forEach(cat => {
    const span = document.createElement("span");
    span.textContent = cat;
    span.dataset.categoria = cat;
    filtroCategorias.appendChild(span);
  });

  // Adiciona eventos
  const spans = filtroCategorias.querySelectorAll("span");
  spans.forEach(span => {
    span.addEventListener("click", () => {
      spans.forEach(s => s.classList.remove("ativo"));
      span.classList.add("ativo");

      const categoriaSelecionada = span.dataset.categoria;
      const filtrados = categoriaSelecionada === "todos"
        ? todosProdutos
        : todosProdutos.filter(p => p.categoria === categoriaSelecionada);

      renderizarProdutos(filtrados);
    });
  });
}
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
      <p class="categoria">${produto.categoria}</p>
      <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
      <p>${produto.descricao}</p>
      <a href="${produto.linkAfiliado}" target="_blank" class="botao">Comprar com Desconto</a>
    `;

    produtosContainer.appendChild(div);
  });
}
