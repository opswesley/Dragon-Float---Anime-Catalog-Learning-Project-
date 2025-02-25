let displayedAnimes = [];

const APP_TOKEN = "COLOQUE AQUI SUA KEY";

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

let currentPage = 1;
const ITEMS_PER_PAGE = 12;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const openModalWithDebounce = debounce(openModal, 300);

const animes2025 = [
  { title: "Solo Leveling Season 2: Arise from the Shadow", genres: ["Action", "Fantasy"], episodes: "TBA", synopsis: "Sung Jinwoo continues his journey as the Shadow Monarch.", releaseDate: "January 4, 2025" },
  { title: "Sakamoto Days", genres: ["Action", "Comedy"], episodes: "24", synopsis: "A retired assassin protects his family.", releaseDate: "January 11, 2025" },
  { title: "My Happy Marriage Season 2", genres: ["Romance", "Fantasy"], episodes: "TBA", synopsis: "Miyo and Kiyoka deepen their bond.", releaseDate: "January 6, 2025" },
  { title: "The Apothecary Diaries Season 2", genres: ["Mystery", "Historical"], episodes: "TBA", synopsis: "Maomao faces new palace intrigues.", releaseDate: "January 9, 2025" },
  { title: "Zenshu", genres: ["Fantasy", "Drama"], episodes: "TBA", synopsis: "An animator rewrites her fate in an anime world.", releaseDate: "January 5, 2025" },
  { title: "Honey Lemon Soda", genres: ["Romance"], episodes: "TBA", synopsis: "Uka overcomes her past with a new friend.", releaseDate: "January 8, 2025" },
  { title: "Bogus Skill 'Fruitmaster'", genres: ["Fantasy", "Comedy"], episodes: "TBA", synopsis: "Light turns a useless skill into ultimate power.", releaseDate: "January 10, 2025" },
  { title: "OKITSURA: Fell in Love with an Okinawan Girl", genres: ["Romance", "Comedy"], episodes: "TBA", synopsis: "Teruaki navigates love and dialects in Okinawa.", releaseDate: "January 7, 2025" },
  { title: "Witch Hat Atelier", genres: ["Fantasy"], episodes: "TBA", synopsis: "Coco learns the secrets of magic.", releaseDate: "Spring 2025" },
  { title: "Fire Force Season 3", genres: ["Action", "Supernatural"], episodes: "TBA", synopsis: "Shinra fights to end the infernos.", releaseDate: "April 2025" },
  { title: "One Piece (Remake)", genres: ["Adventure"], episodes: "TBA", synopsis: "A modern retelling of Luffy's journey.", releaseDate: "January 2025" },
  { title: "Kaiju No. 8 Season 2", genres: ["Action", "Sci-Fi"], episodes: "TBA", synopsis: "Kafka faces new kaiju threats.", releaseDate: "Summer 2025" },
  { title: "Dandadan Season 2", genres: ["Supernatural", "Comedy"], episodes: "TBA", synopsis: "Momo and Okarun continue their bizarre adventures.", releaseDate: "Fall 2025" },
  { title: "Lazarus", genres: ["Sci-Fi", "Action"], episodes: "TBA", synopsis: "A task force hunts for a cure in 2052.", releaseDate: "2025" },
  { title: "My Hero Academia Season 8", genres: ["Action", "Superhero"], episodes: "TBA", synopsis: "Deku faces the final battle against All For One.", releaseDate: "Fall 2025" },
  { title: "Chainsaw Man: The Reze Arc (Movie)", genres: ["Action", "Horror"], episodes: "N/A", synopsis: "Denji encounters the Bomb Devil.", releaseDate: "2025" },
  { title: "Spy x Family Season 3", genres: ["Comedy", "Action"], episodes: "TBA", synopsis: "The Forger family faces new missions.", releaseDate: "October 2025" },
  { title: "Dr. Stone: Science Future", genres: ["Adventure", "Sci-Fi"], episodes: "TBA", synopsis: "Senku continues rebuilding civilization.", releaseDate: "January 9, 2025" },
  { title: "Blue Exorcist: The Blue Night Saga", genres: ["Action", "Supernatural"], episodes: "TBA", synopsis: "Rin uncovers the truth about his origins.", releaseDate: "January 4, 2025" },
  { title: "Gachiakuta", genres: ["Action", "Fantasy"], episodes: "TBA", synopsis: "Rudo fights back against an oppressive society.", releaseDate: "2025" },
  { title: "The Beginning After the End", genres: ["Fantasy", "Isekai"], episodes: "TBA", synopsis: "King Grey seeks redemption in a new world.", releaseDate: "2025" },
  { title: "Yaiba (Reboot)", genres: ["Action", "Comedy"], episodes: "TBA", synopsis: "A young samurai battles a demonic rival.", releaseDate: "Spring 2025" },
  { title: "Mobile Suit Gundam GQuX", genres: ["Mecha", "Sci-Fi"], episodes: "TBA", synopsis: "An underground mech-fighting ring in a space colony.", releaseDate: "2025" },
  { title: "One-Punch Man Season 3", genres: ["Action", "Comedy"], episodes: "TBA", synopsis: "Saitama faces new challenges with one punch.", releaseDate: "2025" },
  { title: "Princess Principal: Crown Handler - Chapter 4", genres: ["Action", "Mystery"], episodes: "N/A", synopsis: "The spies continue their covert operations.", releaseDate: "May 23, 2025" },
  { title: "My Status as an Assassin Obviously Exceeds the Hero's", genres: ["Action", "Isekai"], episodes: "TBA", synopsis: "Akira outshines the hero in a fantasy world.", releaseDate: "October 2025" }
];

