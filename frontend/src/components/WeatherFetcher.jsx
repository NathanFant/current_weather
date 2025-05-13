import { useState, useEffect } from "react";
import { useCoords } from "../context/CoordsContext";
import { useUser } from "../context/UserContext";
import WeatherCard from "./WeatherCard";

const LITTLE_ROCK_COORDS = {
  latitude: 34.746483,
  longitude: -92.289597,
};

export default function WeatherFetcher() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const { coords } = useCoords();
  const { user } = useUser();

  useEffect(() => {
    // Priority: user prefs > manual coords > default
    const latitude =
      user?.preferences?.latitude ??
      coords?.latitude ??
      LITTLE_ROCK_COORDS.latitude;
    const longitude =
      user?.preferences?.longitude ??
      coords?.longitude ??
      LITTLE_ROCK_COORDS.longitude;

    const fetchWeather = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Failed to fetch weather");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(`Error Fetching: ${err}`);
        setError(err.message);
      }
    };

    fetchWeather();
  }, [coords, user]);

  useEffect(() => {
    if (!weather) return;

    const desc = weather.weather.description;
    const className = `bg-${desc.replace(/\s+/g, "-").toLowerCase()}`;

    document.body.className = document.body.className
      .split(" ")
      .filter((c) => !c.startsWith("bg-"))
      .join(" ")
      .trim();

    document.body.classList.add(className);

    const temp =
      user?.preferences?.temp_unit === "celsius"
        ? weather.temperature.celsius
        : weather.temperature.fahrenheit;

    const unit = user?.preferences?.temp_unit === "celsius" ? "°C" : "°F";

    document.title = `${temp}${unit} in ${weather.city}`;
  }, [weather, user]);

  if (error)
    return <div className="weather-container error">Error: {error}</div>;
  if (!weather)
    return <div className="weather-container loading">Loading weather...</div>;

  return <WeatherCard weather={weather} unit={user?.preferences?.temp_unit} />;
}
