import { Outlet } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'
import { useAuth } from '../hooks/useAuth'

export default function MyAccount() {
  const { user } = useAuth()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Account
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome back, {user?.username}!
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Container>
  )
}