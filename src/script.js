//rerun of the data//

function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let locationElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  let feelsElement = document.querySelector("#feels-like");
  let feelsLikeElement = response.data.temperature.feels_like;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date-now");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(temperature);
  locationElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${Math.round(wind)}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  feelsElement.innerHTML = `${Math.round(feelsLikeElement)}℃`;
  timeElement.innerHTML = formatTime(date);
  dateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon">`;

  getForecast(response.data.city);
}
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dateNow = date.getDate();
  let month = months[date.getMonth()];
  let day = days[date.getDay()];

  if ((dateNow = 1 || 21 || 31)) {
    dateNow = `${dateNow}st`;
  }
  if ((dateNow = 2 || 22)) {
    dateNow = `${dateNow}nd`;
  } else {
    dateNow = `${dateNow}th`;
  }

  return `${day} ${dateNow} ${month}`;
}

function searchLocation(location) {
  let apiKey = "d589f04c5d3bf192d4720a0f02to3fc2";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
  console.log(apiURL);
}

function getLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search-input");

  searchLocation(searchInput.value);
}

function formatDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "d589f04c5d3bf192d4720a0f02to3fc2";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDateForecast(
              day.time
            )}</div>
            <div>
              <img
                src="${day.condition.icon_url}"
                alt=""
                width="70px"
              />
            </div>
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-upper">
              <strong>${Math.round(day.temperature.maximum)}℃</strong></span>
              <span class="weather-forecast-temp-lower">${Math.round(
                day.temperature.minimum
              )}℃</span>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#form-search");
searchFormElement.addEventListener("submit", getLocation);

searchLocation("London");
