import axios from 'axios'
const weatherApiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrlGeo = 'http://api.openweathermap.org/geo/1.0/'
const baseUrlWeather = 'https://api.openweathermap.org/data/2.5'

const getGeoByCity = (city) => {
    const request = axios.get(`${baseUrlGeo}/direct?q=${city}&appid=${weatherApiKey}`)
    return request.then((response) => response.data)
}

const getWeatherByGeo = (lat, lon) => {
    const request = axios.get(`${baseUrlWeather}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`)
    return request.then((response) => response.data)
}

export default { getGeoByCity, getWeatherByGeo }