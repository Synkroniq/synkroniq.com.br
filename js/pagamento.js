function copiarPix() {
  const chave = document.getElementById("chavePix").textContent;
  navigator.clipboard.writeText(chave).then(() => {
    alert("Chave Pix copiada com sucesso!");
  });
}
