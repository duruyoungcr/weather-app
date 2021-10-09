import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

const APPID = process.env.REACT_APP_OPEN_WEATHER_APP_ID

export const getWeatherData = createAsyncThunk('weather/getWeatherData', async ({ unit }) => {
    const response = await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${APPID}&cnt=40&units=${unit}`);
    return response.data;
})


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: [],
        loading: true,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: {
        [getWeatherData.fulfilled]: (state, action) => {
            state.error = false;
            state.data = action.payload;
            state.loading = false;
        },
        [getWeatherData.rejected]: (state, action) => {
            alert('An error occurred !')
            state.loading = false;
            state.error = true;
        },
    }
})

export const { increment, decrement, incrementByAmount } = weatherSlice.actions

export default weatherSlice.reducer