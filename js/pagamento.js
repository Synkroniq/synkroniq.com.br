function copiarPix() {
  const chave = "88a7f686-2995-4c51-b787-37c06755b569";
  navigator.clipboard.writeText(chave).then(() => {
    alert("Chave Pix copiada com sucesso!");
  });
}
