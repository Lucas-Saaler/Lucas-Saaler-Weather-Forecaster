// Static selectors
var cityEl = document.querySelector('#cityInput')
var cityFormEl = document.querySelector('#cityForm')
var fiveDay = document.querySelector('#fiveDay')
var searchList = document.querySelector('#searchList')
var pastSearch1 = document.querySelector('#pastSearch1')
// Current forecast
var cityHeaderEl = document.querySelector('#city')
var currentTemp = document.querySelector('#currentTemp')
var currentWind = document.querySelector('#currentWind')
var currentHumidity = document.querySelector('#currentHumidity')
var currentUVI = document.querySelector('#currentUVI')
var currentIcon = document.querySelector("#currentIcon")
// Five day forecast
var dates = [document.querySelector('#dateOne'), document.querySelector('#dateTwo'), document.querySelector('#dateThree'), document.querySelector('#dateFour'), document.querySelector('#dateFive')]
var temps = [document.querySelector('#tempOne'), document.querySelector('#tempTwo'), document.querySelector('#tempThree'), document.querySelector('#tempFour'), document.querySelector('#tempFive')]
var winds = [document.querySelector('#windOne'), document.querySelector('#windTwo'), document.querySelector('#windThree'), document.querySelector('#windFour'), document.querySelector('#windFive')]
var humidities = [document.querySelector('#humidityOne'), document.querySelector('#humidityTwo'), document.querySelector('#humidityThree'), document.querySelector('#humidityFour'), document.querySelector('#humidityFive')]
var icons = [document.querySelector('#iconOne'), document.querySelector('#iconTwo'), document.querySelector('#iconThree'), document.querySelector('#iconFour'), document.querySelector('#iconFive')]
var searches = [document.querySelector('#search1'), document.querySelector('#search2'), document.querySelector('#search3'), document.querySelector('#search4'), document.querySelector('#search5')]
// API Key
var apiKey = "ed6522dc3f2364bb024779f3e50a682b"
// Local Storage
var localSearches = [localStorage.getItem("localSearch1"), localStorage.getItem("localSearch2"), localStorage.getItem("localSearch3"), localStorage.getItem("localSearch4"), localStorage.getItem("localSearch5")]

// Displays locally stored history on page load
function initialize() {
    for (let index = 0; index < searches.length; index++) {
        if (localSearches[index] != "null") {
            searches[index].textContent = localSearches[index]
        }
    }
}

// Triggered by the submit event listener
function getWeather(event) {
    event.preventDefault()
    // Current city used to fill in the API URL
    var currentCity = cityEl.value.toLowerCase()
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`
    fetch(currentURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            // Convert to date
            var day = moment.unix(currentData.dt)
            var formattedDate = day.format("MMMM D, YYYY")
            // Save coords
            var currentLat = currentData.coord.lat
            var currentLon = currentData.coord.lon
            // Fill in the current forecast sections
            cityHeaderEl.textContent = currentData.name + " " + "(" + formattedDate + ")"
            currentTemp.textContent = currentData.main.temp + "°F"
            currentWind.textContent = currentData.wind.speed + " mph"
            currentHumidity.textContent = currentData.main.humidity + "%"
            // Sets the icon
            currentIcon.setAttribute("src",`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`
            // Saves history via local storage
            localStorage.setItem("localSearch5", localStorage.getItem("localSearch4"))
            localStorage.setItem("localSearch4", localStorage.getItem("localSearch3"))
            localStorage.setItem("localSearch3", localStorage.getItem("localSearch2"))
            localStorage.setItem("localSearch2", localStorage.getItem("localSearch1"))
            localStorage.setItem("localSearch1", currentData.name)
            // Gets the forecast for the next 5 days
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveDayData) {
                    // Fills in *current* UVI
                    currentUVI.textContent = fiveDayData.daily[0].uvi
                    // Color codes based on severity
                    if(fiveDayData.daily[0].uvi <= 5){
                        currentUVI.classList.add("fair")
                    }else if (fiveDayData.daily[0].uvi > 5 && fiveDayData.daily[0].uvi < 8){
                        currentUVI.classList.add("moderate")
                    }else{
                        currentUVI.classList.add("severe")
                    }
                    // Displays the 5 day forecast by removing .hide
                    fiveDay.classList.remove("hide")
                    for (let index = 1; index < 6; index++) {
                        dates[(index - 1)].textContent = moment.unix(fiveDayData.daily[index].dt).format("MMMM D, YYYY")
                        // Icon
                        icons[(index - 1)].setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[index].weather[0].icon}@2x.png`)
                        // Fills in the blanks
                        temps[(index - 1)].textContent = "Temp: " + fiveDayData.daily[index].temp.max + " °F"
                        winds[(index - 1)].textContent = "Wind: " + fiveDayData.daily[index].wind_speed + " mph"
                        humidities[(index - 1)].textContent = "Humidity: " + fiveDayData.daily[index].humidity + "%"
                    }
                })
        })
}

// Exactly the same as above, but triggered when you click any item from your history list instead
for (let index = 0; index < searches.length; index++) {
    searches[index].addEventListener('click', function () {
        var currentCity = searches[index].textContent
        var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`
        fetch(currentURL)
            .then(function (response) {
                return response.json()
            })
            .then(function (currentData) {
                var day = moment.unix(currentData.dt)
                var formattedDate = day.format("MMMM D, YYYY")
                var currentLat = currentData.coord.lat
                var currentLon = currentData.coord.lon
                cityHeaderEl.textContent = currentData.name + " " + "(" + formattedDate + ")"
                currentTemp.textContent = currentData.main.temp + "°F"
                currentWind.textContent = currentData.wind.speed + " mph"
                currentHumidity.textContent = currentData.main.humidity + "%"
                currentIcon.setAttribute("src",`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`)
                var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`
                localStorage.setItem("localSearch5", localStorage.getItem("localSearch4"))
                localStorage.setItem("localSearch4", localStorage.getItem("localSearch3"))
                localStorage.setItem("localSearch3", localStorage.getItem("localSearch2"))
                localStorage.setItem("localSearch2", localStorage.getItem("localSearch1"))
                localStorage.setItem("localSearch1", currentData.name)
                fetch(fiveDayUrl)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (fiveDayData) {
                        currentUVI.textContent = fiveDayData.daily[0].uvi
                        if(fiveDayData.daily[0].uvi <= 5){
                            currentUVI.classList.add("fair")
                        }else if (fiveDayData.daily[0].uvi > 5 && fiveDayData.daily[0].uvi < 8){
                            currentUVI.classList.add("moderate")
                        }else{
                            currentUVI.classList.add("severe")
                        }
                        fiveDay.classList.remove("hide")
                        for (let index = 1; index < 6; index++) {
                            dates[(index - 1)].textContent = moment.unix(fiveDayData.daily[index].dt).format("MMMM D, YYYY")
                            icons[(index - 1)].setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[index].weather[0].icon}@2x.png`)
                            temps[(index - 1)].textContent = "Temp: " + fiveDayData.daily[index].temp.max + " °F"
                            winds[(index - 1)].textContent = "Wind: " + fiveDayData.daily[index].wind_speed + " mph"
                            humidities[(index - 1)].textContent = "Humidity: " + fiveDayData.daily[index].humidity + "%"
                        }
                    })
            })
    }
    )
}

initialize()

// Event listener for submit
cityFormEl.addEventListener('submit', getWeather)