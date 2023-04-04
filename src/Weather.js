import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  // State variables for location type, location value, weather data and error message
  const [locationType, setLocationType] = useState("city");
  const [locationValue, setLocationValue] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle form submission and API call
  const handleSearch = async (e) => {
    e.preventDefault();
    // API key for OpenWeatherMap API
    const apiKey = "cf002751564a4c78f5f7ed479f1b9ba3";
    // API URL depending on location type selected
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

    try {
      // Make API call using axios and update weather state with response data
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      setLocationValue("");
      setErrorMessage(null);
    } catch (error) {
      // Handle error if API call fails and update error message state
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setWeather(null);
    }
  };

  // useEffect hook to reset location value state when location type changes
  useEffect(() => {
    setLocationValue("");
    setErrorMessage(null);
    setWeather(null);
  }, [locationType]);

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
        {/* Render input field depending on location type selected */}
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {/* Render weather data or error message */}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °F</p>
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
