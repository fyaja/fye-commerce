import { cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { moneyFormat } from "../utils/money.js";

export function renderPriceSummary() {
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
