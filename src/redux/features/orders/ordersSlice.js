import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    totalQuantity: 0,
    totalAmount: 0
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
            state.totalQuantity = action.payload.length
            state.totalAmount = action.payload.reduce((total, order) => total + order.price * order.quantity, 0)
        },
    }
})

export const { addOrder } = ordersSlice.actions
export default ordersSlice.reducer 