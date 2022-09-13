const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require("../../../src/services/productsServices");
const productsController = require("../../../src/controllers/productsCotroller");

const {
  allProducts,
  productWithId1,
  newProduct,
} = require("./ControllersMocks");

describe('testa a camada productControlle', function () {
  it('testa se é possível selecionar todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
    sinon
      .stub(productsServices, "getAllProducts")
      .resolves({ type: null, message: allProducts });
    
    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  })
  it('testa se é possível selecionar um produto pelo ID', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, "getProductById")
      .resolves({ type: null, message: productWithId1 });
    
    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(productWithId1);
  })

  it('testa se a mensagem "not found" é retornada quando buscado um id inexistente', async function () {
    const res = {};
    const req = { params: { id: 5 }, body: {} };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, "getProductById")
      .resolves({ type: 404, message: "Product not found" });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('testa se é possível adicionar um novo produto', async function () {
    const res = {};
    const req = { params: {}, body: { name: "Chicote da mulher maravilha" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsServices, "addNewProduct").resolves({
      type: null,
      message: newProduct,
    });

    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith(newProduct);

  });

  it('testa o retorno da função de adicionar um produto, quando o "name" é inválido', async function () {
    const res = {};
    const req =  { params: {}, body: { name: "as" } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsServices, "addNewProduct").resolves({
      type: 422,
      message: '"name" length must be at least 5 characters long',
    });

    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  })
  afterEach(sinon.restore);
});