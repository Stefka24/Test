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
function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row thisWeek">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="card col-2 nextDays">
                <div class="card-body eachDay">
                  <h5 class="card-title">${formatDays(forecastDay.dt)}</h5>
                  <div class="card-text">${Math.round(
                    forecastDay.temp.day
                  )}℃</div>
                  <div class="card-text">
                    <img class="forecastIcons" src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" />
                  </div>
                </div>
              </div>
            `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "2bbfe2c83b5eba58ece5b7c5c691290a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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

document.querySelector("#search-button").addEventListener("click", searchCity);

document
  .querySelector("#locate-button")
  .addEventListener("click", searchLocation);

search("London");
