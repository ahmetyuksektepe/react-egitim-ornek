import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: []
}


export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user.push(action.payload)
        }
    }
})

export const { register } = registerSlice.actions

export default registerSlice.reducer