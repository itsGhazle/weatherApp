function showPosition(position) {
  let apiKey = "28878d57de90996180cc4ad04854a569";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showCurrentTemp);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function search(city) {
  let apiKey = "28878d57de90996180cc4ad04854a569";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(showCurrentTemp);
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
}
function handelSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  search(searchInput);
}
function getCurrentTime(date) {
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
let currentTime = new Date();
document.querySelector("h5").innerHTML = getCurrentTime(currentTime);

////////// submit form

let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

search("Tehran");

////////// location

let button = document.querySelector("#location-btn");
button.addEventListener("click", getCurrentLocation);
