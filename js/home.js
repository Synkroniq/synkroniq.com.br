<script>
fetch("data/depoimentos.json")
  .then(res => res.json())
  .then(depoimentos => {
    const container = document.getElementById("carouselDepoimentos");

    depoimentos
      .filter(d => d.aprovado)
      .forEach(d => {
        const card = document.createElement("div");
        card.className = "card-depoimento";
        card.innerHTML = `
          ${d.foto ? `<img src="${d.foto}" alt="${d.nome}">` : ""}
          <h3>${d.nome}</h3>
          <p>${"⭐".repeat(d.estrelas)}</p>
          <p>${d.avaliacao}</p>
        `;
        container.appendChild(card);
      });

    let index = 0;
    const cards = container.children;
    const total = cards.length;

    if (total === 0) {
      container.innerHTML = "<p>Ainda não temos depoimentos publicados.</p>";
      return; // encerra aqui
    }

    function showCard(i) {
      for (let j = 0; j < total; j++) {
        cards[j].style.transform = `translateX(${(j - i) * 100}%)`;
      }
    }

    showCard(index);

    setInterval(() => {
      index = (index + 1) % total;
      showCard(index);
    }, 5000);
  });
</script>
