import React from 'react'
import { Card, CardContent, CardActions, CardMedia, Button, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CardComponent = ({id, image, title, price, description, category, count, rate, addCard}) => {
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addCard({
      id,
      image,
      title,
      price,
      description,
      category,
      count,
      rate
    })
  }
  
  return (
    <div>
      <Card variant="outlined" sx={{ width: 300, height: 310 , boxShadow:5}}>
        <CardMedia
          component="img"
          height={140}
          sx={{ objectFit: "contain", p: 1 }}
          image={image}
          alt="random image"
        />
        <CardContent>
          <Typography sx={{fontSize: "1.3rem", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%"}}>{title}</Typography>
          <Typography sx={{fontSize: "1.2rem", fontWeight: "bold", fontStyle: "italic"}}>{(price*20).toFixed(2)} ₺</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' sx={{
              display: 'inline-block',
              padding: '4px 8px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              fontSize: '0.8rem',
            }}>{category}</Typography>
            <Box>
              <Typography variant='body2' sx={{display: 'inline-block'}}>
                {'★'.repeat(Math.floor(rate))}{'☆'.repeat(5-Math.floor(rate))} ({count} yorum)
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" color="primary" sx={{mt: 1, mr: 1}} onClick={handleAddToCart}>Sepete Ekle</Button>
          <Button variant="contained" color="primary" sx={{mt: 1, ml: 1}} onClick={() => navigate(`/details/${id}`)}>Detay</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardComponent