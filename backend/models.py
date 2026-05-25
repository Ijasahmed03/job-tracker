# models.py - defines what a job application looks like
#models.py -  data shapes for api
#Pydantic models validate data automatically
from pydantic import BaseModel
from typing  import Optional


class JobApplicationCreate(BaseModel):
    company: str
    role: str
    status: str
    date_applied: str
    notes: Optional[str] = ""

class JobApplicationResponse(JobApplicationCreate):
    id : int

    class Config:
        from_attributes = True
