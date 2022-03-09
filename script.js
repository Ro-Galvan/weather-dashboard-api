// c7c6d80dddc4d33a547a4a23dbe7b20c
// lat 35.779591
// long -78.638176
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('.city-search');
var buttonEl = document.querySelector('.btn');
var citySearchEl = document.querySelector('.city-search')
var currentCityWeatherEl = document.querySelector('.container-currentCity')
var forecastEl = document.querySelector('.container-forecast')


var formSubmitHandler = function (event) {
    event.preventDefault();  //this prevents the page from reloading once form is submitted
    console.log("does form handler click work??");

    // gets the city name that was typed and will remove any spaces if city contains 2 words
    var cityName = cityInputEl.value.trim();

    //then gives city name to function-to smack API
    if (cityName) {
        getCityWeather(cityName);

        currentCityWeatherEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a valid city name');
    };
    console.log(cityName);
};


var APIKey = "c7c6d80dddc4d33a547a4a23dbe7b20c"

// CITY API
var getCityWeather = function (city) {
    var cityKeyURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(cityKeyURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            requestForecastData(data.coord.lat);

            // city name + date  +  weather icon 
            var tempInfo = document.createElement('div');
            tempInfo.innerHTML = data.name + "  (" + moment.unix(data.dt).format("MM/DD/YYYY") + ") " + data.weather[0].icon
            currentCityWeatherEl.appendChild(tempInfo);

            // temp
            var tempInfo = document.createElement('div');
            tempInfo.textContent = "Temp: " + data.main.temp + "\u00B0F"
            currentCityWeatherEl.appendChild(tempInfo);

            // wind
            var tempInfo = document.createElement('div');
            tempInfo.textContent = "Wind: " + data.wind.speed + " MPH"
            currentCityWeatherEl.appendChild(tempInfo);

            // humidity 
            var tempInfo = document.createElement('div');
            tempInfo.textContent = "Humidity: " + data.main.humidity + "%"
            currentCityWeatherEl.appendChild(tempInfo);

        })
};

var requestForecastData = function (lat, lon) {
    // 2nd API call 
    var requestForecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=35.779591&lon=-78.638176&appid=c7c6d80dddc4d33a547a4a23dbe7b20c&units=imperial';

    fetch(requestForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // UV index 
            var forecastInfo = document.createElement('div');
            forecastInfo.textContent = "UVI: " + data.current.uvi + "%"
            currentCityWeatherEl.appendChild(forecastInfo);

            for (let i = 0; i <= 4; i++) {
                // 5 day forecast
                // to avoid repeat
                var currentDay = data.daily[i];
                // tutor helped 
                var forecastInfo = document.createElement("div");
                forecastInfo.innerHTML = `
                            <p>${moment.unix(currentDay.dt).format("MM/DD/YYYY")}</p>
                            <img src="http://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png" />
                            <p>${('Temp: ') + currentDay.temp.day + ('\u00B0F')}</p>
                            <p>${('Wind: ') + currentDay.wind_speed + (' MPH')}</p>
                            <p>${('Humidity: ') + currentDay.humidity + ('%')}</p>
                            `;
                console.log(currentDay.weather[0].icon);
                forecastInfo.style.border = "1px solid black";
                forecastEl.appendChild(forecastInfo);
            }

        })
        .catch(function (err) {
            console.log(err);
        });

}


//   listens for when FORM is clicked
userFormEl.addEventListener('submit', formSubmitHandler);
console.log('form clicked worked');