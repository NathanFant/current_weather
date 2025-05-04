import os
import requests
from typing import Optional
from dotenv import load_dotenv

# Allow us to get the api key from the .env file
load_dotenv(dotenv_path="src/api/.env")

# Fetch the weather API key from the environment
WEATHER_API = os.getenv("WEATHER_API")
API_PORTION = f"&appid={WEATHER_API}"
LITTLE_ROCK = {"latitude": 34.746483, "longitude": -92.289597}

# Ensure WEATHER_API is loaded
if not WEATHER_API:
    raise ValueError("No WEATHER_API key found in .env file")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_temp_by_coords(
    longitude: float = LITTLE_ROCK["longitude"],
    latitude: float = LITTLE_ROCK["latitude"],
) -> Optional[float]:

    params = {"lat": latitude, "lon": longitude, "appid": WEATHER_API}
    response = requests.get(BASE_URL, params=params)
    if response.status_code != 200:
        return None
    data = response.json()

    temp_kelvin = data["main"]["temp"]

    temp_fah = round((temp_kelvin - 273.15) * (9 / 5) + 32, ndigits=2)
    return temp_fah


print(get_temp_by_coords(), "degrees Fahrenheit")
print(
    f'{BASE_URL}?lat={LITTLE_ROCK["latitude"]}&lon={LITTLE_ROCK["longitude"]}&appid={WEATHER_API}'
)
