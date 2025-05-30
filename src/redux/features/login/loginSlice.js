import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    username: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload
        },
        logout: (state) => {
            state.username = ''
        }
    }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
