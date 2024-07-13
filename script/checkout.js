import { renderHeader } from "./header.js";
import { cart, saveToStorage, removeProduct } from "../data/cart.js";
import { getProducts } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";
import { removeProductsSize } from "./utils/sizeChart.js";
import {
  updateHeartIcon,
  updateHeartIconsEcommerce,
} from "./utils/heartIcon.js";
import { addToWishlist } from "../data/wishlist.js";

function renderCart() {
  let html = ``;
  let productId;
  cart.forEach((cartItem, index) => {
    const product = getProducts(cartItem.productId);
    html += `
    <div class="order">
      <div class="order-info">
        <img src="${product.image}" alt="${product.name}">
        <div class="order-item">
          <div class="order-item-top">
            <h2 class="order-item-name">${product.name}</h2>
            <p class="order-item-price">${moneyFormat(product.price)}</p>
            <p>Size: ${cartItem.size}</p>
          </div>
          <div class="quantity-controls">
            <button class="quantity-button subtract-button" data-index="${index}">
              <i class="ri-subtract-fill ri-lg"></i>
            </button>
            <input type="number" class="quantity-input" data-index="${index}" value="${
      cartItem.quantity
    }" min="1">
            <button class="quantity-button add-button" data-index="${index}">
              <i class="ri-add-fill ri-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="order-right-buttons">
        <button class="add-to-wishlist add-to-wishlist-${
          product.id
        }" data-product-id="${product.id}">
          <i class="ri-heart-line ri-xl"></i>
        </button>
        <button class="remove-product" data-product-id="${
          cartItem.productId
        }" data-size="${cartItem.size}">
          <i class="ri-delete-bin-5-line ri-xl"></i>
          <span>Remove item</span>
        </button>
      </div>
    </div>`;
    productId = product.id;
  });

  document.querySelector(".js-order-container").innerHTML = html;

  document.querySelectorAll(".subtract-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.currentTarget.getAttribute("data-index");
      const quantityInput = document.querySelector(
        `.quantity-input[data-index="${index}"]`
      );
      let inputValue = Number(quantityInput.value);
      if (inputValue > 1) {
        inputValue--;
        quantityInput.value = inputValue;
        updateCartQuantity(index, inputValue);
        renderOrderSummary();
      }
    });
  });

  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.currentTarget.getAttribute("data-index");
      const quantityInput = document.querySelector(
        `.quantity-input[data-index="${index}"]`
      );
      let inputValue = Number(quantityInput.value);
      inputValue++;
      quantityInput.value = inputValue;
      updateCartQuantity(index, inputValue);
      renderOrderSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const index = event.currentTarget.getAttribute("data-index");
      const inputValue = Number(event.currentTarget.value);
      if (inputValue >= 1) {
        updateCartQuantity(index, inputValue);
        renderOrderSummary();
      } else {
        event.currentTarget.value = 1;
        updateCartQuantity(index, 1);
        renderOrderSummary();
      }
    });
  });

  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      addToWishlist(productId);
      updateHeartIcon(productId);
      renderHeader();
    });
  });

  if (html) {
    updateHeartIconsEcommerce(productId);
  }

  document.querySelectorAll(".remove-product").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, size } = button.dataset;
      removeProduct(productId, size);
      saveToStorage();
      renderHeader();
      renderOrderSummary();

      setTimeout(() => {
        renderCart();
      }, 200);
    });
  });
}

function renderOrderSummary() {
  let subtotal = 0;
  cart.forEach((cartItem) => {
    const product = getProducts(cartItem.productId);
    subtotal += cartItem.quantity * product.price;
  });
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const html = `
  <h2>Order Summary</h2>
    <div class="price-div">
      <p class="text">Subtotal</p>
      <p class="price">${moneyFormat(subtotal)}</p>
    </div>
    <div class="price-div">
      <p class="text">Tax (10%)</p>
      <p class="price">${moneyFormat(tax)}</p>
    </div>
    <div class="price-div">
      <p class="text">Total</p>
      <p class="price">${moneyFormat(total)}</p>
    </div>
    <button class="checkout-btn">Checkout</button>
  </div>`;

  document.querySelector(".js-order-summary").innerHTML = html;
}

function updateCartQuantity(index, quantity) {
  cart[index].quantity = quantity;
  saveToStorage();
  renderHeader();
}

renderHeader();
renderCart();
renderOrderSummary();
removeProductsSize();
