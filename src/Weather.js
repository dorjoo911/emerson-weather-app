import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [locationType, setLocationType] = useState("city");
  const [locationValue, setLocationValue] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = "cf002751564a4c78f5f7ed479f1b9ba3";
    let apiUrl;

    switch (locationType) {
      case "city":
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apiKey}&units=imperial`;
        break;
      case "zip":
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${locationValue}&appid=${apiKey}&units=imperial`;
        break;
      case "coord":
        const [lat, lon] = locationValue.split(",");
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        break;
      default:
        return;
    }

    const response = await axios.get(apiUrl);
    setWeather(response.data);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <label>
          Location Type:
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="city">City Name</option>
            <option value="zip">Zip Code</option>
            <option value="coord">Coordinates</option>
          </select>
        </label>{" "}
        {locationType === "city" && (
          <label>
            City Name:
            <input
              type="text"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
          </label>
        )}
        {locationType === "zip" && (
          <label>
            Zip Code:
            <input
              type="text"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
          </label>
        )}
        {locationType === "coord" && (
          <label>
            Coordinates (comma separated):
            <input
              type="text"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
          </label>
        )}
        <button type="submit">Search</button>
      </form>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>
            Coordinate: {weather.coord.lat},{weather.coord.lon}
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
