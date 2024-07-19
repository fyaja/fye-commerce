import { products, fetchProducts } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";
import { updateHeartIcon, updateHeartIconAllItems } from "./utils/heartIcon.js";
import { addToWishlist } from "../data/wishlist.js";
import { renderHeader } from "./header.js";
import { removeProductsSize } from "./utils/sizeChart.js";

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
const swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 3000,
  },
  loop: true,
  speed: 700,
});

async function loadPage() {
  try {
    await fetchProducts();
    removeProductsSize();
    renderHeader();
    renderProducts();
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

loadPage();

function renderProducts() {
  document.querySelector(".search-input").addEventListener("input", () => {
    const searchInput = document
      .querySelector(".search-input")
      .value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
  });

  document.querySelector(".products-filter").addEventListener("change", () => {
    const filterValue = document.querySelector(".products-filter").value;
    let filteredProducts;
    if (filterValue === "high") {
      filteredProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (filterValue === "low") {
      filteredProducts = [...products].sort((a, b) => a.price - b.price);
    } else {
      filteredProducts = products;
    }
    displayProducts(filteredProducts);
  });
  displayProducts(products);
}

function displayProducts(products) {
  let html = "";
  products.forEach((product) => {
    html += `
    <div class="product">
      <a href="productdetails.html?productId=${product.id}">
        <img src="${product.image}" alt="baju">
      </a>
      <div class="product-item">
        <a href="productdetails.html?productId=${product.id}">
          <div class="product-desc-item">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${moneyFormat(product.price)}</p>
          </div>
        </a>

        <button class="add-to-wishlist add-to-wishlist-${
          product.id
        }" data-product-id="${product.id}">
          <i class="ri-heart-line ri-xl"></i>
        </button>
      </div>
    </div>`;
  });

  document.querySelector(".js-products-container").innerHTML = html;
  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      addToWishlist(productId);
      updateHeartIcon(productId);
      renderHeader();
    });
  });
  updateHeartIconAllItems();
}
