import axios, { AxiosError, AxiosResponse } from "axios";
import {
  CityOpenweatherApiResponse,
  TomTomGeolocationApiResponse,
  WeatherResultsByCity,
} from "./types";

// API keys should be private ENV variables. But for coding challenge will leave them out here.
const OPENWEATHER_API_KEY = "b0f0dbbd0f69c5a5f9e24172f71a8321";
const TOMTOM_GEOCODING_API_KEY = "d8lfN1T3AAFZcReqL0Surtpp5ccGK5Px";

const TOMTOM_GELOCATION_API_URL = "https://api.tomtom.com/search/2/geocode";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const geocodeFromCity = async (
  cityName: string
): Promise<AxiosResponse<TomTomGeolocationApiResponse, AxiosError>> => {
  return axios.get(`${TOMTOM_GELOCATION_API_URL}/${cityName}.json`, {
    params: {
      key: TOMTOM_GEOCODING_API_KEY,
      limit: 1,
    },
  });
};

const getWeatherFromLatLon = async (
  lat: number,
  lon: number
): Promise<AxiosResponse<CityOpenweatherApiResponse, AxiosError>> => {
  return axios.get(`${WEATHER_API_URL}`, {
    params: {
      lon,
      lat,
      appid: OPENWEATHER_API_KEY,
      units: "imperial",
    },
  });
};

export const getWeatherByCity = async (
  cityName: string
): Promise<WeatherResultsByCity> => {
  // get results and destructure from the geocode function
  const {
    data: { results: arrayOfResults },
  } = await geocodeFromCity(cityName);
  // results is possibly empty, according to TomTom docs. So respond to this:
  const matchedResult = arrayOfResults[0];

  // if not a "Municipality" from TomTom, we cannot verify that it is a city.
  if (!matchedResult || matchedResult?.entityType !== "Municipality") {
    return {
      cityName: "not-found",
      description: "",
      currentTemp: 0,
      feelsLike: 0,
      windSpeed: 0,
      icon: "",
    };
  }

  const { lat, lon } = matchedResult.position;
  const {
    address: { municipality },
  } = matchedResult;

  // get all values we will need from the api
  const {
    data: {
      main: { temp, feels_like },
      wind: { speed },
      // destructure from first index of result
      weather: [{ description, icon }],
    },
  } = await getWeatherFromLatLon(lat, lon);

  return {
    cityName: municipality,
    description,
    currentTemp: temp,
    feelsLike: feels_like,
    windSpeed: speed,
    icon,
  };
};
