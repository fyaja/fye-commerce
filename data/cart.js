const cart = [];

export function addToCart(productId) {
  let sameItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      sameItem = cartItem;
    }
  });

  if (sameItem) {
    sameItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  console.log(cart);
}
