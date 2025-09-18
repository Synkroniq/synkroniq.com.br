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
let todosProdutos = [];

fetch("js/produtos.json")
  .then(res => res.json())
  .then(data => {
    todosProdutos = data;
    gerarCategorias(data);
    renderizarProdutos(data);
    const filtroCategorias = document.getElementById("filtroCategorias");

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
