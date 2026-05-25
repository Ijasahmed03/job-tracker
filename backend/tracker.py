#tracker.py - handles saving and loading job applications

import json
import os
from models import JobApplication

DATA_FILE = "applications.json"

def load_applications():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return data

def save_applications(applications):
    with open(DATA_FILE, "w") as f:
        json.dump(applications, f, indent=2)

def add_application(company, role, status, date_applied, notes=""):
    applications = load_applications()
    new_app = {
        "company": company,
        "role": role,
        "status": status,
        "date_applied": date_applied,
        "notes": notes
    }
    applications.append(new_app)
    save_applications(applications)
    print(f"Added: {role} at {company}")

def list_applications(status_filter = None):
    applications = load_applications()
    if not applications:
        print("No applications yet.")
        return
    for i, app in enumerate(applications, 1):
        if status_filter and app['status'] != status_filter:
            continue
        print(f"{i}. {app['role']} at {app['company']} - {app['status']} ({app['date_applied']})")