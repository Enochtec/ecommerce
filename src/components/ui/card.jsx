import { Card as MuiCard } from '@mui/material'

export default function Card({ children, ...props }) {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 2,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
        },
        ...props.sx
      }}
    >
      {children}
    </MuiCard>
  )
}