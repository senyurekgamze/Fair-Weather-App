// Display current time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayIndex = date.getDay();
  let day = days[dayIndex];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `
  ${day}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#currentTime");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

function showWeather(response) {
  document.querySelector("#h1city").innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let description = document.querySelector("#clouds");
  description.innerHTML = response.data.weather[0].description;

  let todayPrecipitation = response.data.main.humidity;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Humidity: ${todayPrecipitation}%`;

  let todayWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${todayWind} km/h`;

  let iconElement = document.querySelector("#icon-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showCity(event) {
  // Display the searched city in the heading
  event.preventDefault();
  let searchedCity = document.querySelector("#search").value;
  let h1city = document.querySelector("#h1city");
  h1city.innerHTML = `${searchedCity}`;
  search(searchedCity);
}

function search(searchedCity) {
  let apiKey = "cd079649401dd54f4594b7fe99733a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Search Current Location
function searchLocation(position) {
  let apiKey = "cd079649401dd54f4594b7fe99733a4a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
  let h1city = document.querySelector("#h1city");
  h1city.innerHTML = position.data.name;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showCity);

let LocationButton = document.querySelector("#button-location");
LocationButton.addEventListener("click", getCurrentLocation);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Amsterdam");
