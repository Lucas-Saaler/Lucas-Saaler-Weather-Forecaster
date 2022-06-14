// Static selectors
var cityEl = document.querySelector('#cityInput')
var cityFormEl = document.querySelector('#cityForm')
var fiveDay = document.querySelector('#fiveDay')
var searchList = document.querySelector('#searchList')
// Current forecast
var cityHeaderEl = document.querySelector('#city')
var currentTemp = document.querySelector('#currentTemp')
var currentWind = document.querySelector('#currentWind')
var currentHumidity = document.querySelector('#currentHumidity')
var currentUVI = document.querySelector('#currentUVI')
// Five day forecast
var dates = [document.querySelector('#dateOne'), document.querySelector('#dateTwo'), document.querySelector('#dateThree'), document.querySelector('#dateFour'), document.querySelector('#dateFive')]
var temps = [document.querySelector('#tempOne'), document.querySelector('#tempTwo'), document.querySelector('#tempThree'), document.querySelector('#tempFour'), document.querySelector('#tempFive')]
var winds = [document.querySelector('#windOne'), document.querySelector('#windTwo'), document.querySelector('#windThree'), document.querySelector('#windFour'), document.querySelector('#windFive')]
var humidities = [document.querySelector('#humidityOne'), document.querySelector('#humidityTwo'), document.querySelector('#humidityThree'), document.querySelector('#humidityFour'), document.querySelector('#humidityFive')]
var icons = [document.querySelector('#iconOne'), document.querySelector('#iconTwo'), document.querySelector('#iconThree'), document.querySelector('#iconFour'), document.querySelector('#iconFive')]
var searches = [document.querySelector('#search1'), document.querySelector('#search2'), document.querySelector('#search3'), document.querySelector('#search4'), document.querySelector('#search5')]
var localSearches = [localStorage.getItem("localSearch1"), localStorage.getItem("localSearch2"), localStorage.getItem("localSearch3"), localStorage.getItem("localSearch4"), localStorage.getItem("localSearch5")]
// API Key
var apiKey = "ed6522dc3f2364bb024779f3e50a682b"
// Local Storage

function initialize() {
    for (let index = 0; index < searches.length; index++) {
        if (localSearches[index] != "null") {
            searches[index].textContent = localSearches[index]
        }
    }
}

function getWeather(event) {
    event.preventDefault()
    var currentCity = cityEl.value.toLowerCase()
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
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`
            localStorage.setItem("localSearch2", localSearches[0])
            localStorage.setItem("localSearch3", localSearches[1])
            localStorage.setItem("localSearch4", localSearches[2])
            localStorage.setItem("localSearch5", localSearches[3])
            localStorage.setItem("localSearch1", currentData.name)
            initialize()
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (fiveDayData) {
                    currentUVI.textContent = fiveDayData.daily[0].uvi
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

initialize()

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
                var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`
                localStorage.setItem("localSearch2", localSearches[0])
                localStorage.setItem("localSearch3", localSearches[1])
                localStorage.setItem("localSearch4", localSearches[2])
                localStorage.setItem("localSearch5", localSearches[3])
                localStorage.setItem("localSearch1", currentData.name)
                fetch(fiveDayUrl)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (fiveDayData) {
                        currentUVI.textContent = fiveDayData.daily[0].uvi
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

cityFormEl.addEventListener('submit', getWeather)