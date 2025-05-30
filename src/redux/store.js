import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/login/loginSlice'
import registerReducer from './features/register/registerSlice'
import storeReducer from './features/card/storeSlice'
import ordersReducer from './features/orders/ordersSlice'
import shopReducer from './features/shop/shopSlice'
export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        store: storeReducer,
        orders: ordersReducer,
        shop: shopReducer,
    },
})
