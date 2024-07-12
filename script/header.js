import { updateCartQuantity } from "../data/cart.js";
import { wishlist } from "../data/wishlist.js";

export function renderHeader() {
  const html = `<div class="header-container container">
    <div class="logo">
      <img src="images/logo.svg" alt="fyecommerce">
    </div>

    <div class="header-right">
      <div class="search-div">
        <i class="ri-search-line"></i>
        <input class="search-input" type="text" placeholder="search here..">
      </div>
      <a href="../checkout.html" class="products-cart">
        <div class="cart-quantity">${updateCartQuantity()}</div>
        <i class="ri-shopping-bag-line ri-lg"></i>
      </a>
      <a href="../wishlist.html" class="products-wishlist">
        <div class="wishlist-quantity">${wishlist.length}</div>
        <i class="ri-heart-line ri-lg"></i>
      </a>
    </div>
  </div>`;

  document.querySelector("header").innerHTML = html;
}
