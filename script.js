
let games = [];

const homePage = document.getElementById("home-page");
const libraryPage = document.getElementById("library-page");
const container = document.getElementById("games");
const search = document.getElementById("search");

function renderGames() {
  const query = search.value.toLowerCase();

  const filtered = games.filter(game =>
    game.name.toLowerCase().includes(query)
  );

  container.innerHTML = "";

  document.getElementById("game-count").textContent =
    `${filtered.length} jogos encontrados`;

  if (filtered.length === 0) {
    container.innerHTML =
      '<p class="empty">Nenhum jogo encontrado.</p>';
    return;
  }

  filtered.forEach(game => {
    const card = document.createElement("article");
    card.className = "game-card";

    const img = document.createElement("img");
    img.src = game.image;
    img.alt = game.name;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = game.name;

    const description = document.createElement("p");
    description.textContent = game.description;

    const actions = document.createElement("div");
    actions.className = "game-actions";

    const category = document.createElement("span");
    category.className = "game-category";
    category.textContent = game.category;

    const play = document.createElement("a");
    play.className = "play-button";
    play.href = game.url;
    play.target = "_blank";
    play.rel = "noopener noreferrer";
    play.textContent = "▶";
    play.setAttribute("aria-label", "Jogar " + game.name);

    actions.append(category, play);
    info.append(title, description, actions);
    card.append(img, info);

    container.appendChild(card);
  });
}

function changePage(page) {
  homePage.hidden = page !== "home";
  libraryPage.hidden = page !== "library";

  search.hidden = page !== "library";

  document.querySelectorAll("[data-page]").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  document.getElementById("page-title").textContent =
    page === "home" ? "Início" : "Biblioteca";

  document.getElementById("page-description").textContent =
    page === "home"
      ? "Bem-vindo ao Hero Games."
      : "Explore nossa coleção de jogos.";

  search.value = "";

  if (page === "library") renderGames();
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    changePage(link.dataset.page);
  });
});

document.getElementById("explore-button").addEventListener("click", () => {
  changePage("library");
});

search.addEventListener("input", renderGames);

async function startSite() {
  try {
    const response = await fetch("./games.json");
    if (!response.ok) throw new Error("Não foi possível carregar o catálogo.");

    games = await response.json();
    changePage("home");
  } catch (error) {
    container.innerHTML =
      '<p class="empty">Erro ao carregar os jogos. Verifique o arquivo games.json.</p>';
    console.error(error);
  }
}

startSite();
