import { useState } from 'react'
import { MapPin, Plus, Trash2, Edit, Check, X } from 'lucide-react'

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States',
      phone: '(555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Doe',
      street: '456 Office Park',
      city: 'Business City',
      state: 'CA',
      zip: '67890',
      country: 'United States',
      phone: '(555) 987-6543',
      isDefault: false
    }
  ])

  const [isEditing, setIsEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    isDefault: false
  })

  const handleEdit = (address) => {
    setIsEditing(address.id)
    setEditForm({ ...address })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const saveEdit = () => {
    setAddresses(addresses.map(addr => 
      addr.id === isEditing ? { ...editForm } : 
      editForm.isDefault ? { ...addr, isDefault: false } : addr
    ))
    setIsEditing(null)
  }

  const cancelEdit = () => {
    setIsEditing(null)
  }

  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const addAddress = () => {
    const newId = Math.max(...addresses.map(a => a.id), 0) + 1
    setAddresses([
      ...addresses.map(addr => newAddress.isDefault ? { ...addr, isDefault: false } : addr),
      { ...newAddress, id: newId }
    ])
    setShowAddForm(false)
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      phone: '',
      isDefault: false
    })
  }

  const deleteAddress = (id) => {
    if (addresses.find(a => a.id === id)?.isDefault) {
      alert('Cannot delete default address. Set another as default first.')
      return
    }
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const setDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add New Address
        </button>
      </div>

      {/* Add New Address Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={newAddress.phone}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
              <input
                type="text"
                name="zip"
                value={newAddress.zip}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                name="country"
                value={newAddress.country}
                onChange={handleAddChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="defaultAddress"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="defaultAddress" className="ml-2 block text-sm text-gray-900">
                Set as default address
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
              onClick={addAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(address => (
          <div 
            key={address.id} 
            className={`bg-white p-6 rounded-lg shadow-sm border ${
              address.isDefault ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <MapPin className={`h-5 w-5 ${
                  address.isDefault ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <h3 className="ml-2 font-medium">
                  {address.isDefault ? 'Default Address' : 'Secondary Address'}
                </h3>
              </div>
              {isEditing === address.id ? (
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
                    onClick={() => handleEdit(address)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {isEditing === address.id ? (
              <div className="mt-4 space-y-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="street"
                    value={editForm.street}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="city"
                    value={editForm.city}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="state"
                    value={editForm.state}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={editForm.zip}
                    onChange={handleEditChange}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`default-${address.id}`}
                    name="isDefault"
                    checked={editForm.isDefault}
                    onChange={handleEditChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`default-${address.id}`} className="ml-2 block text-sm text-gray-900">
                    Default address
                  </label>
                </div>
              </div>
            ) : (
              <address className="mt-4 not-italic text-gray-700">
                <p className="font-medium">{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zip}</p>
                <p>{address.country}</p>
                <p className="mt-2">Phone: {address.phone}</p>
              </address>
            )}

            {!address.isDefault && isEditing !== address.id && (
              <button
                onClick={() => setDefault(address.id)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              >
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}