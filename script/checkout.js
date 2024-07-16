import { fetchProducts } from "../data/products.js";
import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderPriceSummary } from "./checkout/priceSummary.js";
import { renderHeader } from "./header.js";
import { removeProductsSize } from "./utils/sizeChart.js";

async function loadPage() {
  try {
    await fetchProducts();
    removeProductsSize();
    renderHeader();
    renderCartSummary();
    renderPriceSummary();
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

loadPage();
