// Static selectors
var cityEl = document.querySelector('#cityInput')
var cityFormEl = document.querySelector('#cityForm')
// Current forecast
var cityHeaderEl = document.querySelector('#city')
var currentTemp = document.querySelector('#currentTemp')
var currentWind = document.querySelector('#currentWind')
var currentHumidity = document.querySelector('#currentHumidity')
var currentUVI = document.querySelector('#currentUVI')
// Five day forecast
// One
var dateOne = document.querySelector('#dateOne')
var tempOne = document.querySelector('#tempOne')
var windOne = document.querySelector('#windOne')
var humidityOne = document.querySelector('#humidityOne')
// Two
var dateTwo = document.querySelector('#dateTwo')
var tempTwo = document.querySelector('#tempTwo')
var windTwo = document.querySelector('#windTwo')
var humidityTwo = document.querySelector('#humidityTwo')
// Three
var dateThree = document.querySelector('#dateThree')
var tempThree = document.querySelector('#tempThree')
var windThree = document.querySelector('#windThree')
var humidityThree = document.querySelector('#humidityThree')
// Four
var dateFour = document.querySelector('#dateFour')
var tempFour = document.querySelector('#tempFour')
var windFour = document.querySelector('#windFour')
var humidityFour = document.querySelector('#humidityFour')
// Five
var dateFive = document.querySelector('#dateFive')
var tempFive = document.querySelector('#tempFive')
var windFive = document.querySelector('#windFive')
var humidityFive = document.querySelector('#humidityFive')
// 
var apiKey = "ed6522dc3f2364bb024779f3e50a682b"

function getWeather(event){
    event.preventDefault()
    var currentCity = cityEl.value.toLowerCase()
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`
    fetch(currentURL)
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        var day = moment.unix(currentData.dt)
        var formattedDate = day.format("MMMM D, YYYY")
        cityHeaderEl.textContent = currentData.name + " " + "(" + formattedDate + ")"
        currentTemp.textContent = currentData.main.temp + "°F"
        currentWind.textContent = currentData.wind.speed + " mph"
        currentHumidity.textContent = currentData.main.humidity + "%"
    })
}

cityFormEl.addEventListener('submit', getWeather)