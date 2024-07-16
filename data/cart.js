export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId, quantity, size) {
  const quantityNumber = Number(quantity);
  if (!quantityNumber) return;

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

export function totalCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return totalQuantity;
}

export function removeProduct(productId, size) {
  cart = cart.filter(
    (cartItem) => cartItem.productId !== productId || cartItem.size !== size
  );
  saveToStorage();
}

export function updateCartQuantity(index, quantity) {
  cart[index].quantity = quantity;
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
