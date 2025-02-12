import { API_KEY } from "./config.js";

const searchButton = document.getElementById("searchButton");
const searchQuery = document.getElementById("searchQuery");
const resultsContainer = document.getElementById("results");
const resultsContainerThumbnail = document.getElementById("results-thumbnail");
const resultsContainerTtitle = document.getElementById("results-title");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchQuery.value.trim() || "so la lune rodé";

  if (!query) return alert("Veuillez entrer un terme de recherche !");

  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=1&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";

      if (data.items.length === 0) {
        resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
      }

      const item = data.items[0];
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;

      const ttitleEl = `
      <div>
        <h2> ${title} </h2>
      </div>
    `;
      resultsContainerTtitle.innerHTML = ttitleEl;

      const thumbnailEl = `
      <div>
        <img src="${thumbnail}" alt="${title}">
      </div>
    `;
      resultsContainerThumbnail.innerHTML = thumbnailEl;

      const videoElement = `
          <div>            
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/${videoId}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      resultsContainer.innerHTML = videoElement;
    })
    .catch((error) => console.error("Erreur :", error));
});
