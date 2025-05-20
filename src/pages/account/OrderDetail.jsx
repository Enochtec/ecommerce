import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Button,
  CircularProgress
} from '@mui/material'
import { fetchOrderById } from '../../services/orderService'
import { format } from 'date-fns'

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(id)
        setOrder(data)
      } catch (error) {
        console.error('Failed to fetch order:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadOrder()
  }, [id])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (!order) {
    return (
      <Typography variant="body1">
        Order not found
      </Typography>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Order #{order.id}
        </Typography>
        <Button 
          variant="outlined"
          onClick={() => window.print()}
        >
          Print Order
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body1">
          <strong>Order Date:</strong> {format(new Date(order.created_at), 'MMM dd, yyyy')}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {order.status}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Order Items
      </Typography>
      <List>
        {order.items.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText 
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography>${item.price_at_purchase.toFixed(2)}</Typography>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ maxWidth: 400, ml: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal:</Typography>
          <Typography>${order.subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Shipping:</Typography>
          <Typography>${order.shipping_cost.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tax:</Typography>
          <Typography>${order.tax_amount.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${order.total_amount.toFixed(2)}</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          <Typography>
            {order.shipping_address.name}<br />
            {order.shipping_address.line1}<br />
            {order.shipping_address.line2 && <>{order.shipping_address.line2}<br /></>}
            {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
            {order.shipping_address.country}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          <Typography>
            {order.payment_method.type} ending in {order.payment_method.last4}<br />
            Expires {order.payment_method.exp_month}/{order.payment_method.exp_year}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}