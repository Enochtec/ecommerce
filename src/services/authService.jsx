import axios from 'axios'

const API_URL = '/api/v1/auth'

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`)
    localStorage.removeItem('token')
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`)
    return response.data.data.user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user')
  }
}

export const updateProfile = async (userData) => {
  try {
    const response = await axios.patch(`${API_URL}/me`, userData)
    return response.data.data.user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Profile update failed')
  }
}