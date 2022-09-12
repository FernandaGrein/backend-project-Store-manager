const { expect } = require("chai");
const sinon = require("sinon");

const conn = require('../../../src/models/connection');
const salesModel = require('../../../src/models/saleModels');
const { salesBody, productsIds } = require("./ModelsMocks");

describe('testa a camada Sale Model', function () {
  it('testa a função que adiciona novas vendas', async function () {
    sinon.stub(conn, "execute").resolves([{ insertId: 5 }]);
    const firstResult = await salesModel.saveSales(salesBody);
    
    expect(firstResult).to.be.equal(5);
  })

  it('testa a função que recupera todos os ids', async function () {
    sinon.stub(conn, "execute").resolves([productsIds]);
    const ids = await salesModel.getAllIds();

    expect(ids).to.be.an('array');
  })

  afterEach(sinon.restore);
});