const { expect } = require("chai");
const sinon = require("sinon");

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const {
  allProducts,
  productWithId1,
  productNotFound,
  productByTerm,
} = require("./ModelsMocks");

describe('Testes das rotas get e post na camada productsModel', function () {
  it('testa o comando SELECT * da tabela products', async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);

    const result = await productsModel.getAllProducts();
    
    expect(result).to.be.deep.equal(allProducts);
    
  });

  it('testa o comando SELECT filtrando pelo ID', async function () {
    sinon.stub(connection, "execute").resolves([productWithId1]);

    const result = await productsModel.getProductsById(1);

    expect(result).to.be.deep.equal(productWithId1[0])
  });

  it('testa se a busca por um id inexistente retorna a mensagem de produto inexistente', async function () {
    sinon.stub(connection, "execute").resolves([productNotFound]);

    const result = await productsModel.getProductsById(5);
    
    expect(result).to.be.deep.equal(productNotFound[0])
  });
   afterEach(sinon.restore);
});

describe("testa a rota post na camada products Mode", function () {
  it("testa se é possível adicionar um novo produto", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);
    const result = await productsModel.insertProduct(
      "Chicote da Mulher Maravilha"
    );

    expect(result).to.be.equal(5);
  }); 
  after(sinon.restore);
});

describe('testa a rota update na camada products Model', function () {
  it('testa se é possível atualizar um produto', async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await productsModel.editProduct(1, "Martelo do Batman");

    expect(result).to.be.equal(1)
  });

  it("testa se o id for inexistente, não há alteração na tabela", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);
    const result = await productsModel.editProduct(1987, "Martelo do Batman");

    expect(result).to.be.equal(0);
  });
  afterEach(sinon.restore);
});

describe('testa a rota delete na camada products Model', function () {
  it('testa se é possível deletar um produto com sucesso', async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    
    const result = await productsModel.deleteProduct(1)

    expect(result).to.be.equal(1)
  });
  after(sinon.restore);
});

describe('testa a rota se é possível procurar um produto pelo nome', function () {
  it('testa se é possível procurar um produto pelo nome', async function () {
   sinon.stub(connection, "execute").resolves([productByTerm]);

   const result = await productsModel.searchByTerm("Martelo");

   expect(result).to.be.deep.equal(productByTerm);
  });
   after(sinon.restore);
});
