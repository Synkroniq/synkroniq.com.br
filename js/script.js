let todosProdutos = [];
let produtosContainer;
let produtosPorPagina = 30;
let paginaAtual = 1;

document.addEventListener("DOMContentLoaded", () => {
  produtosContainer = document.getElementById("produtos");
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
 
  const buscaInput = document.getElementById("buscaProduto");
  const alternarBtn = document.getElementById("alternarVisualizacao");
  const letras = document.querySelectorAll(".letras-lista span");
  const filtroCategorias = document.getElementById("filtroCategorias");
  const toggleAlfabetoBtn = document.getElementById("toggleAlfabeto");
  const filtroAlfabeto = document.querySelector(".filtro-alfabeto");

  if (filtroCategorias) {
    fetch("js/produtos.json")
      .then(res => res.json())
      .then(data => {
        todosProdutos = data;
        gerarCategorias(data);
        renderizarPagina(1);
        setInterval(atualizarContadores, 1000);

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
        
        toggleAlfabetoBtn.addEventListener("click", () => {
  filtroAlfabeto.classList.toggle("ativo");
});

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
  const todasCategorias = lista.flatMap(p => Array.isArray(p.categoria) ? p.categoria : [p.categoria]);
  const categoriasUnicas = [...new Set(todasCategorias)].sort();

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
  : todosProdutos.filter(p => {
      const categorias = Array.isArray(p.categoria) ? p.categoria : [p.categoria];
      return categorias.some(cat =>
        cat.toLowerCase().trim() === categoriaSelecionada.toLowerCase().trim()
      );
    });

renderizarProdutos(filtrados);
    });
  });
}

function renderizarProdutos(lista) {
  produtosContainer.innerHTML = "";

  lista.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.dataset.nome = produto.nome.toLowerCase();

    const linkSeguro = `redirecionar.html?url=${encodeURIComponent(produto.linkAfiliado)}`;

    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="categoria">${produto.categoria}</p>
      <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
      <p>${produto.descricao}</p>
      <a href="${linkSeguro}" target="_blank" class="botao">Comprar com Desconto</a>
    `;
    if (produto.expiraEm) {
      const expira = new Date(produto.expiraEm);
      const agora = new Date();
    if (expira > agora) {
        div.innerHTML += `
          <a href="${linkSeguro}" target="_blank" class="botao">Comprar com Desconto</a>
          <div class="contador" data-expira="${produto.expiraEm}"></div>
        `;
      } else {
        div.innerHTML += `<a class="botao esgotado">Oferta Esgotada</a>`;
      }
    } else {
      div.innerHTML += `<a href="${linkSeguro}" target="_blank" class="botao">Comprar</a>`;
    }

    produtosContainer.appendChild(div);
  });
}

function renderizarPagina(pagina) {
  const inicio = (pagina - 1) * produtosPorPagina;
  const fim = inicio + produtosPorPagina;
  const produtosPagina = todosProdutos.slice(inicio, fim);
  renderizarProdutos(produtosPagina);
  atualizarControles(pagina);
}

function atualizarControles(pagina) {
  const totalPaginas = Math.ceil(todosProdutos.length / produtosPorPagina);
  const controlesContainer = document.getElementById("controles");
  controlesContainer.innerHTML = "";

  if (pagina > 1) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "← Anterior";
    btnAnterior.onclick = () => renderizarPagina(pagina - 1);
    controlesContainer.appendChild(btnAnterior);
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = (i === pagina) ? "ativo" : "";
    btn.onclick = () => renderizarPagina(i);
    controlesContainer.appendChild(btn);
  }

  if (pagina < totalPaginas) {
    const btnProximo = document.createElement("button");
    btnProximo.textContent = "Próxima →";
    btnProximo.onclick = () => renderizarPagina(pagina + 1);
    controlesContainer.appendChild(btnProximo);
  }
}

function atualizarContadores() {
  const contadores = document.querySelectorAll(".contador");

  contadores.forEach(contador => {
    const expiraEm = new Date(contador.dataset.expira);
    const agora = new Date();
    const tempo = expiraEm - agora;

    const botao = contador.previousElementSibling;

    if (tempo <= 0) {
      botao.textContent = "Oferta Esgotada";
      botao.classList.add("esgotado");
      botao.removeAttribute("href");
      botao.removeAttribute("target");
      contador.remove();
      return;
    }

    const segundos = Math.floor((tempo / 1000) % 60);
    const minutos = Math.floor((tempo / 1000 / 60) % 60);
    const horas = Math.floor((tempo / 1000 / 60 / 60) % 24);
    const dias = Math.floor((tempo / 1000 / 60 / 60 / 24));

    const texto = `TERMINA EM: ${dias}D ${horas.toString().padStart(2, '0')} : ${minutos.toString().padStart(2, '0')} : ${segundos.toString().padStart(2, '0')}`;
    contador.textContent = texto;
  });
}
