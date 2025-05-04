from fastapi import APIRouter
from .weather import get_temp_by_coords
from .schemas import Coordinates

router = APIRouter()


@router.post("/weather")
def get_weather(coords: Coordinates):
    return {"temp_f": get_temp_by_coords(coords.longitude, coords.latitude)}
