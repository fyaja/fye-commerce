import { getProducts } from "../data/products.js";
import { wishlist } from "../data/wishlist.js";
import { renderHeader } from "./header.js";

function renderWishlistProduct() {
  let html = ``;

  wishlist.forEach((wishlistProduct) => {
    const product = getProducts(Number(wishlistProduct.productId));
    html += `
    <div class="wishlist-product">
      <a href='productdetails.html?productId=${product.id}'>
        <div class="wishlist-product-top">
          <img src="${product.image}" alt="${product.name}">
          <h2 class="wishlist-name">${product.name}</h2>
          <p class="wishlist-desc">${product.desc}</p>
        </div>
      </a>
      <button class="add-to-cart">Add to cart</button>
    </div>`;
  });

  document.querySelector(".js-wishlist-container").innerHTML = html;
}
renderHeader();
renderWishlistProduct();
