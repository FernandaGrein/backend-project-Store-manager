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


module.exports = {
  allProducts,
  productWithId1,
  productNotFound,
  newProduct,
  salesSaved,
  saleBody,
};
