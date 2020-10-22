const weatherAPI = new WeatherAPI()

const weatherHere = document.querySelector('.weather-here')
const weatherCity = document.querySelector('.weather-city-list')
if (!localStorage.getItem('favoritesList'))
    localStorage.setItem('favoritesList', '[]')

updateWeatherHere()
updateWeatherFavorites()

const updateButton = document.querySelectorAll('.weather-here-update-button, .update-media')
for(let i = 0; i < updateButton.length; i++){ 
    if (updateButton){
        updateButton[i].addEventListener('click', updateWeatherHere)
    }
}	
const addCityButton = document.querySelector('.add-city-form')
addCityButton.addEventListener('submit', addToFavorites)
window.addEventListener("offline", function(e) {alert("Internet disconnected... Please refresh the page!");})