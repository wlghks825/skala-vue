import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  },
})

export const fetchWeatherByCity = async (cityName) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: cityName },
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch weather for ${cityName}:`, error)
    throw error
  }
}
