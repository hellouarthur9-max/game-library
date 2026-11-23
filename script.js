
const games = [
  {
    name: "Subway Surfers",
    category: "Mobile Ports",
    description: "Corra pelos trilhos e fuja do guarda.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700",
    url: "https://poki.com/br/g/subway-surfers"
  },
  {
    name: "Minecraft Classic",
    category: "Clássicos",
    description: "Construa seu próprio mundo.",
    image: "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=700",
    url: "https://classic.minecraft.net/"
  },
  {
    name: "Krunker",
    category: "FPS",
    description: "FPS multiplayer no navegador.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700",
    url: "https://krunker.io/"
  },
  {
    name: "Slither.io",
    category: "Multiplayer",
    description: "Cresça e domine o mapa.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700",
    url: "https://slither.io/"
  },
  {
    name: "Temple Run 2",
    category: "Mobile Ports",
    description: "Fuja pelas ruínas antigas.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700",
    url: "https://poki.com/br/g/temple-run-2"
  },
  {
    name: "Agar.io",
    category: "Multiplayer",
    description: "Coma células e fique gigante.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700",
    url: "https://agar.io/"
  },
  {
    name: "Cookie Clicker",
    category: "Clássicos",
    description: "Construa um império de biscoitos.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700",
    url: "https://orteil.dashnet.org/cookieclicker/"
  },
  {
    name: "Shell Shockers",
    category: "FPS",
    description: "Um FPS com personagens de ovos.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700",
    url: "https://shellshock.io/"
  },
  {
    name: "2048",
    category: "Puzzle",
    description: "Combine números até chegar a 2048.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700",
    url: "https://play2048.co/"
  },
  {
    name: "Crossy Road",
    category: "Mobile Ports",
    description: "Atravesse ruas e rios.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700",
    url: "https://poki.com/br/g/crossy-road"
  }
];

const homePage = document.getElementById("home-page");
const libraryPage = document.getElementById("library-page");
const container = document.getElementById("games");
const search = document.getElementById("search");

let currentPage = "home";

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
  currentPage = page;

  homePage.hidden = page !== "home";
  libraryPage.hidden = page !== "library";

  search.hidden = page !== "library";

  document.querySelectorAll("[data-page]").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === page
    );
  });

  document.getElementById("page-title").textContent =
    page === "home" ? "Início" : "Biblioteca";

  document.getElementById("page-description").textContent =
    page === "home"
      ? "Bem-vindo ao Hero Games."
      : "Explore nossa coleção de jogos.";

  search.value = "";

  if (page === "library") {
    renderGames();
  }
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

changePage("home");
