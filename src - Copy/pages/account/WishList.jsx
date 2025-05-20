import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'

export default function Wishlist() {
  // Sample wishlist data - replace with real data
  const wishlistItems = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' }
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Your Wishlist</h2>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={`/products/${item.id}`} className="block">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}