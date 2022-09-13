const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsServices = require('../../../src/services/productsServices');
const { allProducts, productWithId1 } = require("./ServicesMocks");

describe('testa a rota get na camada productsServives', function () {
  it('testa se é possível buscar todos os produtos', async function () {
    sinon.stub(productsModel, "getAllProducts").resolves(allProducts);
    
    const products = await productsServices.getAllProducts();

    expect(products.type).to.be.null
    expect(products.message).to.be.deep.equal(allProducts);
  });

  it('testa se a mensagem de not found é retornada quando o id inexistente é passado', async function () {
    sinon.stub(productsModel, "getProductsById").resolves(null);

    const productsById = await productsServices.getProductById(5);
  
    expect(productsById.type).to.be.equal(404)
    expect(productsById.message).to.be.deep.equal('Product not found');
  });

  it('testa se a busca por um id existente retorna o produto correto', async function () {
    sinon.stub(productsModel, "getProductsById").resolves(productWithId1);

    const productById = await productsServices.getProductById(1);

    expect(productById.type).to.be.null;
    expect(productById.message).to.be.deep.equal({
      id: 1,
      name: "Martelo de Thor",
    });
  });
  afterEach(sinon.restore);
});

describe('testa a rota post na camada products Services', function () {
  it('Testando a validação do "name" recebido pelo body', async function () {
    const result = await productsServices.addNewProduct("as");

    expect(result.type).to.be.equal(422);
    expect(result.message).to.be.deep.equal(
      '"name" length must be at least 5 characters long'
    );

    const resultWithOutName = await productsServices.addNewProduct("");

    expect(resultWithOutName.type).to.be.equal(400);
    expect(resultWithOutName.message).to.be.deep.equal('"name" is required');
  });

  it("testa se é possível adicionar um novo produto", async function () {
    sinon.stub(productsModel, "insertProduct").resolves(5);
    const newProduct = await productsServices.addNewProduct(
      "Chicote da Mulher Maravilha"
    );

    expect(newProduct.type).to.be.null;
    expect(newProduct.message).to.be.deep.equal({
      id: 5,
      name: "Chicote da Mulher Maravilha",
    });
  });
  afterEach(sinon.restore);
});

describe('testa a rota put na camada products Services', function () {
   it("testa se é possível editar um produto", async function () {
     sinon.stub(productsModel, "editProduct").resolves(1);
     const result = await productsServices.updateProduct(
       1,
       "Martelo do Batman"
     );

     expect(result.type).to.be.null;
     expect(result.message).to.be.deep.equal({
       id: 1,
       name: "Martelo do Batman",
     });
   });

   it("testa se o id for inexistente retorna um erro", async function () {
     sinon.stub(productsModel, "editProduct").resolves(0);
     const result = await productsServices.updateProduct(
       9999,
       "Martelo do Batman"
     );

     expect(result.type).to.be.equal(404);
     expect(result.message).to.be.deep.equal("Product not found");
   });

   it("testa se não é possível alterar uma tabela sem o name", async function () {
     const result = await productsServices.updateProduct(1, "");

     expect(result.type).to.be.equal(400);
     expect(result.message).to.be.deep.equal('"name" is required');
   });
  afterEach(sinon.restore);
})