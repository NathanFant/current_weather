import { useState, useEffect } from "react";

export default function WeatherFetcher() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/weather",  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        latitude: 34.746483,
                        longitude: -92.289597,
                    }),
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
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!weather) return <div>Loading weather...</div>;

    return (
        <div>
            <h2>Weather in {weather.city}</h2>
            <p>{weather.weather.description}</p>
            <p>Temperature: {weather.temperature.fahrenheit} °F</p>
            <p>Humidity: {weather.humidity}%</p>
        </div>
    );
}
