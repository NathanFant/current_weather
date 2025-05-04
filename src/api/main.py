from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router as weather_router

app = FastAPI()
app.include_router(weather_router, prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],  # TODO: add website 'frontend.com' when prod launch.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
