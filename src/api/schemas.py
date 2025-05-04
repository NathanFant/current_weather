from pydantic import BaseModel


class Coordinates(BaseModel):
    latitude: float
    longitude: float


class Temperature(BaseModel):
    kelvin: float
    fahrenheit: float
    celsius: float


class WeatherDescription(BaseModel):
    main: str
    description: str


class WeatherData(BaseModel):
    city: str
    temperature: Temperature
    humidity: int
    weather: WeatherDescription
