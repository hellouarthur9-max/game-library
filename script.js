
const games = [
  {
    name: "Subway Surfers",
    category: "Mobile Ports",
    description: "Corra pelos trilhos e fuja do guarda.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
    url: "https://poki.com/br/g/subway-surfers"
  },
  {
    name: "Minecraft Classic",
    category: "Clássicos",
    description: "Construa seu próprio mundo.",
    image: "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=600",
    url: "https://classic.minecraft.net/"
  },
  {
    name: "Krunker",
    category: "Browser",
    description: "FPS multiplayer direto no navegador.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
    url: "https://krunker.io/"
  },
  {
    name: "Slither.io",
    category: "Multiplayer",
    description: "Cresça e domine o mapa.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600",
    url: "https://slither.io/"
  },
  {
    name: "Temple Run 2",
    category: "Mobile Ports",
    description: "Fuja pelas ruínas antigas.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    url: "https://poki.com/br/g/temple-run-2"
  },
  {
    name: "Agar.io",
    category: "Multiplayer",
    description: "Coma células e fique gigante.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
    url: "https://agar.io/"
  },
  {
    name: "Cookie Clicker",
    category: "Clássicos",
    description: "Construa um império de biscoitos.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600",
    url: "https://orteil.dashnet.org/cookieclicker/"
  },
  {
    name: "Shell Shockers",
    category: "Browser",
    description: "Um FPS com personagens de ovos.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600",
    url: "https://shellshock.io/"
  },
  {
    name: "2048",
    category: "Clássicos",
    description: "Combine números até chegar a 2048.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600",
    url: "https://play2048.co/"
  },
  {
    name: "Crossy Road",
    category: "Mobile Ports",
    description: "Atravesse ruas e rios.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600",
    url: "https://poki.com/br/g/crossy-road"
  }
];

const gamesContainer = document.getElementById("games");
const searchInput = document.getElementById("search");
const pageTitle = document.getElementById("page-title");
const sectionTitle = document.getElementById("section-title");
const gameCount = document.getElementById("game-count");

let currentCategory = "Todos";
let currentPage = "home";

let favorites = JSON.parse(localStorage.getItem("gameFavorites") || "[]");

function renderGames() {
  const search = searchInput.value.toLowerCase();

  let filtered = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(search);
    const matchesCategory =
      currentCategory === "Todos" ||
      game.category === currentCategory;
    const matchesFavorite =
      currentPage !== "favorites" ||
      favorites.includes(game.name);

    return matchesSearch && matchesCategory && matchesFavorite;
  });

  gamesContainer.innerHTML = "";

  gameCount.textContent = `${filtered.length} jogos encontrados`;

  if (filtered.length === 0) {
    gamesContainer.innerHTML =
      '<p class="empty">Nenhum jogo encontrado.</p>';
    return;
  }

  filtered.forEach(game => {
    const isFavorite = favorites.includes(game.name);

    const card = document.createElement("article");
    card.className = "game-card";

    const image = document.createElement("img");
    image.src = game.image;
    image.alt = game.name;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = game.name;

    const description = document.createElement("p");
    description.textContent = game.description;

    const category = document.createElement("span");
    category.className = "game-category";
    category.textContent = game.category;

    const actions = document.createElement("div");
    actions.className = "game-actions";

    const play = document.createElement("a");
    play.className = "play-button";
    play.href = game.url;
    play.target = "_blank";
    play.rel = "noopener noreferrer";
    play.textContent = "Jogar agora";

    const favorite = document.createElement("button");
    favorite.className =
      "favorite-button" + (isFavorite ? " active" : "");
    favorite.textContent = isFavorite ? "♥" : "♡";
    favorite.setAttribute("aria-label", "Favoritar " + game.name);

    favorite.addEventListener("click", () => {
      if (favorites.includes(game.name)) {
        favorites = favorites.filter(name => name !== game.name);
      } else {
        favorites.push(game.name);
      }

      localStorage.setItem(
        "gameFavorites",
        JSON.stringify(favorites)
      );

      renderGames();
    });

    actions.append(play, favorite);
    info.append(title, description, category, actions);
    card.append(image, info);
    gamesContainer.appendChild(card);
  });
}

function changePage(page, category = "Todos") {
  currentPage = page;
  currentCategory = category;

  document.querySelectorAll("nav a").forEach(link => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(
    page === "category"
      ? `[data-category="${category}"]`
      : `[data-page="${page}"]`
  );

  if (activeLink) activeLink.classList.add("active");

  const titles = {
    home: "Início",
    library: "Biblioteca",
    favorites: "Favoritos",
    category: category
  };

  pageTitle.textContent = titles[page];
  sectionTitle.textContent =
    page === "category" ? category : titles[page];

  renderGames();
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    searchInput.value = "";
    changePage(link.dataset.page);
  });
});

document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    searchInput.value = "";
    changePage("category", link.dataset.category);
  });
});

searchInput.addEventListener("input", renderGames);

renderGames();
