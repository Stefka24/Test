function getCurrentDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let sentence = `${date} ${month} ${hour}:${minutes}`;
  return sentence;
}
function search(city) {
  let apiKey = "2bbfe2c83b5eba58ece5b7c5c691290a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDegrees);
}

function searchCity(event) {
  event.preventDefault();

  let city = (document.querySelector("#new-city").innerHTML =
    document.querySelector("#city-form").value);
  search(city);
}
function showDegrees(response) {
  document.querySelector("#new-city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  feelsLikeTemp = response.data.main.feels_like;
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#current-feels-like").innerHTML =
    Math.round(feelsLikeTemp);
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#current-date").innerHTML = getCurrentDate(
    response.data.dt * 1000
  );
}
function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCity);
}

function locateCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2bbfe2c83b5eba58ece5b7c5c691290a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(defineLocation);
}

function defineLocation(response) {
  let name = response.data.name;
  document.querySelector("#new-city").innerHTML = name;
  showDegrees(response);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  linkCelsius.classList.remove("tempCelsius");
  linkFahrenheit.classList.add("tempCelsius");
  document.querySelector("#current-temp").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  document.querySelector("#current-feels-like").innerHTML = Math.round(
    (feelsLikeTemp * 9) / 5 + 32
  );
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  linkCelsius.classList.add("tempCelsius");
  linkFahrenheit.classList.remove("tempCelsius");
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#current-feels-like").innerHTML =
    Math.round(feelsLikeTemp);
}

document.querySelector("#search-button").addEventListener("click", searchCity);

document
  .querySelector("#locate-button")
  .addEventListener("click", searchLocation);

let celsiusTemp = null;
let feelsLikeTemp = null;

let linkCelsius = document.querySelector("#temp-celsius");
linkCelsius.addEventListener("click", displayCelsiusTemp);
let linkFahrenheit = document.querySelector("#temp-fahrenheit");
linkFahrenheit.addEventListener("click", displayFahrenheitTemp);

search("London");
