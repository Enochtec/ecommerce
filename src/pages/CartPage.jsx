import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../hooks/useCart'

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, cartTotal } = useCart()

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity)
    } catch (error) {
      console.error('Error updating cart item:', error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId)
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cart.items.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained"
            color="primary"
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ width: 300, border: '1px solid #e0e0e0', borderRadius: 1, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping:</Typography>
                <Typography>$0.00</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">${cartTotal.toFixed(2)}</Typography>
              </Box>
              
              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  )
}