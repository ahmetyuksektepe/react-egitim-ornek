import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addShop: (state, action) => {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            
            if (existingItem) {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.quantity * existingItem.price
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            
            state.totalQuantity++
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
        },
        removeShop: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.quantity * existingItem.price
            }
            
            state.totalQuantity--
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
        },
        deleteShop: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.items = state.items.filter(item => item.id !== id)
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
            }
        },
        removeAllShop: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0
        }
    }
})

export const { addShop, removeShop, deleteShop, removeAllShop } = shopSlice.actions
export default shopSlice.reducer