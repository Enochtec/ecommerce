import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import NotFound from './pages/NotFound'
import MyAccount from './pages/MyAccount'
import Profile from './pages/account/Profile'
import Orders from './pages/account/Orders'
import OrderDetail from './pages/account/OrderDetail'
import Wishlist from './pages/account/Wishlist'
import Addresses from './pages/account/Addresses'
import PaymentMethods from './pages/account/PaymentMethods'
import { products as sampleProducts } from './data'

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [products] = useState(sampleProducts)

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const handleCheckout = () => {
    // In a real app, you would process payment here
    // For demo, we'll just clear the cart
    clearCart()
    return true
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header 
          cartItems={cartItems} 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          user={user}
        />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            <Route 
              path="/products" 
              element={
                <Products 
                  products={products} 
                  addToCart={addToCart} 
                />
              } 
            />
            
            <Route 
              path="/products/:id" 
              element={
                <ProductDetail 
                  products={products} 
                  addToCart={addToCart} 
                />
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              } 
            />
            
            {/* Authentication Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/account" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? (
                  <Navigate to="/account" replace />
                ) : (
                  <Signup onLogin={handleLogin} />
                )
              } 
            />
            
            {/* Checkout Flow */}
            <Route 
              path="/checkout" 
              element={
                isAuthenticated ? (
                  <Checkout 
                    user={user} 
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                  />
                ) : (
                  <Navigate to="/login" state={{ from: '/checkout' }} />
                )
              } 
            />
            
            <Route 
              path="/order-confirmation" 
              element={
                isAuthenticated ? (
                  <OrderConfirmation user={user} />
                ) : (
                  <Navigate to="/login" state={{ from: '/order-confirmation' }} />
                )
              } 
            />
            
            {/* Account Section - Protected Routes */}
            <Route 
              path="/account" 
              element={
                isAuthenticated ? (
                  <MyAccount user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" state={{ from: '/account' }} />
                )
              }
            >
              <Route index element={<Profile user={user} />} />
              <Route path="profile" element={<Profile user={user} />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="payment" element={<PaymentMethods />} />
            </Route>
            
            {/* 404 Handling */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}