function displayWeather(response) {
  let citySearch = document.querySelector("#input-search");
  let location = document.querySelector("#location");
  let currentTemperature = Math.round(response.data.temperature.current);
  let degrees = document.querySelector("#current-temperature");
  let currentHumidity = document.querySelector("#current-humidity-value");
  let currentWind = document.querySelector("#current-wind-value");
  let currentFeel = document.querySelector("#current-feels-value");
  let currentIcon = document.querySelector(".c-icon");

  currentIcon.innerHTML = `${response.data.condition.icon_url.png}`;
  currentFeel.innerHTML = `${response.data.temperature.feels_like}℃`;
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  currentWind.innerHTML = `${response.data.wind.speed}km/h`;
  location.innerHTML = `${citySearch.value}`;
  degrees.innerHTML = `${currentTemperature}`;
}
function getApi(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#input-search");
  let city = `${citySearch.value}`;
  let apiKey = "d589f04c5d3bf192d4720a0f02to3fc2";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", getApi);

let now = new Date();

function preciseTime(now) {
  let h4 = document.querySelector("h4");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  h4.innerHTML = `${day} ${hours}:${minutes}`;
}

preciseTime(now);
