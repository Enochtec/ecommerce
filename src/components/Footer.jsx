import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              ShopEase
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your needs
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <MuiLink component={Link} to="/" color="inherit" underline="hover">
                  Home
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/products" color="inherit" underline="hover">
                  Products
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/about" color="inherit" underline="hover">
                  About Us
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/contact" color="inherit" underline="hover">
                  Contact
                </MuiLink>
              </li>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <MuiLink component={Link} to="/faq" color="inherit" underline="hover">
                  FAQ
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/shipping" color="inherit" underline="hover">
                  Shipping Policy
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/returns" color="inherit" underline="hover">
                  Returns & Refunds
                </MuiLink>
              </li>
              <li>
                <MuiLink component={Link} to="/privacy" color="inherit" underline="hover">
                  Privacy Policy
                </MuiLink>
              </li>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street<br />
              New York, NY 10001<br />
              Email: info@shopease.com<br />
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" textAlign="center">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}