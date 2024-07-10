import { updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyFormat } from "./utils/money.js";

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

        <button class="add-to-wishlist">
          <i class="ri-heart-line ri-xl"></i>
        </button>
      </div>
    </div>`;
  });

  document.querySelector(".js-products-container").innerHTML = html;
  updateCartQuantity();
}

renderProducts();
