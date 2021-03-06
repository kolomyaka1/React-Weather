import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosResponse } from "axios"
import { Weather } from "../types/types"

type CurrentWeather = {
    weather: Weather
    isLoading: boolean
    response: Response
    currentLat: number
    currentLon: number
}

export type Response = {
    status: number
    message: string
}


const initialState: CurrentWeather = {
    weather: {
        main: {
            temp: 0,
            feels_like: 0,
            pressure: 0
        },
        name: '',
        wind: {
            speed: 0,
            deg: 0,
        },
        weather: [
            {
                main: ''
            }
        ]
    },
    isLoading: false,
    response: {
        status: 0,
        message: '',
    },
    currentLat: 59.8944,
    currentLon: 30.2642,

}

// Создаем slice

export const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {                        // Аналог switch(case) в редюсере, обычно для получения погоды необходимо было бы создавать отдельный switch в которым прописывали логику для изменения state, но не изменяя его!
        fetchCurrentWeather(state) {    // Здесь же мы можем именно изменять наш state, мутируем
            state.isLoading = true;
        },
        fetchCurrentWeatherSuccess(state, action: PayloadAction<AxiosResponse<Weather>>) {
            state.isLoading = false;
            state.weather = action.payload.data;                       // В случае успешного получения ответа от сервера сохраняем данные в state.
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            }
        },
        fetchCurrentWeatherError(state, action: PayloadAction<AxiosResponse<Weather>>) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText
            }
        },
        setCurrentCoords(state, action: PayloadAction<Array<number>>) {
            state.currentLat = action.payload[0];
            state.currentLon = action.payload[1]
        },

    }
})

export const { setCurrentCoords } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;