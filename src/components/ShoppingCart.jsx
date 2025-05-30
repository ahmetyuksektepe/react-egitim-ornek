import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  IconButton, 
  Typography, 
  Box,
  Button,
  Divider,
  Snackbar,
  Alert
} from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { removeShop, addShop, deleteShop, removeAllShop } from '../redux/features/shop/shopSlice'
import { addOrder } from '../redux/features/orders/ordersSlice'

const ShoppingCart = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.shop)
  const [showAlert, setShowAlert] = useState(false)

  const handleAddItem = (item) => {
    dispatch(addShop(item))
  }

  const handleRemoveItem = (item) => {
    dispatch(removeShop(item.id))
  }

  const handleDeleteItem = (item) => {
    dispatch(deleteShop(item.id))
  }

  const handleOrder = () => {
    setShowAlert(true)
    dispatch(removeAllShop())
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Sepetim ({totalQuantity} ürün)</Typography>
          
          {items.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Sepetiniz boş
            </Typography>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleDeleteItem(item)}>
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={item.image}
                          variant="square"
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {(item.price * 20).toFixed(2)} ₺
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <IconButton size="small" onClick={() => handleRemoveItem(item)}>
                                <Remove />
                              </IconButton>
                              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                              <IconButton size="small" onClick={() => handleAddItem(item)}>
                                <Add />
                              </IconButton>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Toplam: {(totalAmount * 20).toFixed(2)} ₺
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  onClick={handleOrder}
                >
                  Siparişi Tamamla
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={2000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Siparişiniz başarıyla alındı!
        </Alert>
      </Snackbar>
    </>
  )
}

export default ShoppingCart 