import { API_KEY } from "./config.js";

const searchButton = document.getElementById("searchButton");
const searchQuery = document.getElementById("searchQuery");
const resultsContainer = document.getElementById("results");
const resultsContainerThumbnail = document.getElementById("results-thumbnail");
const resultsContainerTitle = document.getElementById("results-title");

function searchYouTube(query = "doums roller champagne") {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=video&maxResults=1&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";

      if (data.items.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
      }

      const item = data.items[0];
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const thumbnail = item.snippet.thumbnails.medium.url;

      resultsContainerTitle.innerHTML = `<div><h2>${title}</h2></div>`;
      resultsContainerThumbnail.innerHTML = `<div><img src="${thumbnail}" alt="${title}"></div>`;

      resultsContainer.innerHTML = `
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
    })
    .catch((error) => console.error("Erreur :", error));
}

// SEARCH ON CLICK BTN
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchQuery.value.trim();
  if (!query) return alert("Enter a music!");
  searchYouTube(query);
});

window.addEventListener("load", () => {
  searchYouTube();
});
