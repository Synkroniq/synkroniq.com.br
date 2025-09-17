function abrirWhatsApp() {
  const numero = "5544997648490"; // Exemplo: 5544999999999
  const mensagem = "Solicitação de Suporte";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
