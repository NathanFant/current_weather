from fastapi import APIRouter, HTTPException
from api.weather import get_temp_by_coords
from api.schemas import Coordinates, WeatherData

router = APIRouter()


@router.post("/weather", response_model=WeatherData)
def get_weather(coords: Coordinates):
    result = get_temp_by_coords(longitude=coords.longitude, latitude=coords.latitude)
    if result is None:
        raise HTTPException(status_code=502, detail="Failed to fetch weather data")
    return result
