import { wishlist } from "../../data/wishlist.js";

export function updateHeartIcon(productId) {
  document
    .querySelectorAll(`.add-to-wishlist-${productId} i`)
    .forEach((heartElement) => {
      const isProductInWishlist = wishlist.some(
        (item) => item.productId === productId
      );

      if (heartElement) {
        heartElement.classList.toggle("ri-heart-fill", isProductInWishlist);
        heartElement.classList.toggle("ri-heart-line", !isProductInWishlist);
      }
    });
}

function updateHeartIconForItem(productId) {
  document
    .querySelectorAll(`.add-to-wishlist-${productId} i`)
    .forEach((heartElement) => {
      if (heartElement) {
        heartElement.classList.remove("ri-heart-line");
        heartElement.classList.add("ri-heart-fill");
      }
    });
}

export function updateHeartIconOneItem(productId) {
  const item = wishlist.find((item) => item.productId === productId);
  if (item) {
    updateHeartIconForItem(item.productId);
  }
  console.log(wishlist);
}

export function updateHeartIconAllItems() {
  wishlist.forEach((item) => updateHeartIconForItem(item.productId));
  console.log(wishlist);
}
