from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api import router as weather_router
from db.models import Base
from db.session import engine

app = FastAPI()
app.include_router(weather_router, prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: add website 'frontend.com' when prod launch.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
