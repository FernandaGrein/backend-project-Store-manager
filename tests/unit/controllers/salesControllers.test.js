const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/salesController');
const salesServices = require('../../../src/services/saleServices');
const {
  saleBody,
  salesSaved,
  allSales,
  saleById,
  updateBody,
  wrongUpdateBody,
} = require("./ControllersMocks");

describe('testa a rota post da camada sales Controller', function () {
  it('testa a rota sales/post que adiciona as vendas no banco de dados', async function () {
    const res = {};
    const req = { params: {}, body: saleBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, "saveSales").resolves({
      type: null,
      message: salesSaved,
    });

    await salesController.addSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesSaved);
  })
  it('testa se a mensagem de erro aparece quando há um erro na requisição', async function () {
    const res = {};
    const req = { params: {}, body: { quantity: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, "saveSales").resolves({
      type: 400,
      message: '"productId" is required',
    });

    await salesController.addSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  })
    afterEach(sinon.restore);
});

describe('testa a rota get/sales na camada sales Controller', function () {
  it('testa se é possível selecionar todas as vendas', async function () { 
    const req = {}
    const res = {}
    
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()

    sinon
      .stub(salesServices, "getAllSales")
      .resolves({ type: null, message: allSales });
    
    await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
  });
  it('testa se é possível selecionar uma venda pelo id', async function () { 
    const res = {};
    const req = { params: { id: 1 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, "getSalesById")
      .resolves({ type: null, message: saleById });
    
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleById)
  });
  it('testa se não é possível selecionar uma venda por um id não existente', async function () { 
    const res = {};
    const req = { params: { id: 999 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesServices, "getSalesById")
      .resolves({ type: 404, message: "Sale not found" });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
   });
  afterEach(sinon.restore);
});

describe("testa a rota delete na camada sales Controller", function () {
  it("testa se é possível deleter uma venda com sucesso", async function () {
    const res = {};
    const req = { params: { id: 2 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesServices, "deleteSale").resolves({ type: null });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

    it("testa se retorna uma mensagem de erro ao tentar deletar um id inexistente", async function () {
      const res = {};
      const req = { params: { id: 999 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesServices, "deleteSale")
        .resolves({ type: 404, message: "Sale not found" });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
  afterEach(sinon.restore);
});

describe('testa se é possivel atualizar uma venda', function () {
  it("testa se é possível atualizar uma venda com sucesso", async function () {
    const res = {};
    const req = { params: { id: 1 }, body: updateBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, "updateSale").resolves({
      type: null,
      message: { saleId: 1, itemsUpdated: updateBody },
    });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      saleId: 1,
      itemsUpdated: updateBody,
    });
  });
  it("testa se retorna um erro quando não é possível atualizar a venda", async function () {
    const res = {};
    const req = { params: { id: 1 }, body: wrongUpdateBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesServices, "updateSale").resolves({
      type: 400,
      message: '"productId" is required',
    });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });
  afterEach(sinon.restore);
});