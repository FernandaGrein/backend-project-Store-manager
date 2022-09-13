const schemas = require('./schemas');

const nameValidation = (productName) => {
  const validation = schemas.productsSchema.validate({ name: productName });

  if (validation.error && validation.error.message === '"name" is required') {
    return { type: 400, message: validation.error.message };
  }
  if (
    validation.error
    && validation.error.message
      === '"name" length must be at least 5 characters long'
  ) {
    return { type: 422, message: validation.error.message };
  }
};

const validateSchemas = (salesBody) =>
  salesBody.map(({ productId, quantity }) => {
    const validation = schemas.saleSchema.validate({ productId, quantity });

    if (validation.error && validation.error.message.includes('is required')) {
      return { type: 400, message: validation.error.message };
    }

    if (
      validation.error
      && validation.error.message
        === '"quantity" must be greater than or equal to 1'
    ) {
      return { type: 422, message: validation.error.message };
    }
    return null;
});

const validadeIds = async (allIds, salesBody) =>
  salesBody.map((item) => {
    const findId = allIds.find((id) => item.productId === id);
    if (findId === undefined) {
      return { type: 404, message: 'Product not found' };
    }
    return null;
});

module.exports = {
  nameValidation,
  validateSchemas,
  validadeIds,
};