export const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

export function addToWishlist(productId) {
  const index = wishlist.findIndex((item) => item.productId === productId);
  if (index !== -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push({ productId: productId });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log(wishlist);
}
