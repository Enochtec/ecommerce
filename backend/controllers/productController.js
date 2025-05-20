const db = require('../config/db');
const { getProductsQuery, getProductByIdQuery } = require('../db/queries/productQueries');

exports.getAllProducts = async (req, res) => {
  try {
    const { rows } = await db.query(getProductsQuery);
    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        products: rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(getProductByIdQuery, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        product: rows[0],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Add create, update, delete methods similarly