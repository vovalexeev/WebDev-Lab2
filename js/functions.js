//done
function weatherHereWaiting (){
    const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
    return document.importNode(weatherHereWaitingTemplate.content, true)
}

function weatherCityWaiting (cityName){
    const weatherCityWaitingTemplate = document.querySelector('template#weather-city-waiting')
    const newWeatherCityWaiting = document.importNode(weatherCityWaitingTemplate.content, true)
    newWeatherCityWaiting.querySelector('.city-name').innerText = cityName
  //  newWeatherCityWaiting.firstElementChild.setAttribute('cityName', cityName)
    return newWeatherCityWaiting
}
//done
function weathereHere (weather){
    const weatherHereTemplate = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
    setWeatherParameters(newWeatherHere, weather)
    return newWeatherHere
}
function weatherItem (weather){
    const weatherItemTemplate = document.querySelector('template#weather-item')
    const newWeatherCity = document.importNode(weatherItemTemplate.content, true)
    setWeatherParameters(newWeatherCity, weather)
  //  newWeatherCity.querySelector('.remove-city-btn').addEventListener('click', removeFromFavorites)
   // newWeatherCity.firstElementChild.setAttribute('cityName', weather.name)
    return newWeatherCity
}

//done
function updateWeatherHere() {
    weatherHere.innerHTML = ""
    const waitingItem = weatherHereWaiting()
    localWeatherItemParent.append(waitingItem)
    navigator.geolocation.getCurrentPosition(coordinates => {
            weatherAPI.getByCityCoordinates(coordinates)
                .then(weather => {
                    weatherHere.innerHTML = ""
                    localWeatherItemParent.append(weatherHere(weather))
                })
                .catch(() => alert('Something went wrong... Please refresh the page'))
        },
        positionError => console.log(positionError.message))
}

//done - without icon
function setWeatherParameters (element, weatherObject){
    const {name, /*icon,*/ temperature, wind, cloud, pressure, humidity, coordinates} = getWeatherParameters(element)
    name.innerHTML = weatherObject.name
   // icon.src = weatherAPI...
    temperature.innerHTML = `${weatherObject.main.temp}°C`
    wind.innerHTML = `${weatherObject.wind.speed} m/s`
    cloud.innerHTML = `${weatherObject.clouds.all}%`
    pressure.innerHTML = `${weatherObject.main.pressure} hpa`
    humidity.innerHTML = `${weatherObject.main.humidity}%`
    coordinates.innerHTML = `[${weatherObject.coord.lon}, ${weatherObject.coord.lat}]`
    return element
};

//done - without icon
function getWeatherParameters (weatherCity){
    return {
        name: weatherCity.querySelector('.city-name'),
       // icon: weatherCity.querySelector('.icon-weather'),
        temperature: weatherCity.querySelector('.temperature'),
        wind: weatherCity.querySelector('.wind-parameter .value-parameter'),
        cloud: weatherCity.querySelector('.cloud-parameter .value-parameter'),
        pressure: weatherCity.querySelector('.pressure-parameter .value-parameter'),
        humidity: weatherCity.querySelector('.humidity-parameter .value-parameter'),
        coordinates: weatherCity.querySelector('.coordinates-parameter .value-parameter')
    }
}