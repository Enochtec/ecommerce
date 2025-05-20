import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { createOrder } from '../services/orderService'
import { toast } from 'react-toastify'

const steps = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    try {
      const orderData = {
        shipping_address_id: shippingAddress.id,
        payment_method_id: paymentMethod.id,
        items: cart.items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.price
        }))
      }
      
      await createOrder(orderData)
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/order-confirmation')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ShippingStep 
            user={user} 
            onSelectAddress={setShippingAddress} 
            selectedAddress={shippingAddress}
          />
        )
      case 1:
        return (
          <PaymentStep 
            onSelectMethod={setPaymentMethod} 
            selectedMethod={paymentMethod}
          />
        )
      case 2:
        return (
          <ReviewStep 
            cart={cart} 
            cartTotal={cartTotal} 
            shippingAddress={shippingAddress}
            paymentMethod={paymentMethod}
          />
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box>
        {getStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
          )}
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              disabled={!shippingAddress || !paymentMethod || isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              Place Order
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !shippingAddress) ||
                (activeStep === 1 && !paymentMethod)
              }
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}

function ShippingStep({ user, onSelectAddress, selectedAddress }) {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        // In a real app, you would fetch user addresses from your backend
        const mockAddresses = [
          {
            id: 1,
            name: `${user?.username}`,
            line1: '123 Main St',
            line2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'United States',
            phone: '(123) 456-7890',
            is_default: true
          },
          {
            id: 2,
            name: `${user?.username}`,
            line1: '456 Oak Ave',
            city: 'Brooklyn',
            state: 'NY',
            postal_code: '11201',
            country: 'United States',
            phone: '(123) 456-7890',
            is_default: false
          }
        ]
        setAddresses(mockAddresses)
      } catch (error) {
        console.error('Failed to load addresses:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadAddresses()
  }, [user])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} md={6} key={address.id}>
              <Paper 
                sx={{ 
                  p: 3, 
                  border: selectedAddress?.id === address.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  cursor: 'pointer'
                }}
                onClick={() => onSelectAddress(address)}
              >
                <Typography variant="subtitle1">
                  {address.name}
                  {address.is_default && (
                    <Box component="span" sx={{ ml: 1, color: 'primary.main', fontSize: '0.75rem' }}>
                      (Default)
                    </Box>
                  )}
                </Typography>
                <Typography>
                  {address.line1}<br />
                  {address.line2 && <>{address.line2}<br /></>}
                  {address.city}, {address.state} {address.postal_code}<br />
                  {address.country}<br />
                  Phone: {address.phone}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

function PaymentStep({ onSelectMethod, selectedMethod }) {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        // In a real app, you would fetch payment methods from your backend
        const mockMethods = [
          {
            id: 1,
            brand: 'Visa',
            last4: '4242',
            exp_month: '12',
            exp_year: '2025',
            is_default: true
          },
          {
            id: 2,
            brand: 'Mastercard',
            last4: '5555',
            exp_month: '06',
            exp_year: '2024',
            is_default: false
          }
        ]
        setPaymentMethods(mockMethods)
      } catch (error) {
        console.error('Failed to load payment methods:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPaymentMethods()
  }, [])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} md={6} key={method.id}>
              <Paper 
                sx={{ 
                  p: 3, 
                  border: selectedMethod?.id === method.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  cursor: 'pointer'
                }}
                onClick={() => onSelectMethod(method)}
              >
                <Typography variant="subtitle1">
                  {method.brand} ending in •••• {method.last4}
                  {method.is_default && (
                    <Box component="span" sx={{ ml: 1, color: 'primary.main', fontSize: '0.75rem' }}>
                      (Default)
                    </Box>
                  )}
                </Typography>
                <Typography>
                  Expires {method.exp_month}/{method.exp_year}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

function ReviewStep({ cart, cartTotal, shippingAddress, paymentMethod }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Order Items
            </Typography>
            
            {cart.items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
                <Box sx={{ width: 80, height: 80, mr: 2 }}>
                  <img 
                    src={item.product.image_url || '/placeholder-product.jpg'} 
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    ${item.price.toFixed(2)} each
                  </Typography>
                </Box>
                <Typography variant="body1">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>
              {shippingAddress?.name}<br />
              {shippingAddress?.line1}<br />
              {shippingAddress?.line2 && <>{shippingAddress.line2}<br /></>}
              {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postal_code}<br />
              {shippingAddress?.country}<br />
              Phone: {shippingAddress?.phone}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Payment Method
            </Typography>
            <Typography>
              {paymentMethod?.brand} ending in •••• {paymentMethod?.last4}<br />
              Expires {paymentMethod?.exp_month}/{paymentMethod?.exp_year}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${cartTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping:</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax:</Typography>
              <Typography>$0.00</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${cartTotal.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}