document.addEventListener("DOMContentLoaded", async () => {
  await loadMoreAnimes();
  loadSavedTheme();
  setupBackToTop();
  setupCardClickHandlers();
});

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("selectedTheme") || "dark-fantasy";
  changeTheme(savedTheme);
}

function changeTheme(theme) {
  const body = document.body;
  if (!body) {
    return;
  }
  body.className = '';
  body.classList.add(`theme-${theme}`);
  localStorage.setItem("selectedTheme", theme);
}

async function fetchAnimeImage(title, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodedTitle}&limit=1`);
        if (!response.ok) {
          if (response.status === 429) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return resolve(await fetchAnimeImage(title, 1000));
          }
          throw new Error(`Error in Jikan request for "${title}": ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const anime = data.data[0];
          resolve({
            thumbnail: anime.images?.jpg?.image_url || "https://placekitten.com/150/200",
            fullImage: anime.images?.jpg?.large_image_url || "https://placekitten.com/400/600"
          });
        } else {
          resolve({
            thumbnail: "https://placekitten.com/150/200",
            fullImage: "https://placekitten.com/400/600"
          });
        }
      } catch (error) {
        alert("Houve um problema ao carregar as imagens. Usando placeholders.");
        resolve({
          thumbnail: "https://placekitten.com/150/200",
          fullImage: "https://placekitten.com/400/600"
        });
      }
    }, delay);
  });
}

async function fetchAdditionalImages(title) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodedTitle}&limit=1`);
    if (!response.ok) {
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchAdditionalImages(title);
      }
      throw new Error(`Error fetching anime for "${title}": ${response.status}`);
    }
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      const anime = data.data[0];
      const picturesResponse = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/pictures`);
      if (!picturesResponse.ok) {
        if (picturesResponse.status === 429) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return fetchAdditionalImages(title);
        }
        throw new Error(`Error fetching pictures for "${title}": ${picturesResponse.status}`);
      }
      const picturesData = await picturesResponse.json();
      const images = picturesData.data
        .map(pic => pic.jpg.large_image_url || pic.jpg.image_url)
        .filter(Boolean)
        .slice(0, 5);
      return images.length > 0 ? images : [anime.images.jpg.large_image_url || "https://placekitten.com/400/600"];
    }
    return [];
  } catch (error) {
    return [];
  }
}

async function fetchAnimeImagesInBatch(animes, batchSize = 5) {
  const results = [];
  for (let i = 0; i < animes.length; i += batchSize) {
    const batch = animes.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((anime, index) => fetchAnimeImage(anime.title, index * 100))
    );
    results.push(...batchResults);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return results;
}

function loadCache(page) {
  const cachedData = localStorage.getItem("animeCatalogData");
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    if (parsedData[page] && Date.now() - parsedData[page].timestamp < CACHE_EXPIRATION) {
      return parsedData[page].data;
    }
  }
  return null;
}

function saveCache(data, page) {
  const cachedData = JSON.parse(localStorage.getItem("animeCatalogData") || "{}");
  cachedData[page] = { data, timestamp: Date.now() };
  localStorage.setItem("animeCatalogData", JSON.stringify(cachedData));
}

