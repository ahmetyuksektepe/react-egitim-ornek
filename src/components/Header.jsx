import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/features/login/loginSlice'
import { removeAllShop } from '../redux/features/shop/shopSlice'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  InputBase, 
  Box,
  Menu,
  MenuItem,
  Badge
} from '@mui/material'
import { useSession } from '../hooks/SessionContext'
import { ShoppingCart as ShoppingCartIcon, AccountCircle, Search, ArrowBack } from '@mui/icons-material'
import ShoppingCart from './ShoppingCart'
import Supabase from '../db/supabase'

const Header = ({ showBackButton = false, onBackClick = null }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const { session } = useSession()
  const { totalQuantity } = useSelector(state => state.shop)

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await Supabase.auth.signOut()
      dispatch(logout())
      dispatch(removeAllShop()) // Clear cart on logout
      handleMenuClose()
      navigate('/login')
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error)
    }
  }

  const handleProfile = () => {
    handleMenuClose()
    navigate('/profile')
  }

  const handleOrders = () => {
    handleMenuClose()
    navigate('/orders')
  }

  const handleLogin = () => {
    handleMenuClose()
    navigate('/login')
  }

  const handleGoBack = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {showBackButton && (
            <IconButton 
              color="inherit" 
              onClick={handleGoBack}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/src/assets/react.svg" alt="React Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6">React/Redux Store</Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: 10 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255, 255, 255, 0.15)', borderRadius: 1, px: 2 }}>
              <InputBase placeholder="Search..." sx={{ color: 'white' }} />
              <Search sx={{ ml: 10 }} />
            </Box>
          </Box>

          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={handleProfileClick}
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="h6">Hoşgeldin {session?.user?.user_metadata?.username || 'Misafir'}</Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {session ? (
          <>
            <MenuItem onClick={handleProfile}>Profilim</MenuItem>
            <MenuItem onClick={handleOrders}>Siparişlerim</MenuItem>
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin}>Giriş Yap</MenuItem>
        )}
      </Menu>

      <ShoppingCart 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </>
  )
}

export default Header 