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

const productByTerm = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
];

const updateBody = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const wrongUpdateBody = [
  {
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
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
  allSales,
  saleById,
  productByTerm,
  updateBody,
  wrongUpdateBody,
};
