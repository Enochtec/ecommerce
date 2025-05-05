import { useParams } from 'react-router-dom'
import { products } from '../data'
import { useState } from 'react'

export default function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center">Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[product.image, ...(product.additionalImages || [])].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          <div className="text-3xl font-bold text-blue-600 mb-6">${product.price.toFixed(2)}</div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {product.features && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Features:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors mb-4"
            >
              Add to Cart
            </button>

            <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg transition-colors">
              Buy Now
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Free shipping on orders over $50
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              30-day return policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}