const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productWithId1 = [{
  id: 1,
  name: 'Martelo de Thor',
}];

const productNotFound = [{ message: 'Product not found' }]

const salesBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const productsIds = [1, 2, 3]

const allSales = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 2,
    date: "2021-09-09T04:54:54.000Z",
    productId: 3,
    quantity: 8,
  },
];

const saleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  allProducts,
  productWithId1,
  productNotFound,
  salesBody,
  productsIds,
  allSales,
  saleById,
}; 