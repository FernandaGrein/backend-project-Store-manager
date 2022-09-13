const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/salesController');
const salesServices = require('../../../src/services/saleServices');
const { saleBody, salesSaved } = require('./ControllersMocks')

describe('testa a camada sales Controller', function () {
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
