import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Search } from 'lucide-react'
import { products as sampleProducts } from '../data'

export default function NotFound() {
  // Get 4 random popular products
  const popularProducts = [...sampleProducts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Error Header */}
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-medium text-gray-800">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Search Suggestion */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">Try searching for what you need:</p>
          <div className="mt-2 relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
              placeholder="Search products..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button className="h-full py-0 px-3 rounded-r-md bg-blue-600 text-white flex items-center">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500">Popular Products</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {popularProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="text-sm text-blue-600 hover:text-blue-500 hover:underline text-left"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
          <Link
            to="/products"
            className="inline-flex justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Browse All Products
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-6 text-sm text-gray-500">
          Need help? <Link to="/contact" className="text-blue-600 hover:text-blue-500">Contact support</Link>
        </p>
      </div>
    </div>
  )
}