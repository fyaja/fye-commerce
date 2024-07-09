import { products } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";

function renderProducts() {
  let html = "";
  products.forEach((product) => {
    html += `<div class="product">
      <div class="product-top">
        <img src="${product.image}" alt="baju">
        <div class="product-desc-item">
          <div class="product-item">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <p class="product-price">${moneyFormat(product.price)}</p>
          </div>

          <button class="add-to-wishlist">
            <i class="ri-heart-line ri-xl"></i>
          </button>
        </div>
      </div>

      <button class="add-to-cart">
        Add to cart
      </button>
    </div>`;
  });

  document.querySelector(".js-products-container").innerHTML = html;
}

renderProducts();
