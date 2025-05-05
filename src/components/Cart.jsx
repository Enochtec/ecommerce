import CartItem from './CartItem'
import { Link } from 'react-router-dom'

export default function Cart({ cartItems, removeFromCart, updateQuantity, isAuthenticated, user }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
        {isAuthenticated && user && (
          <span className="text-gray-600">Welcome, {user.name || user.email.split('@')[0]}</span>
        )}
      </div>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200 mb-6">
            {cartItems.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            
            {isAuthenticated ? (
              <Link
                to="/checkout"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-600">Please log in to proceed with checkout</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/login"
                    state={{ fromCart: true }}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    state={{ fromCart: true }}
                    className="inline-block border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}