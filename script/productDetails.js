import { products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";
import { moneyFormat } from "./utils/money.js";
import { addToWishlist, wishlist } from "../data/wishlist.js";

function renderProductDetails() {
  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");

  let html = "";
  products.forEach((product) => {
    if (product.id == productId) {
      html = `
      <div class="product-details-left">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-details-right">
        <div class="product-container">
          <div class="product-info">
            <h2 class="product-details-name">${product.name}</h2>
            <p class="product-details-price">${moneyFormat(product.price)}</p>
            <p class="product-details-desc">${product.desc}</p>
            <div class="quantity-controls">
              <button class="quantity-button" id="subtractButton">
                <i class="ri-subtract-fill ri-lg"></i>
              </button>
              <input type="number" id="quantityInput" class="quantity-input" value="1" min="1">
              <button class="quantity-button" id="addButton">
                <i class="ri-add-fill ri-lg"></i>
              </button>
            </div>
          </div>
          <button class="add-to-wishlist add-to-wishlist-${
            product.id
          }" data-product-id="${product.id}">
            <i class="ri-heart-line ri-xl"></i>
          </button>
        </div>
        <button class="add-to-cart js-add-to-cart">Add to cart</button>
      </div>`;
      document.querySelector(".product-details-top span").innerText =
        product.name;
    }
  });

  document.querySelector(".js-products-details-container").innerHTML = html;
  updateCartQuantity();

  const quantityInput = document.querySelector("#quantityInput");

  document.querySelector("#subtractButton").addEventListener("click", () => {
    let inputValue = Number(quantityInput.value);
    if (inputValue > 1) {
      inputValue--;
      quantityInput.value = inputValue;
    }
  });

  document.querySelector("#addButton").addEventListener("click", () => {
    let inputValue = Number(quantityInput.value);
    inputValue++;
    quantityInput.value = inputValue;
  });

  document.querySelector(".js-add-to-cart").addEventListener("click", () => {
    addToCart(productId, Number(quantityInput.value));
    updateCartQuantity();
  });

  document.querySelector(".add-to-wishlist").addEventListener("click", () => {
    const { productId } = document.querySelector(".add-to-wishlist").dataset;
    addToWishlist(productId);
    updateHeartIcon(productId);
  });
  updateHeartIcons();
}

renderProductDetails();

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
