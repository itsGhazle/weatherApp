function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showCurrentTemp);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function search(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showCurrentTemp);
}
function getForecastWeather(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".currentLocation").innerHTML = response.data.name;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main["feels_like"]
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0]["main"];
  document.querySelector("h5").innerHTML = getCurrentTime(
    response.data.dt * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecastWeather(response.data.coord);
  ////////// changing the background-image

  let description = response.data.weather[0];
  let background = document.querySelector("body");
  let backgroundColor = document.querySelector("div.container");
  if (description["description"] === "clear sky") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_Sunny-day_3.jpg)";
  } else if (description["description"] === "few clouds") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_PartlyCloudy-day_2.jpg)";
  } else if (description["description"] === "scattered clouds") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_MostlyCloudy-night_2.jpg)";
  } else if (description["description"] === "overcast clouds") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_Cloudy-day_1.jpg)";
  } else if (
    description["description"] === "dust" ||
    description["description"] === "sand"
  ) {
    background.style.backgroundImage =
      "url(../images/WeatherImage_BlowingSand-day_2.jpg)";
  } else if (description["main"] === "Drizzle") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_Drizzle-day_1.jpg)";
  } else if (description["main"] === "Rain") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_Drizzle-day_2.jpg)";
  } else if (description["main"] === "Snow") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_SnowShowers-night_2.jpg)";
  } else if (description["main"] === "Mist") {
    background.style.backgroundImage =
      "url(../images/WeatherImage_Cloudy-day_1.jpg)";
  } else {
    background.style.backgroundImage = "url(../images/weather.jpg)";
  }
  if (
    description["main"] === "Mist" ||
    description["description"] === "overcast clouds" ||
    description["description"] === "dust" ||
    description["description"] === "sand"
  ) {
    backgroundColor.style.backgroundImage =
      "linear-gradient(0deg,#e5dee2,#e5dee2 20%,#aba2b4 60%,#59516e 90%,#59516e)";
  } else if (description["description"] === "scattered clouds") {
    backgroundColor.style.backgroundImage =
      "linear-gradient(to bottom,#615878,#615878 20%,#464161 60%,#313050 90%,#313050)";
  } else {
    backgroundColor.style.backgroundImage =
      "linear-gradient(to top,#d8eeee,#d8eeee 25%,#64b3c9 65%,#005986 90%,#005986)";
  }
}
function formatForecastDate(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[timestamp.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;

  let forecastElement = document.querySelector("#forecastWeather");
  let forecastHtml = `<div class="row forecastRow">`;

  forecastDaily.forEach((forecast, index) => {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        ` <div class="col forecastCol">
            <strong>${formatForecastDate(new Date(forecast.dt * 1000))}</strong>
            <br />
            <span class="day">${Math.round(
              forecast.temp.day
            )}°</span> / <span class="night">${Math.round(
          forecast.temp.night
        )}°</span>

            <br />
           <img src=" http://openweathermap.org/img/wn/${
             forecast.weather[0].icon
           }@2x.png" alt="" width= "42"/>
          </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function handelSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  search(searchInput);
}
function getCurrentTime(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[date.getDay()];

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
  let currentMonth = months[date.getMonth()];

  let dates = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentMonth} ${dates} ${currentHour}:${currentMinutes}`;
}
function showFahrenheite(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#temperature");
  celcius.classList.remove("active");
  fahrenheite.classList.add("active");
  let calFahr = (celsiusTemp * 9) / 5 + 32;
  currentDegree.innerHTML = Math.round(calFahr);
}

function showCelsius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheite.classList.remove("active");
  let currentDegree = document.querySelector("#temperature");

  currentDegree.innerHTML = Math.round(celsiusTemp);
}

let apiKey = "28878d57de90996180cc4ad04854a569";

////////// submit form

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

////////// location

let button = document.querySelector("#location-btn");
button.addEventListener("click", getCurrentLocation);

search("Paris");
