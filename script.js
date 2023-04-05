
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const result = document.querySelector("#result");
const more = document.querySelector("#more");

const baseUrl = "https://api.lyrics.ovh";

async function searchSongs(value) {
  const response = await fetch(`${baseUrl}/suggest/${value}`);
  const data = await response.json();
  console.log(data);
  showData(data);
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
        .join("")}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
        ${data.prev ? `<button onlick="getMoreSongs('${data.prev}')">Prev</button>` : ""}

        ${
          data.next
            ? `<button onlick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
    `;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log("line 47", data);
  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim();
  console.log(searchValue);
  if (!searchValue) {
    alert("Please type in a search value");
  } else {
    searchSongs(searchValue);
  }
});