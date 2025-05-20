import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  )
}