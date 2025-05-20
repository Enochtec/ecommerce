import { useState } from 'react'
import { CreditCard, Plus, Trash2, Edit, Check, X } from 'lucide-react'

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiration: '12/25',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiration: '06/24',
      name: 'John Doe',
      isDefault: false
    }
  ])

  const [isEditing, setIsEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'Visa',
    number: '',
    expiration: '',
    name: '',
    cvv: '',
    isDefault: false
  })

  const handleEdit = (method) => {
    setIsEditing(method.id)
    setEditForm({ ...method })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const saveEdit = () => {
    setPaymentMethods(paymentMethods.map(pm => 
      pm.id === isEditing ? { ...editForm } : 
      editForm.isDefault ? { ...pm, isDefault: false } : pm
    ))
    setIsEditing(null)
  }

  const cancelEdit = () => {
    setIsEditing(null)
  }

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewPaymentMethod(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addPaymentMethod = () => {
    // In a real app, you would validate and tokenize the card with a payment processor
    const last4 = newPaymentMethod.number.slice(-4)
    const newId = Math.max(...paymentMethods.map(pm => pm.id), 0) + 1
    
    setPaymentMethods([
      ...paymentMethods.map(pm => newPaymentMethod.isDefault ? { ...pm, isDefault: false } : pm),
      { 
        id: newId,
        type: newPaymentMethod.type,
        last4,
        expiration: newPaymentMethod.expiration,
        name: newPaymentMethod.name,
        isDefault: newPaymentMethod.isDefault
      }
    ])
    
    setShowAddForm(false)
    setNewPaymentMethod({
      type: 'Visa',
      number: '',
      expiration: '',
      name: '',
      cvv: '',
      isDefault: false
    })
  }

  const deletePaymentMethod = (id) => {
    if (paymentMethods.find(pm => pm.id === id)?.isDefault) {
      alert('Cannot delete default payment method. Set another as default first.')
      return
    }
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id))
  }

  const setDefault = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add Payment Method
        </button>
      </div>

      {/* Add New Payment Method Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Payment Method</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
              <select
                name="type"
                value={newPaymentMethod.type}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option>Visa</option>
                <option>Mastercard</option>
                <option>American Express</option>
                <option>Discover</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="number"
                value={newPaymentMethod.number}
                onChange={handleAddChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (MM/YY)</label>
                <input
                  type="text"
                  name="expiration"
                  value={newPaymentMethod.expiration}
                  onChange={handleAddChange}
                  placeholder="12/25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={newPaymentMethod.cvv}
                  onChange={handleAddChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                name="name"
                value={newPaymentMethod.name}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="defaultPayment"
                name="isDefault"
                checked={newPaymentMethod.isDefault}
                onChange={handleAddChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="defaultPayment" className="ml-2 block text-sm text-gray-900">
                Set as default payment method
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={addPaymentMethod}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Payment Method
            </button>
          </div>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map(method => (
          <div 
            key={method.id} 
            className={`bg-white p-6 rounded-lg shadow-sm border ${
              method.isDefault ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <CreditCard className={`h-5 w-5 ${
                  method.isDefault ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <div className="ml-3">
                  <h3 className="font-medium">
                    {method.type} ending in {method.last4}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Expires {method.expiration} • {method.name}
                  </p>
                  {method.isDefault && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
              
              {isEditing === method.id ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={saveEdit}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={cancelEdit}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(method)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => deletePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {isEditing === method.id && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>American Express</option>
                    <option>Discover</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    name="expiration"
                    value={editForm.expiration}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`default-${method.id}`}
                    name="isDefault"
                    checked={editForm.isDefault}
                    onChange={handleEditChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`default-${method.id}`} className="ml-2 block text-sm text-gray-900">
                    Default payment method
                  </label>
                </div>
              </div>
            )}

            {!method.isDefault && isEditing !== method.id && (
              <button
                onClick={() => setDefault(method.id)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              >
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800">Security Notice</h3>
        <p className="mt-1 text-sm text-blue-700">
          Your payment information is securely stored and encrypted. We never store your full card number or CVV.
        </p>
      </div>
    </div>
  )
}