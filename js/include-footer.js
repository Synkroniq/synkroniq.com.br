document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;

      // Abrir modal
      document.querySelectorAll(".abrir-modal").forEach(link => {
        link.addEventListener("click", function(e) {
          e.preventDefault();
          const modalId = "modal-" + this.dataset.modal;
          document.getElementById(modalId).style.display = "block";
        });
      });

      // Fechar modal no X
      document.querySelectorAll(".modal .fechar").forEach(btn => {
        btn.addEventListener("click", function() {
          this.closest(".modal").style.display = "none";
        });
      });

      // Fechar modal clicando fora
      window.addEventListener("click", function(e) {
        document.querySelectorAll(".modal").forEach(modal => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });
      });
    });
});
