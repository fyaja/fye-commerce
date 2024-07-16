import { renderHeader } from "../header.js";
import { cart, updateCartQuantity, removeProduct } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { moneyFormat } from "../utils/money.js";
import {
  updateHeartIcon,
  updateHeartIconAllItems,
} from "../utils/heartIcon.js";
import { addToWishlist } from "../../data/wishlist.js";
import { renderPriceSummary } from "./priceSummary.js";

export function renderCartSummary() {
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
        renderPriceSummary();
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
      renderPriceSummary();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const index = event.currentTarget.getAttribute("data-index");
      const inputValue = Number(event.currentTarget.value);
      if (inputValue >= 1) {
        updateCartQuantity(index, inputValue);
        renderPriceSummary();
      } else {
        event.currentTarget.value = 1;
        updateCartQuantity(index, 1);
        renderPriceSummary();
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
    updateHeartIconAllItems(productId);
  }

  document.querySelectorAll(".remove-product").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, size } = button.dataset;
      setTimeout(() => {
        removeProduct(productId, size);
        renderHeader();
        renderPriceSummary();
        renderCartSummary();
      }, 200);
    });
  });
}