function formatSynopsis(text) {
  if (!text) return "<p>No description available</p>";
  let paragraphs = text.split(/\n\s*\n|\n|\.\s+/).filter(p => p.trim().length > 0);
  const sourceMatch = paragraphs.join(" ").match(/\((Source:.*)\)/);
  const noteMatch = paragraphs.join(" ").match(/(Note:.*)/);
  
  if (sourceMatch || noteMatch) {
    paragraphs = [];
    if (text.includes("Source:")) {
      const parts = text.split(/\((Source:.*)\)/);
      parts.forEach((part, index) => {
        if (part.trim()) {
          if (index === 1) {
            paragraphs.push(`<p class="source-note">(${part.trim()})</p>`);
          } else {
            paragraphs.push(`<p>${part.trim()}</p>`);
          }
        }
      });
    } else if (text.includes("Note:")) {
      const parts = text.split(/(Note:.*)/);
      parts.forEach((part, index) => {
        if (part.trim()) {
          if (index === 1) {
            paragraphs.push(`<p class="source-note">${part.trim()}</p>`);
          } else {
            paragraphs.push(`<p>${part.trim()}</p>`);
          }
        }
      });
    }
  } else {
    paragraphs = text.split(/\.\s+/).map(p => p.trim() + ".").filter(p => p.length > 1);
    paragraphs = paragraphs.map(p => `<p>${p}</p>`);
  }
  return paragraphs.join("");
}

