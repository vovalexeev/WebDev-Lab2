const WeatherAPI = new WeatherAPI()

const weatherHere = document.querySelector('.weather-here')
const weatherCity = document.querySelector('.weather-city-list')

updateWeatherHere()
updateWeatherFavorites()

const updateButton = document.querySelector('.weather-here-update-button weather-here-update-img')
updateButton.addEventListener('click', updateWeatherHere)
const addCityButton = document.querySelector('.add-button')
addCityButton.addEventListener('click', )