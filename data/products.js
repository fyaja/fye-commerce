export const products = [
  {
    id: 1,
    name: "Black T-Shirt",
    price: 125000,
    image: "images/products-image/kaos item.jpg",
    desc: "ya kaos item aja sih tapi bagus loh..",
  },
  {
    id: 2,
    name: "Baju 2",
    price: 150000,
    image: "images/products-image/kaos item.jpg",
    desc: "ya kaos item aja sih tapi bagus loh..",
  },
  {
    id: 3,
    name: "Baju 3",
    price: 175000,
    image: "images/products-image/kaos item.jpg",
    desc: "ya kaos item aja sih tapi bagus loh..",
  },
  {
    id: 4,
    name: "Baju 4",
    price: 100000,
    image: "images/products-image/kaos item.jpg",
    desc: "ya kaos item aja sih tapi bagus loh..",
  },
];

export function getProducts(productId) {
  let sameProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      sameProduct = product;
    }
  });
  return sameProduct;
}
