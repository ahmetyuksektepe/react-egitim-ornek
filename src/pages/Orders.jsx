import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Card, CardContent, Grid } from '@mui/material'

const Orders = () => {
  const { orders, totalQuantity, totalAmount } = useSelector((state) => state.orders)
  console.log(orders)

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>My Orders</Typography>
      
      {orders.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          You don't have any orders yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{order.title}</Typography>
                  <Typography color="text.secondary">
                    Price: ${order.price}
                  </Typography>
                  <Typography color="text.secondary">
                    Quantity: {order.totalQuantity}
                  </Typography>
                  <Typography color="text.secondary">
                    Total: ${order.totalAmount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default Orders 