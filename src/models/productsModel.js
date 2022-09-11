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

const insertProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)', [productName],
  );
  console.log(insertId);

  return insertId;
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
};