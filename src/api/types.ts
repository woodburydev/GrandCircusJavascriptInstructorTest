// typed API response on success of weather API.
export interface CityOpenweatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// there is WAY more to this interface you can add, but no need to fill it all out for this challenge
export interface TomTomGeolocationApiResponse {
  results: {
    position: { lat: number; lon: number };
    address: {
      country: string;
      countryCode: string;
      countryCodeISO3: string;
      countrySecondarySubdivision: string;
      countrySubdivision: string;
      countrySubdivisionName: string;
      freeformAddress: string;
      municipality: string;
    };
    entityType: string; // where we can determine if city
  }[];
}

// main function response
export interface WeatherResultsByCity {
  description: string;
  currentTemp: number;
  icon: string;
  feelsLike: number;
  cityName: string;
  windSpeed: number;
}
