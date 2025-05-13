from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    preferences = relationship("Preference", back_populates="user", uselist=False)


class Preference(Base):
    __tablename__ = "preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    default_latitude = Column(Float, default=34.746483)
    default_longitude = Column(Float, default=-92.289597)
    temp_unit = Column(String, default="fahrenheit")

    user = relationship("User", back_populates="preferences")
