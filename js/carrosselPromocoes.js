const carrossel = document.querySelector('.carrossel');
let index = 0;

// Carregar produtos em promoção
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const agora = new Date();
    const emPromocao = produtos.filter(p => new Date(p.expiraEm) > agora);

    emPromocao.forEach(produto => {
      const div = document.createElement('div');
      div.className = 'produto';
      div.dataset.tempo = produto.expiraEm;
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.preco}</p>
        <div class="timer"></div>
        <a href="${produto.link}" class="btn-comprar">Comprar</a>
      `;
      carrossel.appendChild(div);
    });

    atualizarTimers();
    setInterval(atualizarTimers, 1000);
  });

// Timer regressivo
function atualizarTimers() {
  document.querySelectorAll('.produto').forEach(produto => {
    const tempoFinal = new Date(produto.dataset.tempo);
    const agora = new Date();
    const diff = tempoFinal - agora;
    const timer = produto.querySelector('.timer');

    if (diff <= 0) {
      timer.textContent = 'Promoção encerrada';
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    timer.textContent = `Termina em: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
  });
}

// Navegação manual
document.querySelector('.seta.esquerda').addEventListener('click', () => {
  index = (index - 1 + carrossel.children.length) % carrossel.children.length;
  carrossel.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.seta.direita').addEventListener('click', () => {
  index = (index + 1) % carrossel.children.length;
  carrossel.style.transform = `translateX(-${index * 100}%)`;
});

// Navegação automática
setInterval(() => {
  index = (index + 1) % carrossel.children.length;
  carrossel.style.transform = `translateX(-${index * 100}%)`;
}, 8000);
