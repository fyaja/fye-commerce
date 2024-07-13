export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId, quantity, size) {
  const quantityNumber = Number(quantity);
  if (quantityNumber === 0) return;

  let sameItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId && cartItem.size === size) {
      sameItem = cartItem;
    }
  });

  if (sameItem) {
    sameItem.quantity += quantityNumber;
  } else {
    cart.push({
      productId: productId,
      quantity: quantityNumber,
      size: size,
    });
  }

  console.log(cart);
  saveToStorage();
}

export function updateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return totalQuantity;
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
