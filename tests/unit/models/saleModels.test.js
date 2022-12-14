const { expect } = require("chai");
const sinon = require("sinon");

const conn = require('../../../src/models/connection');
const salesModel = require('../../../src/models/saleModels');
const { salesBody, productsIds, allSales, saleById } = require("./ModelsMocks");

describe('testa a camada Sale Model na rota post', function () {
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

describe('testa a camada salesModel na rota get', function () {
  it('testa se é possível pegar todas as as vendas realizadas', async function () { 
    sinon.stub(conn, "execute").resolves([allSales]);
    const sales = await salesModel.getAllSales();

    expect(sales).to.be.deep.equal(allSales)
  })
  it('testa se é possivel selecionar uma venda por id', async function () { 
    sinon.stub(conn, "execute").resolves([saleById]);
    const result = await salesModel.getSalesById(1);

    expect(result).to.be.deep.equal(saleById);
  })
   afterEach(sinon.restore);
});

describe("testa a rota delete na camada sales Model", function () {
  it("testa se é possível deletar um produto com sucesso", async function () {
    sinon.stub(conn, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.deleteSale(1)

    expect(result).to.be.equal(1);
  });
  after(sinon.restore);
});

describe("testa se é possível alterar uma venda com sucesso", function () {
  it("testa se é possível atualizar uma venda com sucesso", async function () {
    sinon.stub(conn, "execute").resolves()
    const result = await salesModel.updateSale(1, salesBody);

    expect(result).to.be.undefined;
  });
  after(sinon.restore);
});