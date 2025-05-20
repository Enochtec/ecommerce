import axios from 'axios'

const API_URL = '/api/v1/payment-methods'

export const fetchPaymentMethods = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.paymentMethods
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch payment methods')
  }
}

export const createPaymentMethod = async (cardData) => {
  try {
    const response = await axios.post(API_URL, cardData)
    return response.data.data.paymentMethod
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add payment method')
  }
}

export const deletePaymentMethod = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete payment method')
  }
}