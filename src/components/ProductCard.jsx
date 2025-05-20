import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1)
      toast.success('Product added to cart!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image_url || '/placeholder-product.jpg'} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}