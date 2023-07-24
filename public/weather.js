const searchBar = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error_message");


async function displayWeather(city) {
    const url = `/api?q=${city}`;
    const response = await fetch(url);
    let data = await response.json();

    if (data.cod !== 200) {
        error.style.display = "flex";
        weather.style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "assets/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "assets/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "assets/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "assets/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "assets/fog.png";
        }

        weather.style.display = "flex";
        error.style.display = "none";
    }
    
}

searchBtn.addEventListener("click", function () {
    displayWeather(searchBar.value);
});
searchBar.addEventListener("keypress", function(event){
    if(event.key == "Enter"){
        displayWeather(searchBar.value);
    }
})