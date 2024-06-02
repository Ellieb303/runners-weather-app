//rerun of the data//

function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperatureElement");
  let temperature = response.data.temperature.current;
  let locationElement = document.querySelector("#location");
  locationElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#form-search");
searchFormElement.addEventListener("submit", getLocation);

searchLocation("London");
