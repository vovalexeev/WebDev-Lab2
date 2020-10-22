const weatherHereWaiting = () => {
    const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
    return document.importNode(weatherHereWaitingTemplate.content, true)
}

const weatherCityWaiting = (cityName) => {
    const weatherCityWaitingTemplate = document.querySelector('template#weather-city-waiting')
    const newWeatherCityWaiting = document.importNode(weatherCityWaitingTemplate.content, true)
    newWeatherCityWaiting.querySelector('.city-name').innerText = cityName.split('_').join(' ')
    newWeatherCityWaiting.firstElementChild.setAttribute('cityName', cityName)
    return newWeatherCityWaiting
}

const weatherHereFunc = (weather) => {
    const weatherHereTemplate = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
    setWeatherParameters(newWeatherHere, weather)
    return newWeatherHere
}

const weatherCityFunc = (weather) => {
    const weatherCityTemplate = document.querySelector('template#weather-city')
    const newWeatherCity = document.importNode(weatherCityTemplate.content, true)
    setWeatherParameters(newWeatherCity, weather)
    newWeatherCity.querySelector('.delete-button').addEventListener('click', removeFromFavorites)
    newWeatherCity.firstElementChild.setAttribute('cityName', weather.name.split('_').join(' '))
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
            .catch(() => {
                 alert('Something went wrong... Please refresh the page!')
            })
    }, error => {
        weatherAPI.getByCityName("Zelenogorsk")
        .then(weather => {
            weatherHere.innerHTML = ""
            weatherHere.append(weatherHereFunc(weather))
        })
        .catch(() => alert('Something went wrong... Please refresh the page!'))
    })
}
    

const setWeatherParameters = (element, weatherObject) => {
    const {name, icon, temperature, wind, cloud, pressure, humidity, coordinates} = getWeatherParameters(element)
    name.innerHTML = weatherObject.name
    icon.src = weatherAPI.getIconURL(weatherObject.weather[0].icon)
    temperature.innerHTML = `${Math.round(weatherObject.main.temp)}°C`
    wind.innerHTML = `${weatherObject.wind.speed} m/s`
    cloud.innerHTML = `${weatherObject.clouds.all}%`
    pressure.innerHTML = `${weatherObject.main.pressure} hpa`
    humidity.innerHTML = `${weatherObject.main.humidity}%`
    coordinates.innerHTML = `[${weatherObject.coord.lat.toFixed(2)}, ${weatherObject.coord.lon.toFixed(2)}]`
    return element
};

const getWeatherParameters = weatherCity => {
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

const removeFromFavorites = evt => {
    const thisCityName = evt.currentTarget.parentElement.firstElementChild.innerHTML
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList').split('_').join(' '))
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList.filter(cityName => cityName !== thisCityName)))
    let citiesElementToRemove = []
    const favoritesList1 = JSON.parse(localStorage.getItem('favoritesList').split('_').join(' '))
    for (const cityElement of weatherCity.children) {
        const thisCityName = cityElement.querySelector('.city-name').innerText
        if (!(favoritesList1.includes(thisCityName)))
            citiesElementToRemove.push(cityElement)
    }
    citiesElementToRemove.forEach(cityElementToRemove => weatherCity.removeChild(cityElementToRemove))
}

const addToFavorites = async evt => {
    evt.preventDefault()
    const cityName = evt.currentTarget.firstElementChild.value.split(' ').join('_');
    evt.currentTarget.firstElementChild.value = ''
    let exist = false;
    const list = JSON.parse(localStorage.getItem('favoritesList'));
    for (var i = 0; i < list.length; i++){
        if (list[i] == cityName) {
            exist = true;
            alert('This city is already in favorites!')
            break;
        }
    }
    if (exist === false){
        weatherCity.append(weatherCityWaiting(cityName))
        const response = await weatherAPI.getByCityName(cityName)
        if (response.cod === 200) {
            const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
            localStorage.setItem('favoritesList', JSON.stringify([cityName, ...favoritesList]))
            const loading = weatherCity.querySelector(`.weather-city[cityName=${cityName}]`)
            weatherCity.replaceChild(weatherCityFunc(response), loading)
        } 
        else{
            if (response.cod === '404'){
                alert(`${cityName} not found!`)
                const loading = weatherCity.querySelector(`.weather-city[cityName=${cityName}]`)
                weatherCity.removeChild(loading)
            } 
        } 
    }
}

const updateWeatherFavorites = () => {
    const favoritesList = JSON.parse(localStorage.getItem('favoritesList'))
    let citiesToAdd = [], citiesElementToRemove = []
    for (const i in favoritesList) {
        const cityName = favoritesList[i]
        if (!weatherCity.querySelector(`.weather-city[cityName=${cityName}]`))
            citiesToAdd.push(cityName)
    }
    citiesToAdd.forEach(cityToAdd => {
        weatherCity.append(weatherCityWaiting(cityToAdd))
        const newCityElement = weatherCity.querySelector(`.weather-city[cityName=${cityToAdd}]`)
        weatherAPI.getByCityName(cityToAdd)
            .then(weather => 
                weatherCity.replaceChild(weatherCityFunc(weather), newCityElement))
            .catch(() => alert('Something went wrong... Please refresh the page!'))
    })
};