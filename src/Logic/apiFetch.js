const API_KEY = "042437452f54d8e5657842a8da7d9c5a"; // replace with your OpenWeather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function apiFetch(city, lat, lon) {
  let url;

  if (city) {
    // fetch by city name
    url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  } else if (lat && lon) {
    // fetch by coordinates
    url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    throw new Error("No city or coordinates provided");
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return await response.json();
}
