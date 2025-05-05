import os
import requests
from typing import Optional
from dotenv import load_dotenv
from api.schemas import Temperature, WeatherDescription, WeatherData

# Allow us to get the api key from the .env file
load_dotenv(dotenv_path="src/api/.env")

# Fetch the weather API key from the environment
WEATHER_API = os.getenv("WEATHER_API")
print("Loaded API key: ", WEATHER_API)
LITTLE_ROCK = {
    "latitude": 34.746483,
    "longitude": -92.289597,
}  # To be used as a default weather location because I will be the primary user of this app.

# Ensure WEATHER_API is loaded
if not WEATHER_API:
    raise ValueError("No WEATHER_API key found in .env file")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


# This gets fahrenheit temp rounded to 2 decimal places.
def kelvin_to_fahrenheit(k: float) -> float:
    return round((k - 273.15) * 9 / 5 + 32, 2)


# This gets celsius temp rounded to 2 decimal places. (Much easier than getting fahrenheit)
def kelvin_to_celsius(k: float) -> float:
    return round(k - 273.15, 2)


def get_temp_by_coords(
    longitude: float = LITTLE_ROCK["longitude"],
    latitude: float = LITTLE_ROCK["latitude"],
) -> Optional[WeatherData]:

    params = {"lat": latitude, "lon": longitude, "appid": WEATHER_API}

    response = requests.get(BASE_URL, params=params)
    if response.status_code != 200:
        return None
    data = response.json()

    temp_kelvin = data["main"]["temp"]

    temperature = Temperature(
        kelvin=temp_kelvin,
        fahrenheit=kelvin_to_fahrenheit(temp_kelvin),
        celsius=kelvin_to_celsius(temp_kelvin),
    )

    weather_desc = WeatherDescription(
        main=data["weather"][0]["main"], description=data["weather"][0]["description"]
    )

    return WeatherData(
        city=data["name"],
        humidity=data["main"]["humidity"],
        temperature=temperature,
        weather=weather_desc,
    )


# print(get_temp_by_coords(), "degrees Fahrenheit")
# print(f'{BASE_URL}?lat={LITTLE_ROCK["latitude"]}&lon={LITTLE_ROCK["longitude"]}&appid={WEATHER_API}')
