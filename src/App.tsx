import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import { getWeatherByCity } from "./api/main";
import { WeatherResultsByCity } from "./api/types";
// in a larger application, use modules or styled components etc.
import "./appStyles.css";
import Results from "./components/Results";

function App() {
  const [weatherInCityResults, setWeatherInCityResults] =
    useState<WeatherResultsByCity>();

  const submitCityInput = async (city: string) => {
    const result = await getWeatherByCity(city);
    setWeatherInCityResults(result);
  };

  return (
    <div className="AppContainer">
      <Header />
      <Form submitCityInput={submitCityInput} />
      {weatherInCityResults && (
        <Results weatherDetails={weatherInCityResults} />
      )}
    </div>
  );
}

export default App;
