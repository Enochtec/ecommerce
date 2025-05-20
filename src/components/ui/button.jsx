import { Button as MuiButton } from '@mui/material'
import { CircularProgress } from '@mui/material'

export default function Button({ children, loading = false, ...props }) {
  return (
    <MuiButton
      {...props}
      disabled={loading || props.disabled}
      startIcon={loading ? <CircularProgress size={20} /> : props.startIcon}
    >
      {children}
    </MuiButton>
  )
}