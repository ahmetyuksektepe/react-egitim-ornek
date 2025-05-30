import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    store: []
}

export const getStore = createAsyncThunk('getStore', async () => {
    const {data} = await axios.get('https://fakestoreapi.com/products')
    return data
})

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
    
    },
    
    extraReducers: (builder) => {
        builder.addCase(getStore.fulfilled, (state, action) => {
            state.store = action.payload
        })
    }
})

export default storeSlice.reducer