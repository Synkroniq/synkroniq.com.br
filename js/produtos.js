document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaProdutos");
  const filtroCategoria = document.getElementById("categoria");
  const campoBusca = document.getElementById("busca-produtos");

  let produtos = [];

  // 🔎 Carregar produtos do JSON
  fetch("data/produtos.json")
    .then(res => res.json())
    .then(data => {
      produtos = data;
      renderProdutos(produtos);

      // 🎯 Filtro por categoria
      filtroCategoria.addEventListener("change", aplicarFiltros);

      // 🔎 Filtro por busca
      campoBusca.addEventListener("input", aplicarFiltros);
    })
    .catch(err => {
      console.error("Erro ao carregar produtos:", err);
      lista.innerHTML = "<p>Não foi possível carregar os produtos.</p>";
    });

  // 🖼️ Renderizar produtos
  function renderProdutos(listaProdutos) {
    lista.innerHTML = "";
    if (listaProdutos.length === 0) {
      lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    listaProdutos.forEach(p => {
      const card = document.createElement("div");
      card.className = "card-produto";
      card.innerHTML = `
        <img src="${p.imagem}" alt="${p.titulo}">
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
        <a href="${p.link}" target="_blank" class="btn-comprar">${p.botao}</a>
      `;
      lista.appendChild(card);
    });
  }

  // ⚡ Função para aplicar filtros combinados
  function aplicarFiltros() {
    const categoria = filtroCategoria.value;
    const termo = campoBusca.value.toLowerCase();

    let filtrados = produtos;

    // Filtro por categoria
    if (categoria !== "todos") {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    // Filtro por busca
    if (termo) {
      filtrados = filtrados.filter(p =>
        p.titulo.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        (p.categoria && p.categoria.toLowerCase().includes(termo))
      );
    }

    renderProdutos(filtrados);
  }
});
