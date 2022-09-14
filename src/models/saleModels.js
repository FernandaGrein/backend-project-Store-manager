const camelize = require('camelize');
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
    'SELECT (id) FROM products',
  );
  
  const ids = result.map((item) => item.id);
  return ids;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales_products AS sp
      JOIN sales as sl
      ON sl.id = sp.sale_id
      ORDER BY sale_id ASC, product_id ASC`,
  );
  
  return camelize(result);
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales_products AS sp
     JOIN sales as sl
     ON sl.id = sp.sale_id
     WHERE sp.sale_id = ?
     ORDER BY sale_id ASC, product_id ASC;`,
    [id],
  );
  
  return camelize(result);
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE sales_products, sales FROM sales_products INNER JOIN sales 
    WHERE sales_products.sale_id = sales.id AND sales_products.sale_id =
    ?`,
    [id],
  );

  return affectedRows;
};

const allSalesId = async () => {
  const [result] = await connection.execute('SELECT (id) FROM sales');
  
  const ids = result.map((item) => item.id);

  return ids;
};

const updateSale = async (id, updateBody) => {
  console.log(updateBody);
  await updateBody.forEach((item) =>
    connection.execute(
      `UPDATE sales_products SET quantity = ?
        WHERE sale_id = ? AND product_id = ?`,
      [item.quantity, id, item.productId],
    ));
};

module.exports = {
  saveSales,
  getAllIds,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
  allSalesId,
};