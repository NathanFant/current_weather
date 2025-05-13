export default function WeatherCard({ weather }) {
    return (
        <div className="weather-container">
            <h2>Weather in {weather.city}</h2>
            <p>{weather.weather.description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
            <p>Temperature: {weather.temperature.fahrenheit} °F</p>
            <p>Humidity: {weather.humidity}%</p>
        </div>
    );
}
