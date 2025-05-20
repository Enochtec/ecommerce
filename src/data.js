const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper function for API calls
const fetchData = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return await response.json();
};

// Products
export const fetchProducts = () => fetchData('/products');
export const fetchProductById = (id) => fetchData(`/products/${id}`);
export const createProduct = (productData) => 
  fetchData('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });

// Authentication
export const signup = (userData) => 
  fetchData('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const login = (credentials) => 
  fetchData('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

// Cart
export const getCart = () => fetchData('/cart');
export const addToCart = (productId, quantity) => 
  fetchData('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });

export const removeFromCart = (itemId) => 
  fetchData(`/cart/${itemId}`, {
    method: 'DELETE',
  });

// Orders
export const createOrder = (orderData) => 
  fetchData('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

export const getOrderHistory = () => fetchData('/orders');