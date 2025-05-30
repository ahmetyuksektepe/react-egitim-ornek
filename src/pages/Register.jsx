import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/features/register/registerSlice'
import Supabase from '../db/supabase'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Alert
} from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#1C4875' },
    secondary: { main: '#FFFFFF' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
})

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)

  const { user } = useSelector(state => state.register)
  console.log(user)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

const handleRegister = async () => {
  const { data , error } = await Supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        phone: phone
      }
    }
  })
  console.log(data)
  if (error) {
    console.log(error)
  } else {
    setShowAlert(true)
  }
}
 

  /*const handleRegister = () => {
    const user = {
      username,
      email,
      password,
      phone
    }
    dispatch(register(user))
  }*/

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Tam ekran arkaplan gradyanı */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom right, #000000, #4f4f4f)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        {/* Formu Card içinde göstermek */}
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 3,
            boxShadow: 8,
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography
              variant="h4"
              align="center"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              Üye Ol
            </Typography>

            <TextField
              label="Kullanıcı Adı"
              type="text"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="E-posta"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Şifre"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <TextField
              label="Telefon Numarası"
              type="number"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                pt: 1.5,
                pb: 1.5,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
              onClick={handleRegister}
            >
              Üye Ol
            </Button>

            <Typography variant="body2" align="center">
              Hesabınız var mı?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
              >
                Şimdi Giriş Yap
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
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
          Üye olma işlemi başarıyla tamamlandı! Mailinize doğrulama linki gönderildi.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default Register
