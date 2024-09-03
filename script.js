const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "22a8a094409318ea455f770ee272ef4d";

weatherForm.addEventListener("submit", async event => {

    
    event.preventDefault();
    
    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city name");
    }
    
});
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("City not found");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const {name:city, main:{temp,humidity}, weather:[{description,id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const displayWeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    displayWeatherEmoji.textContent = weatherEmoji(id);
    displayWeatherEmoji.classList.add("weatherEmoji");
    card.appendChild(displayWeatherEmoji);
}
function weatherEmoji(weatherId){
    switch (true) {
        case weatherId < 300:
            return "⛈️";
        case weatherId < 500:
            return "🌧️";
        case weatherId < 600:
            return "🌧️";
        case weatherId < 700:
            return "❄️";
        case weatherId < 800:
            return "🌫️";
        case weatherId === 800:
            return "☀️";
        case weatherId === 801:
            return "🌤️";
        case weatherId > 801:
            return "☁️";
        default:
            return "🌞";
    }
}
function displayError(message){

    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex"; 
    card.appendChild(errorMessage);

    
}