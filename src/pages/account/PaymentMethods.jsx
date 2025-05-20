import { useState, useEffect } from 'react'
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton
} from '@mui/material'
import { Add, Edit, Delete, CreditCard } from '@mui/icons-material'
import { fetchPaymentMethods, createPaymentMethod, deletePaymentMethod } from "@/services/paymentService";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [cardData, setCardData] = useState({
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: ''
  })

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const data = await fetchPaymentMethods()
        setPaymentMethods(data)
      } catch (error) {
        console.error('Failed to fetch payment methods:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPaymentMethods()
  }, [])

  const handleOpenDialog = () => {
    setCardData({
      number: '',
      exp_month: '',
      exp_year: '',
      cvc: ''
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const newMethod = await createPaymentMethod(cardData)
      setPaymentMethods([...paymentMethods, newMethod])
      handleCloseDialog()
    } catch (error) {
      console.error('Failed to add payment method:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) return
    
    setIsLoading(true)
    try {
      await deletePaymentMethod(id)
      setPaymentMethods(paymentMethods.filter(method => method.id !== id))
    } catch (error) {
      console.error('Failed to delete payment method:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Payment Methods
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Add Payment Method
        </Button>
      </Box>
      
      {isLoading && paymentMethods.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : paymentMethods.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          You haven't saved any payment methods yet.
        </Typography>
      ) : (
        <List>
          {paymentMethods.map((method) => (
            <ListItem 
              key={method.id} 
              sx={{ 
                mb: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 1,
                position: 'relative'
              }}
            >
              <CreditCard sx={{ mr: 2 }} />
              <ListItemText
                primary={`${method.brand} ending in •••• ${method.last4}`}
                secondary={`Expires ${method.exp_month}/${method.exp_year}`}
              />
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(method.id)}
                  disabled={isLoading}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Payment Method</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Card Number"
              name="number"
              fullWidth
              margin="normal"
              value={cardData.number}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiration Month"
                name="exp_month"
                fullWidth
                margin="normal"
                value={cardData.exp_month}
                onChange={handleChange}
                placeholder="MM"
                required
              />
              <TextField
                label="Expiration Year"
                name="exp_year"
                fullWidth
                margin="normal"
                value={cardData.exp_year}
                onChange={handleChange}
                placeholder="YYYY"
                required
              />
              <TextField
                label="CVC"
                name="cvc"
                fullWidth
                margin="normal"
                value={cardData.cvc}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}