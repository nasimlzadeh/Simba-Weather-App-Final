function fiveDayForcast(response) {
  let forcast = response.data.daily;
  // console.log(day);
  // day = 0;
  console.log(forcast);
  let nextDayForcast = document.querySelector("#forcast");
  //
  let i = 0;
  // let periodLength=5
  let forcastWeather = `<div class="row">`;
  for (i; i < 6; i++) {
    forcastWeather =
      forcastWeather +
      `
              <div class="col-2">
              <div class="nextDay">${formatDay(forcast[i].dt)}</div>
              <div class="forcastIcon">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forcast[i].weather[0].icon
                  }@2x.png"
                  alt="${forcast[i].weather[0].description}"
                  width="46px"
                />
              </div>
              <span class="maxTemp">${Math.round(forcast[i].temp.max)}°</span>
              <span class="minTemp">${Math.round(forcast[i].temp.min)}°</span>
            </div>`;
    // day = day + 1;
    // if (day + 1 > 7) {
    //   day = 0;
    // }
  }

  nextDayForcast.innerHTML = forcastWeather + `</div>`;
}
function formatDay(timestamp) {
  let daytime = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[daytime.getDay()];
  console.log(day);
}
// function futureForcast(response) {
//   console.log(response);
// }
function showInfo(response) {
  // console.log(response);
  celsiusTemp = response.data.main.temp;
  let tempElement = document.querySelector("#city-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
  let humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let desiredCity = document.querySelector("#city-name");
  desiredCity.innerHTML = response.data.name;
  let description = document.querySelector("#weather-icon");
  description.innerHTML = response.data.weather[0].description;
  let timestamp = new Date(response.data.dt * 1000); //new date() receives UNIX in miliseconds and the timestamp provided by openweatherapp is in seconds
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = document.querySelector("#current-day");
  today.innerHTML = days[timestamp.getDay()];
  let hours = document.querySelector("#hours");
  let correctHour = timestamp.getHours();
  if (correctHour < 10) {
    correctHour = `0${correctHour}`;
  }
  hours.innerHTML = correctHour;
  let minutes = document.querySelector("#minutes");
  let correctMinutes = timestamp.getMinutes();
  if (correctMinutes < 10) {
    correctMinutes = `0${correctMinutes}`;
  }
  minutes.innerHTML = correctMinutes;
  // fiveDayForcast(response, timestamp.getDay());
  getCoord(response);
}
function getCoord(response) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let cityLon = response.data.coord.lon;
  let cityLat = response.data.coord.lat;
  // let firstday = day;
  // console.log(cityLon);
  // console.log(cityLat);
  let forcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric`;
  // let forcastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${key}&units=metric`;
  // console.log(forcastUrl);
  axios.get(forcastUrl).then(fiveDayForcast);
}
function search(city) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let cityName = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showInfo);
}
function getCity(event) {
  event.preventDefault();
  let desiredCity = document.querySelector("#enter-city");
  search(desiredCity.value);
}
let submitedCity = document.querySelector("#search-city");
submitedCity.addEventListener("submit", getCity);

search("tehran");
