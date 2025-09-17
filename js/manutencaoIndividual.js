function abrirWhatsApp(mensagem) {
  const numero = "+5544997648490"; // ← Substitua pelo número real da Synkroniq
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

function voltarInicio() {
  window.location.href = "index.html";
}

