import React from 'react'
import { useSession } from '../hooks/SessionContext'
import Header from '../components/Header'
import { 
  Box, 
  Typography, 
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip
} from '@mui/material'
import { 
  Person,
  Email,
  Phone,
  CalendarToday
} from '@mui/icons-material'


const Profile = () => {
  const { session } = useSession()

  return (
    <> 
      <Header showBackButton={true} />

     <Box sx={styles.container}>

        <Card sx={styles.headerCard}>
          <CardContent sx={{ textAlign: 'center', pb: 2 }}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 20px',
                bgcolor: 'primary.main',
                fontSize: '2.5rem'
              }}
            >
              {session?.user?.user_metadata?.username?.charAt(0)?.toUpperCase() || 'M'}
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
              {session?.user?.user_metadata?.username || 'Misafir'}
            </Typography>
            <Chip 
              label="Aktif Kullanıcı" 
              color="success" 
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </CardContent>
        </Card>

        <Card sx={styles.infoCard}>
          <CardContent>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              color: '#2c3e50',
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Person sx={{ mr: 1, color: 'primary.main' }} />
              Kişisel Bilgiler
            </Typography>

            <Box sx={styles.infoRow}>
              <Box sx={styles.infoItem}>
                <Person sx={styles.infoIcon} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Ad Soyad
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#34495e' }}>
                    {session?.user?.user_metadata?.username || 'Belirtilmemiş'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={styles.infoItem}>
                <Email sx={styles.infoIcon} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    E-posta Adresi
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#34495e' }}>
                    {session?.user?.email || 'Belirtilmemiş'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={styles.infoItem}>
                <Phone sx={styles.infoIcon} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Telefon Numarası
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#34495e' }}>
                    {session?.user?.user_metadata?.phone || 'Belirtilmemiş'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={styles.infoItem}>
                <CalendarToday sx={styles.infoIcon} />
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Kayıt Tarihi
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#34495e' }}>
                    {session?.user?.created_at ? new Date(session.user.created_at).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
     </Box>
     </>
  )
}

export default Profile

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: '800px',
    width: '100%',
    margin: '40px auto',
    padding: '20px',
    gap: '24px',
  },

  headerCard: {
    width: '100%',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '& .MuiCardContent-root': {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      margin: '8px',
      color: '#2c3e50'
    }
  },

  infoCard: {
    width: '100%',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    background: 'white',
    border: '1px solid #e3f2fd',
  },

  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0px',
  },

  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
  },

  infoIcon: {
    color: 'primary.main',
    fontSize: '28px',
    backgroundColor: '#e3f2fd',
    borderRadius: '50%',
    padding: '8px',
    width: '44px',
    height: '44px',
  }
}