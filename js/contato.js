function abrirWhatsApp() {
  const numero = "+5544997648490"; // ← Substitua pelo número real com DDI + DDD
  const mensagem = "Solicitação de Suporte";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
