import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/features/login/loginSlice'
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
  Link
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

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')

  const handleLogin = () => {
    dispatch(login(username))
    navigate('/')
  }

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
              Giriş Yap
            </Typography>

            <TextField
              label="Kullanıcı Adı"
              type="text"
              variant="outlined"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Şifre"
              type="password"
              variant="outlined"
              fullWidth
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
              onClick={handleLogin}
            >
              Giriş Yap
            </Button>

            <Typography variant="body2" align="center">
              Üye değil misiniz?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/register')}
              >
                Şimdi Üye Ol
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default Login
