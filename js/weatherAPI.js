class WeatherAPI{
    constructor(){
        this.apiKey = 'f0b947c783873ab1a7c905ad26e85162'
    }

    async getByCityName(cityName){
        const responce = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`)
        return await responce.json()
    }
    
    async getByCityCoordinates(coordinates){
        const [lat, lon] = [coordinates.coords.latitude, coordinates.coords.longitude]
        const responce = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
        return await responce.json()
    }

    getIconURL(iconCode) {
        return `http://openweathermap.org/img/wn/${iconCode}.png`
    }
}


