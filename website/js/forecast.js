function getWeather() {
    const city = document.getElementById("city").value;
    const language = document.getElementById("language").value;
    const apiKey = "541e0f87f52fd3aa10cca6effdeafa08"; // Replace with your API key
  
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${language}&units=metric&appid=${apiKey}`;
  
    // Fetch current weather data
    fetch(currentWeatherUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  
    // Fetch 5-day/3-hour forecast data
    fetch(forecastUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayForecast(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  
  function displayWeather(data) {
    const weatherDataDiv = document.getElementById("weatherData");
    weatherDataDiv.innerHTML = ''; // Clear previous data
  
    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info"; // Set default class
    weatherInfo.innerHTML = `
      <h2>Weather in ${data.name}</h2>
      <p> ${data.weather[0].description}</p>
      <p>${data.main.temp}°C</p>
      <!-- Add other weather details as needed -->
    `;
  
    const weatherbg = document.getElementById("fore");

  // Clear previously added classes
  weatherbg.classList.remove('sky', 'scattered', 'cloud', 'drizzle', 'rain', 'thunderstorm', 'snow', 'mist', 'fog', 'smoke', 'haze');

  switch (data.weather[0].main.toLowerCase()) {
    case 'clear':
      weatherbg.classList.add('sky');
      break;
    case 'scattered':
      weatherbg.classList.add('scattered');
      break;
    case 'clouds':
      weatherbg.classList.add('cloud');
      break;
    case 'lightrain':
      weatherbg.classList.add('drizzle');
      break;
    case 'rain':
      weatherbg.classList.add('rain');
      break;
    case 'thunderstorm':
      weatherbg.classList.add('thunderstorm');
      break;
    case 'snow':
      weatherbg.classList.add('snow');
      break;
    case 'mist':
      weatherbg.classList.add('mist');
      break;
    case 'fog':
      weatherbg.classList.add('fog');
      break;
    case 'smoke':
      weatherbg.classList.add('smoke');
      break;
    case 'haze':
      weatherbg.classList.add('haze');
      break;
    default:
      break;
  }

  weatherDataDiv.appendChild(weatherInfo);
}
  
function displayForecast(data) {
  const forecastDataDiv = document.getElementById("forecastData");
  forecastDataDiv.innerHTML = ''; // Clear previous data

  const forecastHeader = document.createElement("h2");
  forecastHeader.textContent = "5-Day Forecast";
  forecastDataDiv.appendChild(forecastHeader);

  data.list.forEach(item => {
    const forecastInfo = document.createElement("div");
    forecastInfo.className = "forecast-info"; // Add a class for styling

    const dateTime = new Date(item.dt * 1000); // Convert Unix timestamp to date
    const date = dateTime.toDateString();
    const time = dateTime.toLocaleTimeString();

    const temp = item.main.temp;
    const weatherDescription = item.weather[0].main;
    const windType = item.wind.speed > 10 ? "Windy" : "Calm"; // Change this condition as needed

    forecastInfo.innerHTML = `
      <div class="left-info">
        <p>${date}</p>
        <p>${time}</p>
        <p>${temp}°C</p>
      </div>
      <div class="right-info">
        <p>${weatherDescription}</p>
        <p>${windType}</p>
      </div>
    `;

    // Add class based on weather condition
    if (temp >= 25) {
      forecastInfo.classList.add("hot");
    } else if (temp <= 10) {
      forecastInfo.classList.add("cold");
    } else {
      forecastInfo.classList.add("normal");
    }

    forecastInfo.addEventListener("mouseover", () => {
      forecastInfo.classList.add("hover");
    });

    forecastInfo.addEventListener("mouseleave", () => {
      forecastInfo.classList.remove("hover");
    });

    forecastDataDiv.appendChild(forecastInfo);
  });
}

