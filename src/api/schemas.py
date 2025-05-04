from pydantic import BaseModel
from datetime import date, time


class Coordinates(BaseModel):
    latitude: float
    longitude: float


class WeatherDescription(BaseModel):
    main: str
    description: str


class WeatherData(BaseModel):
    city: str
    temperature_k: float
    temperature_f: float
    temperature_c: float
    humidity: int
    weather: WeatherDescription
