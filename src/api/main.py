from fastapi import FastAPI
from .api import router as weather_router

app = FastAPI()
app.include_router(weather_router, prefix="/api")
