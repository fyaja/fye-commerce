import { renderHeader } from "./header.js";
import { cart } from "../data/cart.js";
import { getProducts } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";

function renderCart() {
  let html = ``;
  cart.forEach((cartItem) => {
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
            <button class="quantity-button" id="subtractButton">
              <i class="ri-subtract-fill ri-lg"></i>
            </button>
            <input type="number" id="quantityInput" class="quantity-input" value="${
              cartItem.quantity
            }" min="1">
            <button class="quantity-button" id="addButton">
              <i class="ri-add-fill ri-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="order-right-buttons">
        <button class="add-to-wishlist">
          <i class="ri-heart-line ri-xl"></i>
        </button>
        <button class="remove-product">
          <i class="ri-delete-bin-5-line ri-xl"></i>
          <span>Remove item</span>
        </button>
      </div>
    </div>`;
  });

  document.querySelector(".js-order-container").innerHTML = html;
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
}

renderHeader();
renderCart();
