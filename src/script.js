//rerun of the data//

function getLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-search-input");
  let locationElement = document.querySelector("#location");
  locationElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#form-search");
searchFormElement.addEventListener("submit", getLocation);
console.log(searchFormElement);
