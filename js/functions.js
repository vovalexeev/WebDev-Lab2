function weatherHereWaiting (){
    const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
    return document.importNode(weatherHereWaitingTemplate.content, true)
}

function weatherCityWaiting (cityName) {
    const weatherCityWaitingTemplate = document.querySelector('template#weather-city-waiting')
    const newWeatherCityWaiting = document.importNode(weatherCityWaitingTemplate.content, true)
    newWeatherCityWaiting.querySelector('.city-name').innerText = cityName
    newWeatherCityWaiting.firstElementChild.setAttribute('cityName', cityName)
    return newWeatherCityWaiting
}

function weatherHereFunc (weather) {
    const weatherHereTemplate = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
    setWeatherParameters(newWeatherHere, weather)
    return newWeatherHere
}

function weatherCityFunc (weather) {
    const weatherCityTemplate = document.querySelector('template#weather-city')
    const newWeatherCity = document.importNode(weatherCityTemplate.content, true)
    setWeatherParameters(newWeatherCity, weather)
    newWeatherCity.querySelector('.delete-button').addEventListener('click', removeFromFavorites)
    newWeatherCity.firstElementChild.setAttribute('cityName', weather.name)
    return newWeatherCity
}

function updateWeatherHere () {
    weatherHere.innerHTML = ""
    const waitingCity = weatherHereWaiting()
    weatherHere.append(waitingCity)
    navigator.geolocation.getCurrentPosition (async coordinates => {
            weatherAPI.getByCityCoordinates(coordinates)
                .then(weather => {
                    weatherHere.innerHTML = ""
                    weatherHere.append(weatherHereFunc(weather))
                })
                .catch(() => alert('Something went wrong... Please refresh the page'))
        },
        positionError => console.log(positionError.message))
}

function setWeatherParameters (element, weatherObject) {
    const {name, icon, temperature, wind, cloud, pressure, humidity, coordinates} = getWeatherParameters(element)
    name.innerHTML = weatherObject.name
    icon.src = weatherAPI.getIconURL(weatherObject.weather.icon)
    temperature.innerHTML = `${weatherObject.main.temp}°C`
    wind.innerHTML = `${weatherObject.wind.speed} m/s`
    cloud.innerHTML = `${weatherObject.clouds.all}%`
    pressure.innerHTML = `${weatherObject.main.pressure} hpa`
    humidity.innerHTML = `${weatherObject.main.humidity}%`
    coordinates.innerHTML = `[${weatherObject.coord.lon}, ${weatherObject.coord.lat}]`
    return element
};

function getWeatherParameters (weatherCity) {
    return {
        name: weatherCity.querySelector('.city-name'),
        icon: weatherCity.querySelector('.icon-weather'),
        temperature: weatherCity.querySelector('.temperature'),
        wind: weatherCity.querySelector('.wind-parameter .value-parameter'),
        cloud: weatherCity.querySelector('.cloud-parameter .value-parameter'),
        pressure: weatherCity.querySelector('.pressure-parameter .value-parameter'),
        humidity: weatherCity.querySelector('.humidity-parameter .value-parameter'),
        coordinates: weatherCity.querySelector('.coordinates-parameter .value-parameter')
    }
}

function removeFromFavorites (evt) {
    const thisCityName = evt.currentTarget.parentElement.firstElementChild.innerHTML
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList.filter(cityName => cityName !== thisCityName)))
    updateWeatherFavorites()
}

function addToFavorites (evt) {
    evt.preventDefault()
    const searchInput = document.getElementById('add-city-input')
    const cityName = searchInput.value.trim()
    const response = weatherAPI.getByCityName(cityName)
    if (response.cod === 200) {
        const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
        localStorage.setItem('favoritesList', JSON.stringify([cityName, ...favoritesList]))
        updateWeatherFavorites()
    } else if (response.cod === '404')
        alert(`${cityName} not found`)
    searchInput.value = ''
}

function updateWeatherFavorites () {
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
    let citiesToAdd = [], citiesElemToRemove = []
    for (const i in favoritesList) {
        const cityName = favoritesList[i]
        if (!weatherCity.querySelector(`.weather-city[key=${cityName}]`))
            citiesToAdd.push(cityName)
    }
    for (const cityElem of weatherCity.children) {
        const currentCityName = cityElem.querySelector('.city-name').innerText
        if (!(favoritesList.includes(currentCityName)))
            citiesElemToRemove.push(cityElem)
    }
    citiesElemToRemove.forEach(cityElemToRemove => weatherCity.removeChild(cityElemToRemove))
    citiesToAdd.forEach(cityToAdd => {
        weatherCity.append(weatherCityWaiting(cityToAdd))
        const newCityElement = weatherCity.querySelector(`.weather-city[key=${cityToAdd}]`)
        weatherAPI.getByCityName(cityToAdd)
            .then(weather => weatherCity.replaceChild(weatherCityFunc(weather), newCityElement))
            .catch(() => alert('Something went wrong... Please refresh the page'))
    })
};