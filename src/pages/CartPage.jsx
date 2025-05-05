import Cart from '../components/Cart'

export default function CartPage({ cartItems, removeFromCart, updateQuantity, isAuthenticated, user }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Cart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    </div>
  )
}