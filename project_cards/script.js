document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (event) {
      if (this.target === "_blank") return;

      event.preventDefault();
      const iframe = document.getElementById("iframe");
      const newSrc = this.getAttribute("data-src");

      iframe.src = newSrc;

      if (this.textContent.trim() === "Music") {
        setTimeout(() => {
          alert(
            "Cette page n'est pas responsive 😊 Cliques sur ok pour continuer"
          );
        }, 500);
      }
    });
  });
});