async function loadMoreAnimes() {
  const gallery = document.getElementById("animeGallery");
  const loading = document.getElementById("loading");
  const loadMore = document.getElementById("loadMore");

  if (!gallery) {
    document.body.innerHTML += "<p style='color: red; text-align: center;'>Erro: Não foi possível carregar a galeria.</p>";
    return;
  }

  loading.style.display = "block";

  const cachedAnimes = loadCache(currentPage);
  if (cachedAnimes) {
    displayedAnimes.push(...cachedAnimes);
    appendToGallery(cachedAnimes);
    loading.style.display = "none";
    updateLoadMoreButton();
    currentPage++;
    return;
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageAnimes = animes2025.slice(start, end);

  if (pageAnimes.length === 0) {
    loading.style.display = "none";
    loadMore.disabled = true;
    return;
  }

  const images = await fetchAnimeImagesInBatch(pageAnimes);
  const newAnimes = pageAnimes.map((anime, index) => ({ ...anime, ...images[index] }));
  saveCache(newAnimes, currentPage);

  displayedAnimes.push(...newAnimes);
  appendToGallery(newAnimes);
  loading.style.display = "none";
  updateLoadMoreButton();
  currentPage++;
}

function appendToGallery(animesToAdd) {
  const gallery = document.getElementById("animeGallery");
  animesToAdd.forEach((anime, index) => {
    setTimeout(() => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${anime.thumbnail}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.genres.join(", ")}</p>
      `;
      card.addEventListener("click", () => openModalWithDebounce(displayedAnimes.indexOf(anime)));
      gallery.appendChild(card);
    }, index * 100);
  });
}

function updateLoadMoreButton() {
  const loadMore = document.getElementById("loadMore");
  const totalAnimes = animes2025.length;
  loadMore.disabled = displayedAnimes.length >= totalAnimes;
}

async function openModal(index) {
  const anime = displayedAnimes[index];
  if (!anime) {
    return;
  }
  
  document.getElementById("modalImage").src = anime.fullImage;
  document.getElementById("modalTitle").textContent = anime.title;
  document.getElementById("modalGenres").textContent = anime.genres.join(", ");
  const episodesElement = document.getElementById("modalEpisodes");
  if (anime.episodes && anime.episodes !== "Desconhecido" && anime.episodes.trim()) {
    episodesElement.textContent = anime.episodes;
  } else {
    episodesElement.textContent = "";
  }
  document.getElementById("modalSynopsis").innerHTML = formatSynopsis(anime.synopsis);

  const modalContent = document.querySelector(".modal-content");
  const existingCarousel = modalContent.querySelector(".image-carousel");
  if (existingCarousel) {
    existingCarousel.remove();
  }

  const carousel = document.createElement("div");
  carousel.className = "image-carousel";
  
  const additionalImages = await fetchAdditionalImages(anime.title);
  if (additionalImages.length > 0) {
    const container = document.createElement("div");
    container.className = "carousel-container";
    container.innerHTML = additionalImages.map(img => `<img src="${img}" alt="Image from ${anime.title}">`).join("");

    const prevButton = document.createElement("button");
    prevButton.className = "carousel-prev";
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextButton = document.createElement("button");
    nextButton.className = "carousel-next";
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

    carousel.appendChild(container);
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    let currentIndex = 0;
    const images = container.querySelectorAll("img");
    const imageWidth = 160;

    function updateCarousel() {
      const maxIndex = images.length - Math.floor(carousel.offsetWidth / imageWidth);
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      container.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex;
    }

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextButton.addEventListener("click", () => {
      const maxIndex = images.length - Math.floor(carousel.offsetWidth / imageWidth);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    images.forEach((img, imgIndex) => {
      img.addEventListener("click", () => {
        const fullscreen = document.createElement("div");
        fullscreen.className = "image-fullscreen";
        fullscreen.innerHTML = `
          <img src="${img.src}" alt="${anime.title}">
          <span class="close-fullscreen">×</span>
          <button class="fullscreen-prev"><i class="fas fa-chevron-left"></i></button>
          <button class="fullscreen-next"><i class="fas fa-chevron-right"></i></button>
        `;
        document.body.appendChild(fullscreen);
        fullscreen.style.display = "flex";

        const fullscreenImg = fullscreen.querySelector("img");
        const closeFullscreen = fullscreen.querySelector(".close-fullscreen");
        const prevFullscreen = fullscreen.querySelector(".fullscreen-prev");
        const nextFullscreen = fullscreen.querySelector(".fullscreen-next");

        let fullscreenIndex = imgIndex;

        function updateFullscreenImage() {
          fullscreenImg.src = additionalImages[fullscreenIndex];
          prevFullscreen.disabled = fullscreenIndex === 0;
          nextFullscreen.disabled = fullscreenIndex === additionalImages.length - 1;
        }

        closeFullscreen.addEventListener("click", () => {
          fullscreen.remove();
        });

        fullscreen.addEventListener("click", (e) => {
          if (e.target === fullscreen) {
            fullscreen.remove();
          }
        });

        prevFullscreen.addEventListener("click", () => {
          if (fullscreenIndex > 0) {
            fullscreenIndex--;
            updateFullscreenImage();
          }
        });

        nextFullscreen.addEventListener("click", () => {
          if (fullscreenIndex < additionalImages.length - 1) {
            fullscreenIndex++;
            updateFullscreenImage();
          }
        });

        function handleKeydown(e) {
          if (fullscreen.style.display === "flex") {
            if (e.key === "ArrowLeft" && fullscreenIndex > 0) {
              fullscreenIndex--;
              updateFullscreenImage();
            } else if (e.key === "ArrowRight" && fullscreenIndex < additionalImages.length - 1) {
              fullscreenIndex++;
              updateFullscreenImage();
            } else if (e.key === "Escape") {
              fullscreen.remove();
              document.removeEventListener("keydown", handleKeydown);
            }
          }
        }

        document.addEventListener("keydown", handleKeydown);
        updateFullscreenImage();
      });
    });

    images.forEach(img => img.addEventListener("load", updateCarousel));
    window.addEventListener("resize", updateCarousel);
    setTimeout(updateCarousel, 100);
  } else {
    carousel.innerHTML = "<p>No additional images available.</p>";
  }

  modalContent.appendChild(carousel);
  document.getElementById("animeModal").style.display = "block";
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("animeModal").style.display = "none";
});

document.getElementById("animeModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("animeModal")) {
    document.getElementById("animeModal").style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("animeModal").style.display === "block") {
    document.getElementById("animeModal").style.display = "none";
  }
});

function setupCardClickHandlers() {
  const gallery = document.getElementById("animeGallery");
  gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) {
      const index = Array.from(gallery.children).indexOf(card);
      openModalWithDebounce(index);
    }
  });
}

document.getElementById("searchInput").addEventListener("input", debounce(function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredAnimes = displayedAnimes.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm) || 
    anime.genres.some(genre => genre.toLowerCase().includes(searchTerm))
  );
  const gallery = document.getElementById("animeGallery");
  gallery.innerHTML = "";
  filteredAnimes.forEach((anime, index) => {
    setTimeout(() => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${anime.thumbnail}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.genres.join(", ")}</p>
      `;
      card.addEventListener("click", () => openModalWithDebounce(displayedAnimes.indexOf(anime)));
      gallery.appendChild(card);
    }, index * 100);
  });
}, 300));

document.getElementById("loadMore").addEventListener("click", () => {
  loadMoreAnimes();
});

function setupBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.className = "back-to-top";
  backToTop.textContent = "⬆";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}