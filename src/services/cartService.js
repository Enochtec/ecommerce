import axios from 'axios'

const API_URL = '/api/v1/cart'

export const getCart = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.cart
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cart')
  }
}

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(API_URL, { productId, quantity })
    return response.data.data.cart
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add item to cart')
  }
}

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await axios.patch(`${API_URL}/${itemId}`, { quantity })
    return response.data.data.cart
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update cart item')
  }
}

export const removeFromCart = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/${itemId}`)
    return response.data.data.cart
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove item from cart')
  }
}