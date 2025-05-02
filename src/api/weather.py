import os
import requests
from dotenv import load_dotenv

# Ensure this path is correct
load_dotenv(dotenv_path="src/api/.env")

# Fetch the weather API key from the environment
WEATHER_API = os.getenv("WEATHER_API")
api_portion = f"&appid={WEATHER_API}"

# Ensure WEATHER_API is loaded
if not WEATHER_API:
    raise ValueError("No WEATHER_API key found in .env file")

BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"


# https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={api_key}
def get_weather_by_coords(longitude: int, latitude: int) -> str:
    lon = str(longitude)
    lat = str(latitude)
    new_url = BASE_URL + f"?lat={lat}&lon={lon}{api_portion}"
    return new_url


# Test the function
print(get_weather_by_coords(123, 456))
