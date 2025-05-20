import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'

export default function OrderConfirmation() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Thank You For Your Order!
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Order #12345
      </Typography>
      <Typography variant="body1" paragraph>
        Your order has been placed and is being processed. We've sent a confirmation email with your order details.
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          component={Link} 
          to="/my-account/orders" 
          variant="contained" 
          size="large"
        >
          View Orders
        </Button>
        <Button 
          component={Link} 
          to="/products" 
          variant="outlined" 
          size="large"
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  )
}