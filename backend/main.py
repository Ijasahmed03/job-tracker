# main.py - the entry point, whata you run from the terminal creates the FastAPI app and connects all the routes
# create database tables and registers all routes
from fastapi import FastAPI
from applications import router as applications_router
from database import engine, Base

Base.metadata.create_all(bind = engine)

app = FastAPI(
    title="Job Tracker API",
    description="Track your job applications",
    version="1.0.0"
)

app.include_router(
    applications_router,
    prefix="/applications",
    tags=["applications"]
)

@app.get("/")
def root():
    return {"message": "Job Tracker API is runnning"}



