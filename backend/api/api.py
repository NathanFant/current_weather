from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from db.session import get_db
from db.models import User, Preference
from api.weather import get_temp_by_coords
from schemas import Coordinates, WeatherData, UserOut, UserCreate, LoginRequest

router = APIRouter()


@router.post("/weather", response_model=WeatherData)
def get_weather(coords: Coordinates):
    result = get_temp_by_coords(longitude=coords.longitude, latitude=coords.latitude)
    if result is None:
        raise HTTPException(status_code=502, detail="Failed to fetch weather data")
    return result


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")
    new_user = User(username=user.username, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=UserOut)
def login(login_req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == login_req.username).first()
    if not user or user.password != login_req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user


@router.post("/preferences", response_model=dict)
def set_preferences(prefs: dict, db: Session = Depends(get_db)):
    user_id = prefs.get("user_id")
    lat = prefs.get("latitude")
    lon = prefs.get("longitude")
    temp_unit = prefs.get("temp_unit")

    existing = db.query(Preference).filter(Preference.user_id == user_id).first()
    if existing:
        existing.default_latitude = lat
        existing.default_longitude = lon
        existing.temp_unit = temp_unit
    else:
        new_pref = Preference(
            user_id=user_id,
            default_latitude=lat,
            default_longitude=lon,
            temp_unit=temp_unit,
        )
        db.add(new_pref)

    db.commit()
    return {"message": "Preferences saved"}
