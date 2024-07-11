const cart = [];

export function addToCart(productId, quantity, size) {
  if (quantity === 0) return;

  let sameItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId && cartItem.size === size) {
      sameItem = cartItem;
    }
  });

  if (sameItem) {
    sameItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      size: size,
    });
  }

  console.log(cart);
}

export function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = totalQuantity;
}
