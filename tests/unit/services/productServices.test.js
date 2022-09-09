const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsServices = require('../../../src/services/productsServices');
const { allProducts, productWithId1 } = require("./productsServicesMocks");

describe('testa a camada productsServives', function () {
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

    console.log(productById);

    expect(productById.type).to.be.null;
    expect(productById.message).to.be.deep.equal({
      id: 1,
      name: "Martelo de Thor",
    });
  });
  afterEach(sinon.restore);
})