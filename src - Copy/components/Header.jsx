import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ cartItems, isAuthenticated, onLogout, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleAccountClick = () => {
    navigate('/account')
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
  }

  const handleLogoutClick = () => {
    onLogout()
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 flex items-center hover:text-blue-700 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="bg-blue-600 text-white px-2 py-1 rounded mr-2">SE</span>
            ShopEasy
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-1" />
                    <span className="font-medium">
                      {user?.name || user?.email.split('@')[0]}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleAccountClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="text-gray-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </nav>

          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
            <Link 
              to="/" 
              className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleAccountClick}
                  className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {user?.name || user?.email.split('@')[0]}
                  </div>
                </button>
                <button 
                  onClick={handleLogoutClick}
                  className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            
            <Link 
              to="/cart" 
              className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
              {cartItems.length > 0 && (
                <span className="ml-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}