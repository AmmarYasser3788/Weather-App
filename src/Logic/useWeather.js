import { useState } from "react";
import { apiFetch } from "./apiFetch";

export default function useWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // fetch weather by city name
  const fetchWeather = async () => {
    try {
      const data = await apiFetch(city);
      setWeather(data);
      setError("");
    } catch (err) {
      setError("City not found!");
    }
  };

  // fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const data = await apiFetch(null, lat, lon); // modify apiFetch to accept coords
      setWeather(data);
      setError("");
    } catch (err) {
      setError("Could not get weather for your location");
    }
  };

  return { city, setCity, weather, error, fetchWeather, fetchWeatherByCoords };
}
