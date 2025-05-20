import { Link } from 'react-router-dom'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'

export default function CategoryCard({ category }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea component={Link} to={`/products?category=${category.slug}`}>
        <CardMedia
          component="img"
          height="200"
          image={category.image}
          alt={category.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}