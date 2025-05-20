import { Link } from 'react-router-dom'
import { Button, Divider } from '@mui/material'
import CartItem from './CartItem'
import { useCart } from '../hooks/useCart'

export default function Cart({ onClose }) {
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
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
      </div>
      
      <div className="p-4 max-h-96 overflow-y-auto">
        {cart.items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          fullWidth
          onClick={onClose}
          disabled={cart.items.length === 0}
        >
          Proceed to Checkout
        </Button>
        
        <Button
          component={Link}
          to="/cart"
          variant="outlined"
          color="primary"
          fullWidth
          className="mt-2"
          onClick={onClose}
        >
          View Cart
        </Button>
      </div>
    </div>
  )
}