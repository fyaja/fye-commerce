const cart = [];

export function addToCart(productId, quantity) {
  if(quantity === 0) return;

  let sameItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      sameItem = cartItem;
    }
  });

  if (sameItem) {
    sameItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }

  console.log(cart);
}
