import { updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";
import { addToWishlist, wishlist } from "../data/wishlist.js";

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
            <p class="product-desc">${product.desc}</p>
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
    });
  });
  updateHeartIcons();
  updateCartQuantity();
}

renderProducts();

function updateHeartIcon(productId) {
  const heartElement = document.querySelector(
    `.add-to-wishlist-${productId} i`
  );

  const isProductInWishlist = wishlist.some(
    (item) => item.productId === productId
  );

  if (!isProductInWishlist) {
    heartElement.classList.remove("ri-heart-fill");
    heartElement.classList.add("ri-heart-line");
  } else {
    heartElement.classList.remove("ri-heart-line");
    heartElement.classList.add("ri-heart-fill");
  }
}

function updateHeartIcons() {
  wishlist.forEach((item) => {
    if (item.productId) {
      const heartElement = document.querySelector(
        `.add-to-wishlist-${item.productId} i`
      );
      heartElement.classList.remove("ri-heart-line");
      heartElement.classList.add("ri-heart-fill");
    }
  });
}
