import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStore } from '../redux/features/card/storeSlice'
import { logout } from '../redux/features/login/loginSlice'
import { addShop } from '../redux/features/shop/shopSlice'
import { useNavigate } from 'react-router-dom'
import CardComponent from '../components/CardComponent'
import ShoppingCart from '../components/ShoppingCart'
import { useSession } from '../hooks/SessionContext'
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
import { ShoppingCart as ShoppingCartIcon, AccountCircle, Search } from '@mui/icons-material'
import Supabase from '../db/supabase'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const { session } = useSession()
  const { store } = useSelector(state => state.store)
  const { totalQuantity } = useSelector(state => state.shop)

  const handleAddCard = (item) => {
    dispatch(addShop(item))
  }

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

  useEffect(() => {
    dispatch(getStore())
    console.log(session)
  }, [dispatch])

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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

      <Box component="img" 
        src="https://www.niobehosting.com/blog/wp-content/uploads/react-nedir-en-cok-kullanilan-react-frameworkleri.jpeg"
        alt="React Logo"
        sx={{ 
          width: '40%',
          height: 300,
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          margin: '0 auto'
        }} 
      />

      <Typography variant="h4" sx={{ my: 4, textAlign: 'center' }}>Ürünler</Typography>

      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "20px", 
        px: 4,
        justifyContent: "center" 
      }}>
        {store.map((item) => (
          <CardComponent 
            key={item.id}
            id={item.id}
            image={item.image} 
            title={item.title} 
            price={item.price} 
            description={item.description} 
            category={item.category} 
            count={item.rating.count} 
            rate={item.rating.rate} 
            addCard={handleAddCard}
          />
        ))}
      </Box>
    </div>
  )
}

export default Home