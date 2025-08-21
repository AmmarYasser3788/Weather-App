import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiStrongWind } from "react-icons/wi";
import useWeather from "../Logic/useWeather";

const LandingPage = () => {
  const { city, setCity, error, fetchWeather, fetchWeatherByCoords, weather ,setError} = useWeather();

  // Auto-detect user location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Coords:", position.coords); // ✅ check if we get coords
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Could not get weather for your location");
        }
      );
    }
  }, []);

  // Background gradient based on weather
  const getBackground = () => {
    if (!weather || !weather.weather) return "bg-gradient-to-br from-blue-500 to-blue-700";
    switch (weather.weather[0].main) {
      case "Clear":
        return "bg-gradient-to-br from-yellow-400 to-orange-500"; // sunny
      case "Clouds":
        return "bg-gradient-to-br from-gray-400 to-gray-600"; // cloudy
      case "Rain":
        return "bg-gradient-to-br from-blue-600 to-gray-700"; // rainy
      case "Snow":
        return "bg-gradient-to-br from-blue-200 to-white"; // snowy
      default:
        return "bg-gradient-to-br from-blue-500 to-blue-700"; // default
    }
  };

  // Pick icon for weather
  const getIcon = () => {
    if (!weather || !weather.weather) return <WiDaySunny size={64} />;
    switch (weather.weather[0].main) {
      case "Clear":
        return <WiDaySunny size={64} />;
      case "Clouds":
        return <WiCloudy size={64} />;
      case "Rain":
        return <WiRain size={64} />;
      case "Snow":
        return <WiSnow size={64} />;
      default:
        return <WiStrongWind size={64} />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-white transition-all duration-700 ${getBackground()}`}
    >
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Weather App
      </motion.h1>

      <input
        type="text"
        value={city}
        placeholder="Enter a city..."
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 rounded-md text-black focus:outline-none shadow-md"
      />

      <button
        onClick={fetchWeather}
        className="mt-4 px-6 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 shadow-lg"
      >
        Get Weather
      </button>

      {/* Error message */}
      {error && <p className="mt-4 text-red-200">{error}</p>}

      {/* Weather card */}
      {weather && weather.main && (
        <motion.div
          className="mt-6 bg-white text-blue-800 p-6 rounded-2xl shadow-2xl text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center">{getIcon()}</div>
          <h2 className="text-2xl font-bold mt-2">{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
