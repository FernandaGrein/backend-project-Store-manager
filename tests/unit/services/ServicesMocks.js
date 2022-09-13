const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const productWithId1 = {
    id: 1,
    name: "Martelo de Thor",
};

const productsIds = [1, 2, 3];

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

const savedSale = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleBodyWithOutProduct = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleBodyWithOutQuantity = [
  {
    productId: 2,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleBodyWithWrogId = [
  {
    productId: 32,
    quantity: 3,
  },
  {
    productId: 2,
    quantity: 5,
  },
];


module.exports = {
  allProducts,
  productWithId1,
  productsIds,
  salesBody,
  savedSale,
  saleBodyWithOutProduct,
  saleBodyWithOutQuantity,
  saleBodyWithWrogId,
};
