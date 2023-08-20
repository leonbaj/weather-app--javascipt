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
        city=input.value
        //Display City
        console.log(city)
    }

})


