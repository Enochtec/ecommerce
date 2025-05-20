import { useState, useEffect } from 'react'
import { Typography, Box, TextField, Button, CircularProgress } from '@mui/material'
import { useAuth } from '../../../hooks/useAuth'
import { updateProfile } from '../../../services/authService'
import { toast } from 'react-toastify'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedUser = await updateProfile({
        username: formData.username,
        email: formData.email,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })
      updateUser(updatedUser)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mt: 3 }}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Change Password
        </Typography>
        
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          fullWidth
          margin="normal"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          fullWidth
          margin="normal"
          value={formData.newPassword}
          onChange={handleChange}
        />
        
        <TextField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Update Profile
        </Button>
      </Box>
    </Box>
  )
}