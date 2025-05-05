from pydantic import BaseModel, Field


class Coordinates(BaseModel):
    latitude: float = Field(default=34.746483, description="Latitude of the location")
    longitude: float = Field(
        default=-92.289597, description="Longitude of the location"
    )


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
