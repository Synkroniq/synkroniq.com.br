document.addEventListener("DOMContentLoaded", () => {
  // 🔎 Carregar curiosidades do JSON
  const containerCuriosidades = document.querySelector(".grid-curiosidades");
  if (containerCuriosidades) {
    fetch("data/curiosidades.json")
      .then(res => res.json())
      .then(curiosidades => {
        renderCuriosidades(curiosidades);
      });

    function renderCuriosidades(curiosidades) {
      containerCuriosidades.innerHTML = "";
      curiosidades.forEach(c => {
        const card = document.createElement("article");
        card.className = "card-curiosidade anim-esquerda";

        card.innerHTML = `
          <h3>${c.titulo}</h3>
          <p class="resumo">${c.resumo}</p>
          <button class="expandir">Leia mais</button>
          <div class="conteudo-expandido">
            <p>${c.conteudo}</p>
          </div>
        `;

        containerCuriosidades.appendChild(card);
      });

      // 🎯 Expansão dos artigos
      const botoesExpandir = containerCuriosidades.querySelectorAll(".expandir");
      botoesExpandir.forEach(botao => {
        botao.addEventListener("click", () => {
          const card = botao.closest(".card-curiosidade");
          card.classList.toggle("expandido");
          botao.textContent = card.classList.contains("expandido")
            ? "Fechar"
            : "Leia mais";
        });
      });

      // ✨ Ativar animação nos cards curiosidades
      observarCards(containerCuriosidades.querySelectorAll(".anim-esquerda, .anim-direita, .anim-cima, .anim-baixo"));
    }
  }

  // ✨ Função genérica para observar qualquer card
  function observarCards(cards) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));
  }

  // 🛠️ Serviços
  const servicos = document.querySelectorAll(".servicos .anim-esquerda, .servicos .anim-direita, .servicos .anim-cima, .servicos .anim-baixo");
  observarCards(servicos);

  // ⚡ Upgrades
  const upgrades = document.querySelectorAll(".upgrades .anim-esquerda, .upgrades .anim-direita, .upgrades .anim-cima, .upgrades .anim-baixo");
  observarCards(upgrades);
});
