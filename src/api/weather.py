import os
import requests
from dotenv import load_dotenv

# Ensure this path is correct
load_dotenv(dotenv_path="src/api/.env")

# Fetch the weather API key from the environment
WEATHER_API = os.getenv("WEATHER_API")

# Ensure WEATHER_API is loaded
if not WEATHER_API:
    raise ValueError("No WEATHER_API key found in .env file")

BASE_URL = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={api_key}"


def get_weather_by_coords(longitude, latitude):
    params = {"lon": longitude, "lat": latitude, "appid": WEATHER_API}

    res = requests.get(BASE_URL, params=params)
    res.raise_for_status()  # Will raise an error if the response status code is not 200
    return res.json()


# Test the function
print(get_weather_by_coords(123, 456))
