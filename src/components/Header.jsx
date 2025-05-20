import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { logout } from '../services/authService'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'

export default function Header() {
  const { user, isAuthenticated, setIsAuthenticated } = useAuth()
  const { cart } = useCart()

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
      window.location.href = '/login'
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ShopEase
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" className={({ isActive }) => 
            isActive ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'
          }>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => 
            isActive ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'
          }>
            Products
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-500">
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="relative group">
              <button className="p-2 text-gray-600 hover:text-indigo-500 flex items-center">
                <User size={20} className="mr-1" />
                <span className="hidden md:inline text-sm">{user?.username}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link 
                  to="/my-account" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-indigo-500 text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}