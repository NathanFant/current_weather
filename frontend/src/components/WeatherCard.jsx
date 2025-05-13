export default function WeatherCard({ weather, unit = "fahrenheit" }) {

    const temp = unit === "celsius" ?  weather.temperature.celsius : weather.temperature.fahrenheit;


    return (
        <div className="weather-container">
            <h2>Weather in {weather.city}</h2>
            <p>{weather.weather.description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
            <p>Temperature: {temp} °{unit === "celsius" ? "C" : "F"}</p>
            <p>Humidity: {weather.humidity}%</p>
        </div>
    );
}
