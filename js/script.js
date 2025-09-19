document.addEventListener("DOMContentLoaded", () => {
  console.log("Script carregado!");

  // 🔽 Submenus interativos
  const toggles = document.querySelectorAll(".submenu-toggle");
  toggles.forEach((toggle) => {
    const button = toggle.querySelector(".menu-btn");
    const submenu = toggle.querySelector(".submenu");

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".submenu").forEach((sm) => {
        if (sm !== submenu) sm.classList.remove("ativo");
      });
      submenu.classList.toggle("ativo");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".submenu").forEach((sm) => sm.classList.remove("ativo"));
  });

  // 🧭 Scroll suave para âncoras internas
  const menuLinks = document.querySelectorAll(".menu a, .submenu a");
  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });

  // 📩 Rodapé interativo
  document.querySelectorAll(".footer-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.id;
      const target = document.getElementById(targetId);
      if (!target) return;

      document.querySelectorAll(".info-oculta").forEach((sec) => sec.classList.remove("ativo"));
      target.classList.add("ativo");
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // 🛍️ Produtos: busca, visualização, filtros
  const produtosContainer = document.getElementById("produtos");
  const buscaInput = document.getElementById("buscaProduto");
  const alternarBtn = document.getElementById("alternarVisualizacao");
  const letras = document.querySelectorAll(".filtro-alfabeto span");
  const filtroCategorias = document.getElementById("filtroCategorias");
  let todosProdutos = [];

  if (filtroCategorias) {
    fetch("js/produtos.json")
      .then(res => res.json())
      .then(data => {
        todosProdutos = data;
        gerarCategorias(data);
        renderizarProdutos(data);

        // 🔍 Busca por nome
        buscaInput.addEventListener("input", () => {
          const termo = buscaInput.value.toLowerCase();
          const filtrados = todosProdutos.filter(p =>
            p.nome.toLowerCase().includes(termo)
          );
          renderizarProdutos(filtrados);
        });

        // 🔁 Alternância entre grade e lista
        alternarBtn.addEventListener("click", () => {
          produtosContainer.classList.toggle("grade");
          produtosContainer.classList.toggle("lista");
        });

        // 🔤 Filtro por letra inicial
        letras.forEach(letra => {
          letra.addEventListener("click", () => {
            const inicial = letra.textContent.toLowerCase();
            letras.forEach(l => l.classList.remove("ativo"));
            letra.classList.add("ativo");

            const filtrados = todosProdutos.filter(p =>
              p.nome.toLowerCase().startsWith(inicial)
            );
            renderizarProdutos(filtrados);
          });
        });
      });
  }
});

// ⚠️ Modal Instagram
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

// 🧠 Funções auxiliares
function gerarCategorias(lista) {
  const filtroCategorias = document.getElementById("filtroCategorias");
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

  // Eventos de clique nas categorias
  const spans = filtroCategorias.querySelectorAll("span");
  spans.forEach(span => {
    span.addEventListener("click", () => {
      spans.forEach(s => s.classList.remove("ativo"));
      span.classList.add("ativo");

      const categoriaSelecionada = span.dataset.categoria;
      const filtrados = categoriaSelecionada === "todos"
      ? todosProdutos
      : todosProdutos.filter(p =>
          p.categoria.toLowerCase().trim() === categoriaSelecionada.toLowerCase().trim()
        );

      renderizarProdutos(filtrados);
    });
  });
}

function renderizarProdutos(lista) {
  const produtosContainer = document.getElementById("produtos");
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
