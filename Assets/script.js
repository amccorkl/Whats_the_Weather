let cityName = document.getElementById("city-name");
let searchCityBtn = document.getElementById("submit-btn");
let pastCityList = JSON.parse(localStorage.getItem("cityData")) || [];

// let pastCitySearches = document.getElementById("past-searches");
let fiveDayForecastEl = document.getElementById("forecast");
let currentWeatherUL = document.getElementById("current-weather");
let currentCityH3 = document.getElementById("current-city");
let currentDateH3 = document.getElementById("current-date");

const apiKey = "0d42456f055667926069a698b4b5b5e2";

//any previously searched cities will reload immediately, become a button
function renderSavedCities(event) {
  for (let i = 0; i < pastCityList.length; i++) {
    var citiesPosted = pastCityList[i];
    console.log(citiesPosted);

    var savedCityBtn = document.createElement("button");
    savedCityBtn.textContent = citiesPosted;

    let pastSearchesEl = document.getElementById("past-searches");
    pastSearchesEl.append(savedCityBtn);

    savedCityBtn.setAttribute(
      "style", "display: inlineblock; width: 90%; background-color: lightblue; color: white; border: 1px black solid;"
    );
    savedCityBtn.setAttribute("value", citiesPosted);

    savedCityBtn.addEventListener("click", function () {
      console.log(this);
      getCityButton(this.value);
    });
  }

//   getCityWeather(event);
}

let getCityButton = function (cityValue) {
      
    let cityInput = cityValue;
  
    let requestUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&appid=" +
      apiKey +
      "&units=imperial";
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        let currentDate = moment.unix(data.dt).format("MMMM Do, YYYY");
  
        let currentTemp = document.createElement("p");
        let currentWind = document.createElement("p");
        let currentHumidity = document.createElement("p");
        let currentUV = document.createElement("p");
  
        currentTemp.textContent = "Current Temp: " + data.main.temp + " F";
        currentWind.textContent = "Wind: " + data.wind.speed + " mph";
        currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
        // currentUV.textContent = "UV Index: " + data.daily.uvi;
  
        let weatherIcon = data.weather[0].icon;
        let weatherImage = document.createElement("img");
  
        weatherImage.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
        );
        currentCityH3.textContent = data.name;
        currentDateH3.textContent = currentDate;
        // currentCityH3.textContent = weatherImage;
        currentWeatherUL.innerHTML = "";

        currentDateH3.append(weatherImage);
        currentWeatherUL.append(
          currentTemp,
          currentWind,
          currentHumidity,
          currentUV
        );
      });
  
    futureForecast(cityValue);  
  };

//current weather
let getCityWeather = function (event) {
  event.preventDefault();
  console.log(event);

  let cityInput = cityName.value;

  if (pastCityList.indexOf(cityInput) === -1) {
    pastCityList.push(cityInput);
    localStorage.setItem("cityData", JSON.stringify(pastCityList));
  }

  let requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let currentDate = moment.unix(data.dt).format("MMMM Do, YYYY");

      let currentTemp = document.createElement("p");
      let currentWind = document.createElement("p");
      let currentHumidity = document.createElement("p");
      let currentUV = document.createElement("p");

      currentTemp.textContent = "Current Temp: " + data.main.temp + " F";
      currentWind.textContent = "Wind: " + data.wind.speed + " mph";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
      // currentUV.textContent = "UV Index: " + data.daily.uvi;

      let weatherIcon = data.weather[0].icon;
      let weatherImage = document.createElement("img");

      weatherImage.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
      );
      currentCityH3.textContent = data.name;
      currentDateH3.textContent = currentDate;
      // currentCityH3.textContent = weatherImage;

      currentWeatherUL.innerHTML = "";

      currentDateH3.append(weatherImage);
      currentWeatherUL.append(
        currentTemp,
        currentWind,
        currentHumidity,
        currentUV
      );
    });

  futureForecast(cityInput);
  renderSavedCities();

};

let futureForecast = function (cityInput) {
  
//   let cityInput = cityName.value;

  var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={part}&appid=${apiKey}&units=imperial&cnt=5`;
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          //title of the future EL
          let futureForecastEl = document.getElementById("5day-card");
          let forecastTitleEL = document.createElement("h2");
          forecastTitleEL.textContent = "Five Day Forecast";
          futureForecastEl.append(forecastTitleEL);

          let daily = data.daily;
          console.log(daily);

          //empties the prior weather from the div
          futureForecastEl.innerHTML = "";
          
          //create the array of 5 day forecast cards
          for (let i = 1; i < 6; i++) {
            let element = daily[i];

            let dailyCardEl = document.createElement("div");
            let dailyTitleDay = document.createElement("h3");
            let dailyCardBody = document.createElement("div");

            // dailyCardEl.setAttribute("class", "col-2");
            dailyCardEl.setAttribute("style", "border: black 1px solid");

            let currentDate = moment.unix(element.dt).format("ddd");
            dailyTitleDay.textContent = currentDate;

            let weatherIcon = element.weather[0].icon;

            let weatherImage = document.createElement("img");
            console.log(weatherImage);
            weatherImage.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
            );

            

            dailyTitleDay.append(weatherImage);

            dailyCardEl.append(dailyTitleDay, dailyCardBody);
            futureForecastEl.append(dailyCardEl);
          }
        });
    });
};

searchCityBtn.addEventListener("click", getCityWeather);
