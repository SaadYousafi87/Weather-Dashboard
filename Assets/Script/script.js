// HTML elements stored in variables
var inputEl = document.getElementById("search-input");
var searchBtnEl = document.getElementById("btn-search");
var asideEl = document.getElementById("search");
var currentCityEl = document.getElementById("daily-city");
var currentTempEl = document.getElementById("daily-temp");
var currentWindEl = document.getElementById("daily-wind");
var currentHumidEl = document.getElementById("daily-humid");
var temp1El = document.getElementById("temp-1");
var wind1El = document.getElementById("wind-1");
var humid1El = document.getElementById("humid-1");
var date1El = document.getElementById("date-1");
var temp2El = document.getElementById("temp-2");
var wind2El = document.getElementById("wind-2");
var humid2El = document.getElementById("humid-2");
var date2El = document.getElementById("date-2");
var temp3El = document.getElementById("temp-3");
var wind3El = document.getElementById("wind-3");
var humid3El = document.getElementById("humid-3");
var date3El = document.getElementById("date-3");
var temp4El = document.getElementById("temp-4");
var wind4El = document.getElementById("wind-4");
var humid4El = document.getElementById("humid-4");
var date4El = document.getElementById("date-4");
var temp5El = document.getElementById("temp-5");
var wind5El = document.getElementById("wind-5");
var humid5El = document.getElementById("humid-5");
var date5El = document.getElementById("date-5");

var appid = "e2967007776a0bb2160348f32c03e15b";

// variables to store name, latitude and longitude information.
var cityName;
var latitude = 0;
var longitude = 0;

/**
 * This function uses geoLocation api to get latitude and longitude and store in variables.
 * @param {*} name 
 */
function getGeoLocation(name){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+name+"&appid="+appid;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        latitude = data[0].lat;
        longitude = data[0].lon;
    });
}

/**
 * This function uses api to get current weather information and display it on the page.
 * @param {*} temperature 
 * @param {*} speed 
 * @param {*} humidity 
 */
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

/**
 * This function uses api to get five days weather forecast information and display it on the page.
 */
function getFiveDayWeatherInfo(){
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+appid;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (data){ 
            var date = data.list[0].dt_txt;
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day = date.slice(8,10);
            date1El.textContent = month+"/"+day+"/"+year;
            temp1El.textContent = "Temp: "+data.list[0].main.temp+" F";
            wind1El.textContent = "Wind: "+data.list[0].wind.speed+" MPH";
            humid1El.textContent = "Humidity: "+data.list[0].main.humidity+" %";

            var date = data.list[8].dt_txt;
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day = date.slice(8,10);
            date2El.textContent = month+"/"+day+"/"+year;
            temp2El.textContent = "Temp: "+data.list[8].main.temp+" F";
            wind2El.textContent = "Wind: "+data.list[8].wind.speed+" MPH";
            humid2El.textContent = "Humidity: "+data.list[8].main.humidity+" %";

            var date = data.list[16].dt_txt;
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day = date.slice(8,10);
            date3El.textContent = month+"/"+day+"/"+year;
            temp3El.textContent = "Temp: "+data.list[16].main.temp+" F";
            wind3El.textContent = "Wind: "+data.list[16].wind.speed+" MPH";
            humid3El.textContent = "Humidity: "+data.list[16].main.humidity+" %";

            var date = data.list[24].dt_txt;
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day = date.slice(8,10);
            date4El.textContent = month+"/"+day+"/"+year;
            temp4El.textContent = "Temp: "+data.list[24].main.temp+" F";
            wind4El.textContent = "Wind: "+data.list[24].wind.speed+" MPH";
            humid4El.textContent = "Humidity: "+data.list[24].main.humidity+" %";

            var date = data.list[32].dt_txt;
            var year = date.slice(0,4);
            var month = date.slice(5,7);
            var day = date.slice(8,10);
            date5El.textContent = month+"/"+day+"/"+year;
            temp5El.textContent = "Temp: "+data.list[32].main.temp+" F";
            wind5El.textContent = "Wind: "+data.list[32].wind.speed+" MPH";
            humid5El.textContent = "Humidity: "+data.list[32].main.humidity+" %";
    });
}

/**
 * This function creates button element and display it on the page.
 * @param {*} cityName 
 */
function addButton(cityName){
    var btn = document.createElement("button");
    btn.setAttribute("id", cityName);
    btn.setAttribute("class", "previous");
    btn.textContent = cityName;

    asideEl.appendChild(btn);
}

/**
 * Event listener to responde to click events
 */
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
        addButton(cityName);
        getFiveDayWeatherInfo();
    }
    if(child.matches(".previous")){
        cityName = child.getAttribute("id");
        var date = moment().format("M/D/YYYY");
        currentCityEl.textContent = cityName+" ("+date+")";
        getGeoLocation(cityName);
        getCurrentWeatherInfo(currentTempEl, currentWindEl, currentHumidEl);
        getFiveDayWeatherInfo();
    }
});
