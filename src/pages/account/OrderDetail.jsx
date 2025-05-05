import { useParams } from 'react-router-dom'
import { Truck, CreditCard, CheckCircle } from 'lucide-react'

export default function OrderDetail() {
  const { orderId } = useParams()
  
  // In a real app, you would fetch this data based on orderId
  const order = {
    id: orderId || 'ORD-12345',
    date: '2023-05-15',
    status: 'Delivered',
    statusSteps: [
      { name: 'Order Placed', date: 'May 15, 2023', completed: true },
      { name: 'Processing', date: 'May 16, 2023', completed: true },
      { name: 'Shipped', date: 'May 18, 2023', completed: true },
      { name: 'Delivered', date: 'May 20, 2023', completed: true }
    ],
    total: 149.99,
    subtotal: 129.99,
    shipping: 10.00,
    tax: 10.00,
    items: [
      { 
        id: 1, 
        name: 'Wireless Headphones', 
        price: 99.99, 
        quantity: 1, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        status: 'Delivered May 20, 2023'
      },
      { 
        id: 2, 
        name: 'Phone Case', 
        price: 15.00, 
        quantity: 2, 
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        status: 'Delivered May 20, 2023'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States',
      phone: '(555) 123-4567'
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States'
    },
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiration: '12/25'
    },
    trackingNumber: 'USPS 94055112062123456789',
    deliveryNotes: 'Left at front door'
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order #{order.id}</h2>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'Delivered' 
            ? 'bg-green-100 text-green-800' 
            : order.status === 'Shipped'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Order Status</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
          <div className="space-y-8">
            {order.statusSteps.map((step, index) => (
              <div key={index} className="relative flex items-start">
                <div className={`absolute left-4 mt-1 h-2.5 w-2.5 rounded-full ${
                  step.completed ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
                <div className="ml-8">
                  <div className={`font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-sm text-gray-500">{step.date}</div>
                  {index === order.statusSteps.length - 1 && order.trackingNumber && (
                    <div className="mt-2 bg-blue-50 p-3 rounded-md inline-block">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                          <p className="text-sm text-blue-600">{order.trackingNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items Ordered */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
          <div className="divide-y divide-gray-200">
            {order.items.map(item => (
              <div key={item.id} className="py-4 flex">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.status}</p>
                </div>
                <div className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
            <address className="not-italic text-gray-700">
              {order.shippingAddress.name}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
              {order.shippingAddress.country}<br />
              <span className="mt-2 block">Phone: {order.shippingAddress.phone}</span>
              {order.deliveryNotes && (
                <div className="mt-2 p-2 bg-yellow-50 text-sm rounded">
                  <p className="font-medium">Delivery Notes:</p>
                  <p>{order.deliveryNotes}</p>
                </div>
              )}
            </address>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-gray-700">
                  {order.paymentMethod.type} ending in {order.paymentMethod.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {order.paymentMethod.expiration}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}