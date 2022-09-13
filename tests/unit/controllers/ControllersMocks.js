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

const newProduct = {
  id: 5,
  name: "Chicote da mulher maravilha",
};

const productNotFound = [{ message: "Product not found" }];

const saleBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesSaved = {
  id: 3,
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

const updatedProduct = {
  id: 1,
  name: "Martelo do Batman",
};


module.exports = {
  allProducts,
  productWithId1,
  productNotFound,
  newProduct,
  salesSaved,
  saleBody,
  allSales,
  saleById,
  updatedProduct,
};
