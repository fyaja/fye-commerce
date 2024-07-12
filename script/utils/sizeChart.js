let productsSize = JSON.parse(localStorage.getItem("productsSize")) || [];

export function pushSize(productId, size) {
  if (productsSize.id === productId) {
    productsSize.size = size;
  } else {
    productsSize = {
      id: productId,
      size: size,
    };
  }

  saveToStorage();
  console.log(productsSize);
}

export function getSize(productId) {
  if (productsSize.id === productId) return productsSize;
}

export function removeProductsSize() {
  productsSize = {};
  saveToStorage();
  console.log(productsSize);
}

function saveToStorage() {
  localStorage.setItem("productsSize", JSON.stringify(productsSize));
}
