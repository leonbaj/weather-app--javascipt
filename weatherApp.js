/* Initializing Variables*/

const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon img");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

var input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

//Added event Listening looking for when User presses the Enter key.  using keyup (event fired when a key is released) to event the enter key.
input.addEventListener("keyup", function(event) {
    //checking if enter is pressed. 
    if (event.key === "Enter" ){
        event.preventDefault();
        
        //city is assigned value of the input search
        city=input.value.trim();
        //Function to Engage with WeatherAPI and parameter of what was entered
        getSearchWeather(city);
        //Displays City entered confirming sucess of events.
        console.log(city);
    }

})

// initialzing more variables needed API key, how our weather is formated etc.
const weather={};
weather.temperature = { unit: "celsuis",};

// Key recieved from openweathermap website. assign it here. 
const key=' ';


//function that gets invoked by the paremeters above, 
function setPosition(position){
    //assigns coordinates to latitude and longitude, also calls for getWeather Function which takes lat and long as parameters. 
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//Added an event listener to fire if the user clicks on the location Icon. which will retrieve their geolocation and once again this will invoke api call to display information 
//based on their geolocation
locationIcon.addEventListener("click", function(event){

// checking if geolocation is available. basically Here is were the browser will prompt user if they wish for the applicaiton in which is running the script, to use there geolocation
// we do this by invoking navigator (browser) and another api called geolocation. if we are able to we will run navigator to get current position. if not just send error back to page
// that it does not support it
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    getWeather(latitude, longitude);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = '<p> Browser doesnt support geolocation </p>';

}
    
})


// function that gets invoked by the parameters above as well. Displays error if we get a error somewhere in the logic. 
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//function that will Search weather based on its given parameters (city).
function getSearchWeather(city){
    //api call is getting assigned to api (also passing city and key which is API Key.  
    let api = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${key}`
    
    //fetch method begins fetching resources from the given source(url, network etc.) returns a promise which is fulfilled once the response is available.
    fetch(api)
    // Attaches callbacks for the resolution of the Promise
    .then(function (response) {
        let data = response.json(); 
        return data;
    })
    // chaining callbacks for the resolution of promise, Assiging values needed to display on application
    .then(function(data){
        weather.temperature.value = Math.round(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].main;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(weather);
    })
    //chaining again to display weather at that point
    .then(function(){
      displayWeather()
    })
}

//similiar method to Above but this is invoked when we get the latitude and longitude from applicaiton via user clicking on location icon. 
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat${latitude}&lon${longitude}&appid=${key}`
    //fetch method begins fetching resources from the given source(url, network etc.) returns a promise which is fulfilled once the response is available.
    fetch(api)
    // Attaches callbacks for the resolution of the Promise
    .then(function (response) {
        let data = response.json(); 
        return data;
    })
    // chaining callbacks for the resolution of promise, Assiging values needed to display on application
    .then(function(data){
        weather.temperature.value = Math.round(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].main;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    //chaining again, to display weather at that point
    .then(function(){
        displayWeather()
    })
    
}

//function to display our weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value} &deg;<span>C<span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}