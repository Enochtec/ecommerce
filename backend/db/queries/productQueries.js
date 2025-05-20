const getProductsQuery = `
  SELECT p.*, c.name as category_name 
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
`;

const getProductByIdQuery = `
  SELECT p.*, c.name as category_name 
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE p.id = $1
`;

const createProductQuery = `
  INSERT INTO products (name, description, price, stock_quantity, category_id, image_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
`;

module.exports = {
  getProductsQuery,
  getProductByIdQuery,
  createProductQuery,
  // Add other queries
};