import { useState } from 'react'
import { 
  Box,
  Typography,
  IconButton,
  TextField,
  Divider
} from '@mui/material'
import { Delete } from '@mui/icons-material'

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(99, newQuantity))
    setQuantity(qty)
    onQuantityChange(item.id, qty)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: 80, height: 80 }}>
          <img 
            src={item.product.image_url || '/placeholder-product.jpg'} 
            alt={item.product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {item.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TextField
              size="small"
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              inputProps={{ min: 1, max: 99 }}
              sx={{ width: 80, mr: 2 }}
            />
            
            <Typography variant="body1" sx={{ flex: 1, textAlign: 'right' }}>
              ${(item.price * quantity).toFixed(2)}
            </Typography>
            
            <IconButton 
              onClick={() => onRemove(item.id)}
              color="error"
              size="small"
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
    </Box>
  )
}