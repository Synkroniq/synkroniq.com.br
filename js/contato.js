function abrirWhatsApp() {
  const numero = "55SEUNUMERO"; // Exemplo: 5544999999999
  const mensagem = "Solicitação de Suporte";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
