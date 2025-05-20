import { Container, Typography, Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import { fetchProducts } from '../services/productService'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch featured products
        const products = await fetchProducts({ featured: true, limit: 4 })
        setFeaturedProducts(products)
        
        // Mock categories - in a real app you would fetch these from your backend
        setCategories([
          { id: 1, name: 'Electronics', image: '/electronics.jpg', slug: 'electronics' },
          { id: 2, name: 'Clothing', image: '/clothing.jpg', slug: 'clothing' },
          { id: 3, name: 'Home & Garden', image: '/home-garden.jpg', slug: 'home-garden' },
          { id: 4, name: 'Books', image: '/books.jpg', slug: 'books' }
        ])
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        height: 400,
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        mb: 4
      }}>
        <Typography variant="h2" component="h1" color="white" textAlign="center">
          Welcome to Our Store
        </Typography>
      </Box>
      
      {/* Categories Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Shop by Category
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
      
      {/* Featured Products */}
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Products
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}