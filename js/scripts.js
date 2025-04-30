document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initImageLoading();
  initScrollEffect();
  initSortDropdown();
  initEllipsisMenu();
  initExploreDropdownHover();
});

function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    setTimeout(showExploreDropdownInMobile, 10);
  });

  window.addEventListener("resize", showExploreDropdownInMobile);
}

function showExploreDropdownInMobile() {
  const navLinks = document.getElementById("navLinks");
  const exploreDropdown = document.querySelector(
    ".with-dropdown .dropdown-menu"
  );

  if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
    exploreDropdown.style.display = "flex";
  } else {
    exploreDropdown.style.display = "none";
  }
}

let page = 1;
const imagesPerPage = 12;

function initImageLoading() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadImages(page);
  loadMoreBtn.addEventListener("click", () => {
    page++;
    loadImages(page);
  });
}

function loadImages(pageNumber) {
  const imageGrid = document.getElementById("imageGrid");
  const startIndex = (pageNumber - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const totalImages = 30;
  const newImages = [];

  for (let i = startIndex; i < Math.min(endIndex, totalImages); i++) {
    const id = i + 50;
    const imageUrl = `https://picsum.photos/id/${id}/400/300`;
    const photographer = `Photographer ${id}`;
    newImages.push(createImageCard(imageUrl, photographer));
  }

  imageGrid.innerHTML += newImages.join("");
  updateLoadMoreButton(endIndex, totalImages);
}

function createImageCard(imgUrl, photographer) {
  return `
    <div class="image-card">
      <img src="${imgUrl}" alt="Photo by ${photographer}">
    </div>
  `;
}

function updateLoadMoreButton(endIndex, totalImages) {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.style.display = endIndex >= totalImages ? "none" : "block";
}

function initScrollEffect() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function initSortDropdown() {
  const sortBtn = document.querySelector(".sort-btn");
  const sortDropdown = document.querySelector(".sort-dropdown");

  sortBtn.addEventListener("click", () => {
    sortDropdown.classList.toggle("open");
  });

  window.addEventListener("click", (e) => {
    if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
      sortDropdown.classList.remove("open");
    }
  });
}

function initEllipsisMenu() {
  const ellipsisToggle = document.querySelector(".ellipsis-toggle");
  const dropdownEllipsis = document.querySelector(".dropdown-ellipsis");

  if (!ellipsisToggle || !dropdownEllipsis) return;

  ellipsisToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownEllipsis.classList.toggle("show");
  });

  window.addEventListener("click", (e) => {
    if (
      !ellipsisToggle.contains(e.target) &&
      !dropdownEllipsis.contains(e.target)
    ) {
      dropdownEllipsis.classList.remove("show");
    }
  });
}

function initExploreDropdownHover() {
  const exploreItem = document.querySelector(".nav-item.with-dropdown");

  if (!exploreItem) return;

  const exploreDropdown = exploreItem.querySelector(".dropdown-menu");

  exploreItem.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      exploreDropdown.style.display = "flex";
    }
  });

  exploreItem.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      exploreDropdown.style.display = "none";
    }
  });
}
