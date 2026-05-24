# models.py - defines what a job application looks like

from dataclasses import dataclass
from datetime import datetime

@dataclass
class JobApplication:
    company: str
    role: str
    status: str
    date_applied: str
    notes: str = ""
