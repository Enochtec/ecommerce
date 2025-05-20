import axios from 'axios'

const API_URL = '/api/v1/wishlist'

export const fetchWishlist = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.wishlist
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch wishlist')
  }
}

export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(API_URL, { product_id: productId })
    return response.data.data.wishlistItem
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add to wishlist')
  }
}

export const removeFromWishlist = async (productId) => {
  try {
    await axios.delete(`${API_URL}/${productId}`)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to remove from wishlist')
  }
}