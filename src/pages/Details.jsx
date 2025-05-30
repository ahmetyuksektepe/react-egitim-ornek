import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Card, CardMedia, CardContent, AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Badge } from '@mui/material'
import { ShoppingCart as ShoppingCartIcon, AccountCircle, Search, ArrowBack } from '@mui/icons-material'
import { addShop } from '../redux/features/shop/shopSlice'
import { logout } from '../redux/features/login/loginSlice'
import ShoppingCart from '../components/ShoppingCart'
import axios from 'axios'

const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const { username } = useSelector((state) => state.login)
  const { totalQuantity } = useSelector(state => state.shop)

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
    navigate('/login')
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

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
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
          <Typography variant="h6">Hoşgeldin {username || 'Misafir'}</Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {username ? (
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

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <CardMedia
            component="img"
            sx={{ 
              width: { xs: '100%', md: '40%' },
              objectFit: 'contain',
              p: 2
            }}
            image={product.image}
            alt={product.title}
          />
          <CardContent sx={{ flex: 1, p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price * 20} ₺
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Typography variant="subtitle1" sx={{
              display: 'inline-block',
              bgcolor: '#f0f0f0',
              px: 2,
              py: 1,
              borderRadius: 1,
              mb: 3
            }}>
              {product.category}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                variant="outlined"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </Button>
            </Box>

            <Button 
              variant="contained" 
              size="large"
              fullWidth
              onClick={() => {
                dispatch(addShop({...product, quantity}))
              }}
            >
              Sepete Ekle
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default Details