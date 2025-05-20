import { useState, useEffect } from 'react'
import { 
  Typography, 
  Box, 
  Grid,
  CircularProgress,
  IconButton
} from '@mui/material'
import { Favorite, Delete } from '@mui/icons-material'
// import { fetchWishlist, removeFromWishlist } from '../../../services/wishlistService'
import ProductCard from '../../components/ProductCard'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist()
        setWishlist(data)
      } catch (error) {
        console.error('Failed to fetch wishlist:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadWishlist()
  }, [])

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId)
      setWishlist(wishlist.filter(item => item.product.id !== productId))
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
    }
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Wishlist
      </Typography>
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : wishlist.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          Your wishlist is empty
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {wishlist.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ position: 'relative' }}>
                <ProductCard product={item.product} />
                <IconButton
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8, 
                    color: 'error.main',
                    backgroundColor: 'background.paper'
                  }}
                  onClick={() => handleRemove(item.product.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}