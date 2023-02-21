import React from "react";
import { WeatherResultsByCity } from "../api/types";

interface ResultsProps {
  weatherDetails: WeatherResultsByCity;
}

export default function Results({ weatherDetails }: ResultsProps) {
  const { icon, cityName, description, currentTemp, feelsLike, windSpeed } =
    weatherDetails;
  if (cityName === "not-found") {
    return (
      <div className="CityNotFoundContainer">
        <h3>Sorry! Cant find a city matching this.</h3>
      </div>
    );
  }
  return (
    <div className="ResultsContainer">
      <div className="ResultsHeader">
        <h1>{cityName}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="current weather"
        />
      </div>
      <p>Description: {description}</p>
      <p>Current temp: {currentTemp}&#xb0;F</p>
      <p>Feels like: {feelsLike}&#xb0;F</p>
      <p>Wind speed: {windSpeed}mph</p>
    </div>
  );
}
