const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require('../../../src/models/saleModels');
const saleServices = require('../../../src/services/saleServices');
const {
  productsIds,
  salesBody,
  savedSale,
  saleBodyWithOutProduct,
  saleBodyWithOutQuantity,
  saleBodyWithWrogId,
} = require("./ServicesMocks");

describe('testa a camada salesServices', function () {
  it('verifica se é possível salvar uma venda com sucesso', async function () {
    sinon.stub(salesModel, "saveSales").resolves(4)

    const saveSale = await saleServices.saveSales(salesBody);

    expect(saveSale.type).to.be.null;
    expect(saveSale.message).to.be.deep.equal(savedSale);

  });
  it('verifica se a falta de um "productId" retorna uma mensagem de "productId is required" ', async function () {
    const error = await saleServices.saveSales(saleBodyWithOutProduct);
     expect(error.type).to.be.equal(400);
     expect(error.message).to.be.deep.equal('"productId" is required');
  });

  it('verifica a validação do "quantity"', async function () {
    const error = await saleServices.saveSales(saleBodyWithOutQuantity);
    expect(error.type).to.be.equal(422);
    expect(error.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
  });

  it('verifica se não é possível salvar uma compra com productId não existente', async function () {
    sinon.stub(salesModel, "getAllIds").resolves([productsIds]);
    const error = await saleServices.saveSales(saleBodyWithWrogId);

    expect(error.type).to.be.equal(404);
    expect(error.message).to.be.deep.equal("Product not found");
  });
  
  afterEach(sinon.restore);
});