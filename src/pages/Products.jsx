import { useEffect, useState } from 'react'
import { Container, Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../services/productService'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter ? product.category_id === categoryFilter : true
    return matchesSearch && matchesCategory
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="mb-8">
        <Typography variant="h4" component="h1" gutterBottom>
          Our Products
        </Typography>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TextField
            label="Search products"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="1">Electronics</MenuItem>
              <MenuItem value="2">Clothing</MenuItem>
              <MenuItem value="3">Home & Garden</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      
      <Grid container spacing={4}>
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}