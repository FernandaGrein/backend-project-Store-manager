const connection = require('./connection');

const saveSales = async (salesBody) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)', [new Date().toISOString().slice(0, 10)],
  );

  await salesBody.forEach((item) => connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`, [insertId, item.productId, item.quantity],
  ));

  return insertId;
};

const getAllIds = async () => {
  const [result] = await connection.execute(
    'SELECT id FROM products',
  );
  const ids = result.map((item) => item.id);
  return ids;
};

module.exports = {
  saveSales,
  getAllIds,
};