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

module.exports = {
  saveSales,
};