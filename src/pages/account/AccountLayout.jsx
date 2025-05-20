import { Outlet, Link, useLocation } from 'react-router-dom'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import {
  Person as ProfileIcon,
  ShoppingBag as OrdersIcon,
  Favorite as WishlistIcon,
  Home as AddressesIcon,
  CreditCard as PaymentMethodsIcon
} from '@mui/icons-material'

const accountMenu = [
  { path: 'profile', name: 'Profile', icon: <ProfileIcon /> },
  { path: 'orders', name: 'Orders', icon: <OrdersIcon /> },
  { path: 'wishlist', name: 'Wishlist', icon: <WishlistIcon /> },
  { path: 'addresses', name: 'Addresses', icon: <AddressesIcon /> },
  { path: 'payment-methods', name: 'Payment Methods', icon: <PaymentMethodsIcon /> },
]

export default function AccountLayout() {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop()

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar Navigation */}
      <Box sx={{ width: 250, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
        <List>
          {accountMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={`/my-account/${item.path}`}
                selected={currentPath === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Outlet />
      </Box>
    </Box>
  )
}