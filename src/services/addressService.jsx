import axios from 'axios'

const API_URL = '/api/v1/addresses'

export const fetchAddresses = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data.addresses
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch addresses')
  }
}

export const createAddress = async (addressData) => {
  try {
    const response = await axios.post(API_URL, addressData)
    return response.data.data.address
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create address')
  }
}

export const updateAddress = async (id, addressData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, addressData)
    return response.data.data.address
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update address')
  }
}

export const deleteAddress = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete address')
  }
}