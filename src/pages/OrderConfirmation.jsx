import { Link, useLocation } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmation({ user }) {
  const location = useLocation()
  const orderDetails = location.state?.orderDetails || {
    orderNumber: `#${Math.floor(Math.random() * 1000000)}`,
    date: new Date().toLocaleDateString(),
    total: 0,
    items: []
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase, {user?.name || user?.email.split('@')[0]}!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            We've sent a confirmation email to {user?.email}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="text-gray-600">Total</span>
              <span className="font-bold">${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Items Purchased</h2>
          <div className="space-y-4">
            {orderDetails.items.map(item => (
              <div key={item.id} className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
              <p className="mt-1 text-gray-900">
                123 Main St<br />
                Anytown, CA 12345<br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <p className="mt-1 text-gray-900">
                {user?.email}<br />
                (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex justify-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account/orders"
            className="inline-flex justify-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}