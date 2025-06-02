import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Card, CardMedia, CardContent} from '@mui/material'
import { addShop } from '../redux/features/shop/shopSlice'
import axios from 'axios'
import { useSession } from '../hooks/SessionContext'
import Header from '../components/Header'

const Details = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1)
 

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <div>
      <Header showBackButton={true}/>

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4}}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <CardMedia
            component="img"
            sx={{ 
              width: 400,
              height: 400,
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