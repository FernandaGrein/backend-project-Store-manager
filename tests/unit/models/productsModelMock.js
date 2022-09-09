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

module.exports = {
  allProducts,
  productWithId1,
  productNotFound,
}; 