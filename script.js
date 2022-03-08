// c7c6d80dddc4d33a547a4a23dbe7b20c
// lat 35.779591
// long -78.638176
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('.city-search'); 
var buttonEl = document.querySelector('.btn');
var citySearchEl = document.querySelector('.city-search')
var currentCityWeatherEl = document.querySelector('.container-currentCity')


var formSubmitHandler = function (event) {
    event.preventDefault();  //this prevents the page from reloading once form is submitted
    console.log("does form handler click work??"); //test to make sure it worked
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
var getCityWeather = function (city) { //SHOULD CITY BE THERE INSTEAD OF USER????
    var cityKeyURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log("our assembeled  URL with the city name added", cityKeyURL)
    
    fetch(cityKeyURL)
    .then(function (response) { 
        return response.json();
    })
    .then(function (data) {
        console.log(data);  //the goods is an array of 30 names/people
        
        var tempInfo = document.createElement('div');
        tempInfo.textContent = data.main.temp
        currentCityWeatherEl.appendChild(tempInfo);

        // var tempInfo = document.createElement('div');
        // tempInfo.textContent = data.main.temp
        // var tempInfo = document.createElement('div');
        // tempInfo.textContent = data.main.temp
        // var tempInfo = document.createElement('div');
        // tempInfo.textContent = data.main.temp
        
    })
}
// One Call API
// var requestURL= 'https://api.openweathermap.org/data/2.5/onecall?lat=35.779591&lon=-78.638176&appid=c7c6d80dddc4d33a547a4a23dbe7b20c&units=imperial';

// fetch(requestURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });


//   listens for when FORM is clicked
userFormEl.addEventListener('submit', formSubmitHandler);
    console.log('form clicked worked');
