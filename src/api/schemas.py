from pydantic import BaseModel
from datetime import date, time


class WeatherForecastOut(BaseModel):
    forecast_date: date
    min_temp: float
    max_temp: float
    precipitation_chance: float
    precipitation_amount: float
    sunrise: time
    sunset: time


class Coordinates(BaseModel):
    latitude: float
    longitude: float
