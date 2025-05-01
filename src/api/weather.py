from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="src/api/.env")
WEATHER_API = os.getenv("WEATHER_API")
BASE_URL = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"

def get_weather_by_coords(longitute, latitude):
