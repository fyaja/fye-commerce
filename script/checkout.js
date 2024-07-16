import { renderCartSummary } from "./checkout/cartSummary.js";
import { renderPriceSummary } from "./checkout/priceSummary.js";
import { renderHeader } from "./header.js";
import { removeProductsSize } from "./utils/sizeChart.js";

removeProductsSize();
renderHeader();
renderCartSummary();
renderPriceSummary();
