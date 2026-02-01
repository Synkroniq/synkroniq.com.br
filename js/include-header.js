document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      // 🔄 Inicializa o menu somente depois que o header foi carregado
      inicializarMenu();
    });
});
