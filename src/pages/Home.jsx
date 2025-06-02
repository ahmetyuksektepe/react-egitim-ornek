import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStore } from '../redux/features/card/storeSlice'
import { addShop } from '../redux/features/shop/shopSlice'
import CardComponent from '../components/CardComponent'
import Header from '../components/Header'
import { 
  Typography, 
  Box
} from '@mui/material'

const Home = () => {
  const dispatch = useDispatch()

  const { store } = useSelector(state => state.store)

  const handleAddCard = (item) => {
    dispatch(addShop(item))
  }

  useEffect(() => {
    dispatch(getStore())
  }, [dispatch])

  return (
    <div>
      <Header />

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