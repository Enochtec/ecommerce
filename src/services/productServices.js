import axios from 'axios'

const API_URL = '/api/v1/products'

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.products
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products')
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data.data.product
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch product')
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData)
    return response.data.data.product
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create product')
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, productData)
    return response.data.data.product
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product')
  }
}

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product')
  }
}