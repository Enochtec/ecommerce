import { useNavigate } from 'react-router-dom'

export default function Checkout({ user }) {
  const navigate = useNavigate()

  const handleSubmitOrder = () => {
    // In a real app, you would process the payment here
    alert(`Order submitted successfully for ${user.name || user.email}!`)
    navigate('/order-confirmation')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Add more shipping fields as needed */}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-md p-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 block text-sm text-gray-900">Credit Card</span>
                </label>
              </div>
              {/* Add more payment methods as needed */}
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleSubmitOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}