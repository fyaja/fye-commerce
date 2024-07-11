import { products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";
import { moneyFormat } from "./utils/money.js";
import { addToWishlist, wishlist } from "../data/wishlist.js";

function renderProductDetails() {
  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productId");

  let html = "";
  let productName;
  products.forEach((product) => {
    if (product.id == productId) {
      html = `
      <div class="product-details-left">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-details-right">
        <div class="product-details-content">
          <div class="product-details-info">
            <h2 class="product-details-name">${product.name}</h2>
            <p class="product-details-description">${product.desc}</p>
            <p class="product-details-price">${moneyFormat(product.price)}</p>
            <div class="product-size-options">
              <button class="up-selected" data-product-size="M">M</button>
              <button data-product-size="L">L</button>
              <button data-product-size="XL">XL</button>
            </div>
          </div>
          <button class="add-to-wishlist add-to-wishlist-${
            product.id
          }" data-product-id="${product.id}">
            <i class="ri-heart-line ri-xl"></i>
          </button>
        </div>

        <div class="product-button">
          <div class="quantity-controls">
            <button class="quantity-button" id="subtractButton">
              <i class="ri-subtract-fill ri-lg"></i>
            </button>
            <input type="number" id="quantityInput" class="quantity-input" value="1" min="1">
            <button class="quantity-button" id="addButton">
              <i class="ri-add-fill ri-lg"></i>
            </button>
          </div>
          <button class="add-to-cart js-add-to-cart">Add to cart</button>
          <div class="product-button-bottom">
            <button class="product-image selected" data-product-image="${
              product.image
            }">
              <img src="${product.image}" alt="${product.name}">
            </button>
            <button class="size-chart-image" data-product-image="./images/size-chart.jpg">
              <img src="./images/size-chart.jpg" alt="size-chart">
            </button>
          </div>
      </div>`;
      productName = product.name;
    }
  });

  document.querySelector(".product-details-top span").innerText = productName;
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

  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      addToWishlist(productId);
      updateHeartIcon(productId);
    });
  });
  updateHeartIcons();

  document
    .querySelectorAll(".product-button-bottom button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("selected")) {
          const previousButton = document.querySelector(".selected");
          previousButton.classList.remove("selected");

          button.classList.add("selected");
          const { productImage } = button.dataset;
          document
            .querySelector(".product-details-left img")
            .setAttribute("src", productImage);
        }
      });
    });

  let productSize = "";
  document
    .querySelectorAll(".product-size-options button")
    .forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("up-selected")) {
          const previousButton = document.querySelector(".up-selected");
          previousButton.classList.remove("up-selected");

          button.classList.add("up-selected");
          productSize = button.dataset.productSize;
        }
      });
    });

  document.querySelector(".js-add-to-cart").addEventListener("click", () => {
    addToCart(productId, Number(quantityInput.value), productSize || "M");
    updateCartQuantity();
  });
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
