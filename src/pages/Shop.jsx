import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStore } from '../redux/features/card/storeSlice'
import { addShop } from '../redux/features/shop/shopSlice'
import CardComponent from '../components/CardComponent'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Slider,
  Divider,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Search, FilterList, Sort } from '@mui/icons-material'

const Shop = () => {
  const dispatch = useDispatch()
  const { store } = useSelector((state) => state.store)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    dispatch(getStore())
  }, [])

  // Kategorileri al
  const categories = ['all', ...new Set(store.map(item => item.category))]

  // Filtreleme ve sıralama işlemleri
  const filteredProducts = store
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesPrice = item.price * 20 >= priceRange[0] && item.price * 20 <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  const handleAddToCart = (item) => {
    dispatch(addShop(item))
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ürünlerimiz
        </Typography>
        <Typography variant="body1" color="text.secondary">
          En kaliteli ürünler, en uygun fiyatlarla
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={selectedCategory}
                label="Kategori"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sırala</InputLabel>
              <Select
                value={sortBy}
                label="Sırala"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="default">Varsayılan</MenuItem>
                <MenuItem value="price-asc">Fiyat (Düşükten Yükseğe)</MenuItem>
                <MenuItem value="price-desc">Fiyat (Yüksekten Düşüğe)</MenuItem>
                <MenuItem value="name-asc">İsim (A-Z)</MenuItem>
                <MenuItem value="name-desc">İsim (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <IconButton
              color="primary"
              onClick={() => setShowFilters(!showFilters)}
              sx={{ width: '100%', border: '1px solid', borderColor: 'divider' }}
            >
              <FilterList />
              <Typography sx={{ ml: 1 }}>Filtreler</Typography>
            </IconButton>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography gutterBottom>Fiyat Aralığı</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              valueLabelFormat={(value) => `${value} ₺`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2">{priceRange[0]} ₺</Typography>
              <Typography variant="body2">{priceRange[1]} ₺</Typography>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              count={item.rating.count}
              rate={item.rating.rate}
              addCard={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Shop