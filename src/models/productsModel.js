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

  return insertId;
};

const editProduct = async (id, product) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`, [product, id],
  );

  return affectedRows;
}; 

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?', [id],
  );

  return affectedRows;
};

const searchByTerm = async (term) => {
  const search = `%${term}%`;

  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [search],
  );
  return result;
}; 

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
  editProduct,
  deleteProduct,
  searchByTerm,
};