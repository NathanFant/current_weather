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

    useEffect(() => {
        if (!weather) return;

        const desc = weather.weather.description;
        const className = `bg-${desc.replace(/\s+/g, "-").toLowerCase()}`;

        // Remove any existing background class
        document.body.className = document.body.className.split(" ").filter(c => !c.startsWith("bg-")).join(" ").trim();

        // Add new weather-based background class
        document.body.classList.add(className);

        // Set tab title
        const temp = weather.temperature.fahrenheit;
        const city = weather.city;
        document.title = `${temp}°F in ${city}`;
    }, [weather]);


    if (error) return <div className="weather-container error">Error: {error}</div>;
    if (!weather) return <div className="weather-container loading">Loading weather...</div>;

    return (
        <div className="weather-container">
            <h2>Weather in {weather.city}</h2>
            <p>{weather.weather.description.split(" ").map(word => word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}</p>
            <p>Temperature: {weather.temperature.fahrenheit} °F</p>
            <p>Humidity: {weather.humidity}%</p>
        </div>
    );
}
