import { useState, useEffect } from 'react'
import { 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  CircularProgress
} from '@mui/material'
import { Link } from 'react-router-dom'
import { fetchUserOrders } from '../../services/orderService'
import { format } from 'date-fns'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadOrders()
  }, [])

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Orders
      </Typography>
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          You haven't placed any orders yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {format(new Date(order.created_at), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Box 
                      component="span" 
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 
                          order.status === 'completed' ? 'success.light' :
                          order.status === 'processing' ? 'info.light' :
                          order.status === 'cancelled' ? 'error.light' : 'warning.light',
                        color: 'common.white',
                        fontSize: '0.75rem'
                      }}
                    >
                      {order.status}
                    </Box>
                  </TableCell>
                  <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button 
                      component={Link}
                      to={`/my-account/orders/${order.id}`}
                      variant="outlined"
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}