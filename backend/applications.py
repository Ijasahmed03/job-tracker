#applications.py - all routes (endpoints) for job applications
# A route is one specific thing an API knows how to do

from fastapi import APIRouter, HTTPException
from models import JobApplicationCreate, JobApplicationResponse
from database import read_db, write_db, get_next_id
from typing import List

router = APIRouter()

@router.get("/", response_model=List[JobApplicationResponse])
def get_applications():
    return read_db()

@router.post("/", response_model=JobApplicationResponse)
def create_application(application: JobApplicationCreate):
    data = read_db()
    new_app = application.model_dump()
    new_app["id"] = get_next_id()
    data.append(new_app)
    write_db(data)
    return new_app

@router.patch("/{app_id}", response_model=JobApplicationResponse)
def update_status(app_id: int, status: str):
    data = read_db()
    for app in data:
        if app["id"] == app_id:
            app["status"] = status
            write_db(data)
            return app
    raise HTTPException(status_code=404, detail="Application not found")

@router.delete("/{app_id}")
def delete_application(app_id: int):
    data = read_db
    updated = [app for app in data if app["id"] != app_id]
    if len(updated) == len(data):
        raise HTTPException(status_code=404, detail="Application not found")
    write_db(updated)
    return {"message": "Deleted successfully"}