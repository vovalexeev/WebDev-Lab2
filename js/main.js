const weatherAPI = new WeatherAPI()

const weatherHere = document.querySelector('.weather-here')
const weatherCity = document.querySelector('.weather-city-list')
if (!localStorage.getItem('favoritesList'))
    localStorage.setItem('favoritesList', '[]')

updateWeatherHere()
updateWeatherFavorites()

const updateButton = document.querySelector('.weather-here-update-button weather-here-update-img')
updateButton.addEventListener('click', updateWeatherHere)
const addCityButton = document.querySelector('.add-button')
addCityButton.addEventListener('click', addToFavorites)