import axios from 'axios'

const API_URL = '/api/v1/orders'

export const fetchUserOrders = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.orders
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders')
  }
}

export const fetchOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data.data.order
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order')
  }
}

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData)
    return response.data.data.order
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order')
  }
}