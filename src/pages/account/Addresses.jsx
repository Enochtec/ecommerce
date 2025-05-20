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
  CircularProgress
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { fetchAddresses, createAddress, updateAddress, deleteAddress } from '../../services/addressService'

export default function Addresses() {
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone: '',
    is_default: false
  })

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const data = await fetchAddresses()
        setAddresses(data)
      } catch (error) {
        console.error('Failed to fetch addresses:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadAddresses()
  }, [])

  const handleOpenDialog = (address = null) => {
    setCurrentAddress(address)
    setFormData(address ? { ...address } : {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      phone: '',
      is_default: false
    })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setCurrentAddress(null)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (currentAddress) {
        const updatedAddress = await updateAddress(currentAddress.id, formData)
        setAddresses(addresses.map(addr => 
          addr.id === updatedAddress.id ? updatedAddress : addr
        ))
      } else {
        const newAddress = await createAddress(formData)
        setAddresses([...addresses, newAddress])
      }
      handleCloseDialog()
    } catch (error) {
      console.error('Failed to save address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return
    
    setIsLoading(true)
    try {
      await deleteAddress(id)
      setAddresses(addresses.filter(addr => addr.id !== id))
    } catch (error) {
      console.error('Failed to delete address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Addresses
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New Address
        </Button>
      </Box>
      
      {isLoading && addresses.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : addresses.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>
          You haven't saved any addresses yet.
        </Typography>
      ) : (
        <List>
          {addresses.map((address) => (
            <ListItem 
              key={address.id} 
              sx={{ 
                mb: 2, 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 1,
                position: 'relative'
              }}
            >
              <ListItemText
                primary={
                  <>
                    {address.name}
                    {address.is_default && (
                      <Box 
                        component="span" 
                        sx={{ 
                          ml: 1,
                          px: 1,
                          py: 0.5,
                          backgroundColor: 'primary.main',
                          color: 'white',
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      >
                        Default
                      </Box>
                    )}
                  </>
                }
                secondary={
                  <>
                    {address.line1}<br />
                    {address.line2 && <>{address.line2}<br /></>}
                    {address.city}, {address.state} {address.postal_code}<br />
                    {address.country}<br />
                    Phone: {address.phone}
                  </>
                }
              />
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenDialog(address)}
                >
                  Edit
                </Button>
                {!address.is_default && (
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address Line 1"
              name="line1"
              fullWidth
              margin="normal"
              value={formData.line1}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address Line 2"
              name="line2"
              fullWidth
              margin="normal"
              value={formData.line2}
              onChange={handleChange}
            />
            <TextField
              label="City"
              name="city"
              fullWidth
              margin="normal"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <TextField
              label="State/Province"
              name="state"
              fullWidth
              margin="normal"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <TextField
              label="Postal Code"
              name="postal_code"
              fullWidth
              margin="normal"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
            <TextField
              label="Country"
              name="country"
              fullWidth
              margin="normal"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Box sx={{ mt: 2 }}>
              <input
                type="checkbox"
                id="is_default"
                name="is_default"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
              />
              <label htmlFor="is_default" style={{ marginLeft: '8px' }}>
                Set as default address
              </label>
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