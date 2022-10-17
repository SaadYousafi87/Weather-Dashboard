var inputEl = document.getElementById("search-input");
var searchBtnEl = document.getElementById("btn-search");
var currentCityEl = document.getElementById("daily-city");
var currentTempEl = document.getElementById("daily-temp");
var currentWindEl = document.getElementById("daily-wind");
var currentHumidEl = document.getElementById("daily-humid");

//var geoLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=pottstown&appid=e2967007776a0bb2160348f32c03e15b";

var appid = "e2967007776a0bb2160348f32c03e15b";
var cityName;
var latitude = 0;
var longitude = 0;
var temp = 0;
var wind = 0;
var humid = 0;

function getGeoLocation(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+name+"&appid="+appid;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        latitude = data[0].lat;
        longitude = data[0].lon;
        console.log("latitude: "+latitude+" longitude: "+longitude);
    
    });
}

function getCurrentWeatherInfo(temperature, speed, humidity){
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+appid;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        temperature.textContent = "Temp: "+data.main.temp+" F";
        speed.textContent = "Wind: "+data.wind.speed+" MPH";
        humidity.textContent = "Humidity: "+data.main.humidity+" %";
    });
}

function getFiveDayWeatherInfo(){
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+appid;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data);
    });
}

document.addEventListener("click", function(event){
    var child = event.target;
    if(child.matches("#btn-search")){
        var name = inputEl.value;
        if(name.length !== 0){
            cityName = name;
        }
        var date = moment().format("M/D/YYYY");
        currentCityEl.textContent = cityName+" ("+date+")";
        getGeoLocation(cityName);
        getCurrentWeatherInfo(currentTempEl, currentWindEl, currentHumidEl);
    }
});
