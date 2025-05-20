import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Typography, Button, Divider, Rating, Chip } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { fetchProductById } from '../services/productService'
import { useCart } from '../hooks/useCart'
import { toast } from 'react-toastify'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity)
      toast.success('Product added to cart!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) return <div>Product not found</div>

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image_url || '/placeholder-product.jpg'} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <div className="flex items-center mb-4">
            <Rating value={4.5} precision={0.5} readOnly />
            <span className="ml-2 text-gray-600">(24 reviews)</span>
          </div>
          
          <Typography variant="h5" component="div" className="mb-4">
            ${product.price.toFixed(2)}
          </Typography>
          
          <div className="mb-6">
            <Chip 
              label={product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'} 
              color={product.stock_quantity > 0 ? 'success' : 'error'} 
              className="mr-2"
            />
            <Chip label={product.category_name} variant="outlined" />
          </div>
          
          <Typography variant="body1" paragraph className="mb-6">
            {product.description || 'No description available.'}
          </Typography>
          
          <Divider className="my-4" />
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded">
              <Button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4">{quantity}</span>
              <Button 
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={quantity >= product.stock_quantity}
              >
                +
              </Button>
            </div>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock_quantity <= 0}
            >
              Add to Cart
            </Button>
          </div>
        </Grid>
      </Grid>
      
      <div className="mt-12">
        <Typography variant="h5" component="h2" gutterBottom>
          Product Details
        </Typography>
        <Typography variant="body1" paragraph>
          More details about the product would go here...
        </Typography>
      </div>
    </Container>
  )
}