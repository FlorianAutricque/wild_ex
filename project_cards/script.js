document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const iframe = document.getElementById("iframe");
      const newSrc = this.getAttribute("data-src");

      iframe.src = newSrc;

      if (this.textContent === "Music") {
        setTimeout(() => {
          alert(
            "Cette page n'est pas responsive 😊 Ciques sur ok pour continuer!"
          );
        }, 500);
      }
    });
  });
});
