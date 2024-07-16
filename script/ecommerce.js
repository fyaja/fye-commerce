import { products } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";
import { updateHeartIcon, updateHeartIconAllItem } from "./utils/heartIcon.js";
import { addToWishlist } from "../data/wishlist.js";
import { renderHeader } from "./header.js";
import { removeProductsSize } from "./utils/sizeChart.js";

function renderProducts() {
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
  updateHeartIconAllItem();
}

removeProductsSize();
renderProducts();
renderHeader();
