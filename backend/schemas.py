#schemas.py - pydantic models for request and response validation.
# These define what data looks like coming in and going out of the api.

from pydantic import BaseModel
from typing import Optional

class JobApplicationCreate(BaseModel):
    company: str
    role: str
    status: str
    date_applied: str
    notes: Optional[str] = ""

class JobApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class JobApplicationResponse(JobApplicationCreate):
    id : int

    class Config:
        from_attributes = True