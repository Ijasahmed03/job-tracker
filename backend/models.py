# models.py - SQLAlchemy models
# Thes define your database tables as python classes

from sqlalchemy import Column, Integer, String
from database import Base

class JobApplication(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index= True)
    company = Column(String, nullable=False)
    role = Column(String, nullable=False)
    status = Column(String, nullable=False)
    date_applied = Column(String, nullable=False)
    notes = Column(String, default="")


