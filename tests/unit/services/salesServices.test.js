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
  allSales,
  saleById,
  updateBody,
  wrongUpdateBody,
} = require("./ServicesMocks");

describe('testa a camada salesServices na rota post', function () {
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

describe('testa a rota get/sales na camada Services', function () {
  it('testa se é possível recuperar todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, "getAllSales").resolves(allSales);

    const result = await saleServices.getAllSales();

    expect(result.type).to.be.null;
    expect(result.message).to.be.deep.equal(allSales);
  });
  it('testa se é possivel selecionar uma venda por id', async function () {
    sinon.stub(salesModel, "getSalesById").resolves(saleById);

    const result = await saleServices.getSalesById(1);
    
    expect(result.type).to.be.null;
    expect(result.message).to.be.deep.equal(saleById);
  });

  it('testa se passar um id inexistente retorna a mensagem de não encontrado', async function () {
    sinon.stub(salesModel, "getSalesById").resolves([]);

    const result = await saleServices.getSalesById(199);

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.deep.equal("Sale not found");
  })
  afterEach(sinon.restore);
});

describe("testa a rota delete na camada sales Services", function () {
  it("testa se é possível deletar uma venda com sucesso", async function () {
    sinon.stub(salesModel, "deleteSale").resolves(1);
    const result = await saleServices.deleteSale(2);

    expect(result.type).to.be.null;
  });
  it("testa se retorna um erro ao tentar deletar um id inexistente", async function () {
    sinon.stub(salesModel, "deleteSale").resolves(0);

    const result = await saleServices.deleteSale(999);

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.deep.equal("Sale not found");
  });
  afterEach(sinon.restore);
});

describe('testa a rota que atualiza uma venda', async function () {
  it('testa se é possível atualizar uma venda com sucesso', async function () {
   sinon.stub(salesModel, "updateSale").resolves();

   const update = await saleServices.updateSale(1, updateBody);

   expect(update.type).to.be.null;
   expect(update.message).to.be.deep.equal({
     saleId: 1,
     itemsUpdated: updateBody,
    });
  });

  it('testa se o id for inexistente a mensagem de erro é retornada', async function () {
    const update = await saleServices.updateSale(9999, updateBody);

    expect(update.type).to.be.equal(404);
    expect(update.message).to.be.deep.equal("Sale not found");
  });

  it('testa se houver um erro no body é retornado uma mensagem de erro', async function () {
   const error = await saleServices.updateSale(1, wrongUpdateBody);
   expect(error.type).to.be.equal(400);
   expect(error.message).to.be.deep.equal('"productId" is required');
  });

  it('testa se uma mensagem de erro é retornada ao tentar alterar um productId inexistente', async function () {
     sinon.stub(salesModel, "getAllIds").resolves([productsIds]);
     const error = await saleServices.updateSale(1, saleBodyWithWrogId);

     expect(error.type).to.be.equal(404);
     expect(error.message).to.be.deep.equal("Product not found");
  })
});