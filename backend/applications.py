#applications.py - route handlers for job applications
# Each function handles one specific HTTP request

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import JobApplication
from schemas import JobApplicationCreate, JobApplicationResponse, JobApplicationUpdate

router = APIRouter()

@router.get("/", response_model=List[JobApplicationResponse])
def get_applications(db:Session = Depends(get_db)):
    return db.query(JobApplication).all()

@router.post("/", response_model=JobApplicationResponse)
def create_application(
    application: JobApplicationCreate,
    db:Session = Depends(get_db)
    ):
    new_app = JobApplication(**application.model_dump())
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

@router.get("/{app_id}", response_model=JobApplicationResponse)
def get_application(app_id: int, db:Session = Depends(get_db)):
    app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.patch("/{app_id}", response_model=JobApplicationResponse)
def update_application(
    app_id : int,
    updates: JobApplicationUpdate,
    db: Session = Depends(get_db)
):
    app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    update_data = updates.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(app, field, value)
    db.commit()
    db.refresh(app)
    return app

@router.delete("/{app_id}")
def delete_application(app_id: int, db: Session = Depends(get_db)):
   app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
   if not app:
       raise HTTPException(status_code=404, detail="Application not found")
   db.delete(app)
   db.commit()
   return {"message": "Deleted successfully"}