import { useState } from 'react'

export default function CartItem({ item, removeFromCart, updateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value)
    setQuantity(newQuantity)
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="py-4 flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-800">{item.name}</h3>
          <span className="font-bold text-blue-600">${item.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center mt-2">
          <label htmlFor={`quantity-${item.id}`} className="mr-2 text-sm text-gray-600">Qty:</label>
          <select
            id={`quantity-${item.id}`}
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 self-start sm:self-center"
      >
        Remove
      </button>
    </div>
  )
}