import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { User, ShoppingBag, Heart, MapPin, CreditCard, LogOut } from 'lucide-react'

export default function MyAccount({ user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.pathname.split('/account/')[1] || 'profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'wishlist', name: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
    { id: 'addresses', name: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
    { id: 'payment', name: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> }
  ]

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-medium">{user?.name || 'My Account'}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={`/account/${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow bg-white rounded-lg shadow-sm p-6">
            <Outlet context={{ user }} />
          </div>
        </div>
      </div>
    </div>
  )
}