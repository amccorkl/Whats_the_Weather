let cityName = document.getElementById("city-name");
let searchCityBtn = document.getElementById("submit-btn");
let pastCityList= JSON.parse(localStorage.getItem("data")) || [];

// let pastCitySearches = document.getElementById("past-searches");
let fiveDayForecastEl = document.getElementById("forecast");
let currentWeatherUL = document.getElementById("current-weather")
let currentCityH3 = document.getElementById("current-city");

const apiKey = "0d42456f055667926069a698b4b5b5e2"

//any previously searched cities will reload immediately, become a button
function renderSavedCities(event) {
    event.preventDefault();
        
    let cityInput = cityName.value;

    
    
    let pastSearchCities = document.createElement("h3");
    let pastSearchEl = document.getElementById("past-searches");
    pastSearchCities.textContent = cityInput;
    pastSearchEl.append(pastSearchCities);

    pastCityList.push(cityInput);
    localStorage.setItem("cityInput", JSON.stringify(pastCityList));
    console.log(cityInput);

    //make a button from the cities saved
    

    getCityWeather(event);
}  


    
//current weather
let getCityWeather = function(event) {
    event.preventDefault();

    let cityInput = cityName.value;

    let requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial"
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            let currentDate = moment.unix(data.dt).format("MMMM Do, YYYY");
            console.log(currentDate);
            currentCityH3.textContent = data.name + " -- " + currentDate;

            let currentTemp = document.createElement("li");
            let currentWind = document.createElement("li");
            let currentHumidity = document.createElement("li");
            // let currentUV = document.createElement("li");

            currentTemp.textContent = "Current Temp: " + data.main.temp + " F";
            currentWind.textContent = "Wind: " + data.wind.speed + " mph";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
            // currentUV.textContent = data.
            currentWeatherUL.append(currentTemp);
            currentWeatherUL.append(currentWind);
            currentWeatherUL.append(currentHumidity);



        })
        
            
        
}

// searchCityBtn.addEventListener("submit", searchCity);

searchCityBtn.addEventListener("click", getCityWeather);
pastCityBtn.addEventListener("click", renderSavedCities)





