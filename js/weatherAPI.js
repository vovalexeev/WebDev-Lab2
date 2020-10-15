class WeatherAPI{
    constructor(){
        this.apiKey = 'f0b947c783873ab1a7c905ad26e85162'
    }

    getByCityName(cityName){
        let responce = fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`)
        return responce
    }
    
    getByCityCoordinates(coordinates){
        //let [lat, lon] = [coordinates., coordinates.]
        let responce = fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
        return responce
    }
}


