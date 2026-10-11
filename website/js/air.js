document.getElementById('airPollutionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cityName = document.getElementById('cityName').value;
    const apiKey = "541e0f87f52fd3aa10cca6effdeafa08"; // Replace with your API key

    // Fetching coordinates for the city name using Geocoding API
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(geocodingUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Extract latitude and longitude

          // Fetch air pollution data using the obtained coordinates
          const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          
          fetch(airPollutionUrl)
            .then(response => response.json())
            .then(airData => {
              displayAirPollutionData(airData);
            })
            .catch(error => {
              document.getElementById('airPollutionResults').innerHTML = `Error fetching air pollution data: ${error.message}`;
            });
        } else {
          document.getElementById('airPollutionResults').innerHTML = "No coordinates found for the specified city.";
        }
      })
      .catch(error => {
        document.getElementById('airPollutionResults').innerHTML = `Error fetching coordinates: ${error.message}`;
      });
  });

  function displayAirPollutionData(data) {
    const airPollutionResults = document.getElementById('airPollutionResults');
    const { coord, list } = data;

    if (list && list.length > 0) {
      const { main, components } = list[0];

      airPollutionResults.innerHTML = `
        <p>Coordinates: ${coord.lat}, ${coord.lon}</p>
        <p>AQI (Air Quality Index): ${main.aqi}</p>
        <p>CO (Carbon monoxide): ${components.co} μg/m³</p>
        <p>NO (Nitrogen monoxide): ${components.no} μg/m³</p>
        <p>NO2 (Nitrogen dioxide): ${components.no2} μg/m³</p>
        <p>O3 (Ozone): ${components.o3} μg/m³</p>
        <p>SO2 (Sulphur dioxide): ${components.so2} μg/m³</p>
        <p>PM2.5 (Fine particles matter): ${components.pm2_5} μg/m³</p>
        <p>PM10 (Coarse particulate matter): ${components.pm10} μg/m³</p>
        <p>NH3 (Ammonia): ${components.nh3} μg/m³</p>
      `;
    } else {
      airPollutionResults.innerHTML = "No air pollution data available for the specified city.";
    }
  }