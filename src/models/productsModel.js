const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getProductsById = async (id) => {
 const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE ID = ?', [id],
  );
  return result;
};

module.exports = {
  getAllProducts,
  getProductsById,
};