import { wishlist } from "../../data/wishlist.js";

export function updateHeartIcon(productId) {
  const heartElement = document.querySelector(
    `.add-to-wishlist-${productId} i`
  );

  const isProductInWishlist = wishlist.some(
    (item) => item.productId === productId
  );

  if (!isProductInWishlist) {
    heartElement.classList.remove("ri-heart-fill");
    heartElement.classList.add("ri-heart-line");
  } else {
    heartElement.classList.remove("ri-heart-line");
    heartElement.classList.add("ri-heart-fill");
  }
}

export function updateHeartIcons() {
  wishlist.forEach((item) => {
    if (item.productId) {
      const heartElement = document.querySelector(
        `.add-to-wishlist-${item.productId} i`
      );
      heartElement.classList.remove("ri-heart-line");
      heartElement.classList.add("ri-heart-fill");
    }
  });
}
