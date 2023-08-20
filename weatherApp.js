/* Initializing Variables*/

const iconElement = document.querySelector(".weather-icon")
const locationIcon = document.querySelector(".location-icon")
const tempElement = document.querySelector(".tmeperature-value p")
const descElement = document.querySelector(".temperature-descritpion p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")

var input = document.getElementById("search")
let city = "";
let latitude = 0.0;
let longitude = 0.0;

//Added event Listening looking for when User presses the Enter key.  using keyup (event fired when a key is released) to event the enter key.
input.addEventListener("keyup", function(event) {
    //checking if enter is pressed. 
    if(event.keycode ==13 ){
        event.preventDefault();
        
        //city is assigned value of the input search
        city=input.value;
        //Function to Engage with WeatherAPI and parameter of what was entered
        getSearchWeather(city);
        //Displays City entered.
        console.log(city);
    }

})

// initialzing more variables needed API key, how our weather is formated etc.
const weather={};
weather.temperature = { unit: "celsuis"};

const KELVIN = 273;

const key='38dd1e492100cfa77eb9e6388905a087';
// checking if geolocation is available. basically Here is were the browser will prompt user if they wish for the applicaiton in which is running the script, to use there geolocation
// we do this by invoking navigator (browser) and another api called geolocation. if we are able to we will run navigator to get current position. if not just send error back to page
// that it does not support it
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPostion, showError);
}
else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> Browser doesnt support geolocation </p>';

}
//function that gets invoked by the paremeters above, 
function setPostion(position){
    //assigns coordinates to latitude and longitude, also calls for getWeather Function which takes lat and long as parameters. 
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

//Added an event listener to fire if the user clicks on the location Icon. which will retrieve their geolocation and once again this will invoke api call to display information 
//based on their geolocation
locationIcon.addEventListener("click", function(event){
    console.log("hey");
    getWeather(latitude, longitude); //function yet to be created
})


// function that gets invoked by the parameters above as well. Displays error if we get a error somewhere in the logic. 
function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}


function getSearchWeather(city){
    //api call here to get information about city weather
}