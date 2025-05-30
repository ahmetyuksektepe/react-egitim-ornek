import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { login } from '../redux/features/login/loginSlice'
import { useSession } from '../hooks/SessionContext'
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
  Alert,
  Snackbar
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
  const { session } = useSession()
  const [error, setError] = useState(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Redirect if already logged in
  React.useEffect(() => {
    if (session) {
      navigate('/')
    }
  }, [session, navigate])

  const handleLogin = async () => {
    try {
      const { data, error } = await Supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      
      if (error) {
        setError(error.message)
      } else {
        dispatch(login(data.user.email))
        navigate('/')
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default Login
