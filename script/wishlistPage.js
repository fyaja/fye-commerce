import { addToCart } from "../data/cart.js";
import { getProducts, fetchProducts } from "../data/products.js";
import { wishlist } from "../data/wishlist.js";
import { renderHeader } from "./header.js";
import { getSize, removeProductsSize } from "./utils/sizeChart.js";
import { moneyFormat } from "./utils/money.js";

async function loadPage() {
  try {
    await fetchProducts();
    renderWishlistProduct();
    renderHeader();
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

loadPage();

function renderWishlistProduct() {
  let html = ``;

  wishlist.forEach((wishlistProduct) => {
    const product = getProducts(wishlistProduct.productId);
    html += `
    <div class="wishlist-product">
      <a href='productdetails.html?productId=${product.id}'>
        <div class="wishlist-product-top">
          <img src="${product.image}" alt="${product.name}">
          <h2 class="wishlist-name">${product.name}</h2>
          <p>${moneyFormat(product.price)}</p>
        </div>
      </a>
      <button class="add-to-cart" data-product-id="${
        product.id
      }">Add to cart</button>
    </div>`;
  });

  document.querySelector(".js-wishlist-container").innerHTML = html;
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      addToCart(
        productId,
        1,
        getSize(productId) ? getSize(productId).size : "M"
      );
      removeProductsSize();
      renderHeader();
    });
  });
}
