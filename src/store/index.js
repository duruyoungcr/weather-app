import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weather'

export const store = configureStore({
    reducer: {
        app: weatherReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})