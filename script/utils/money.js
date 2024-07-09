export function moneyFormat(price) {
  return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}
