function addCity() {
    if ('content' in document.createElement('template')) {
        var content  = document.querySelector('#city').content;
        let nameCity = content.querySelector("h3");
        let temperature = content.querySelector(".temperature");
        let span = content.querySelectorAll("span");
        for (let i = 0; i < 5; i++){
            //span[i] = "F";
        }
        localStorage.setItem(`${nameCity}.`, myName);
        myHeading.innerHTML = 'Mozilla is cool, ' + myName;
    }
}
//done
function weatherHereWaiting (){
    const weatherHereWaitingTemplate = document.querySelector('template#weather-here-waiting')
    return document.importNode(weatherHereWaitingTemplate.content, true)
}

//done
function weathereHere (weather){
    const weatherHereTemplate = document.querySelector('template#weather-here')
    const newWeatherHere = document.importNode(weatherHereTemplate.content, true)
    setWeatherParameters(newWeatherHere, weather)
    return newWeatherHere
}