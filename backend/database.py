# database.py - handles reading and writing to our JSON file
#Later we'll swap this for real database, same interface

import json
import os
from typing import List

DATA_FILE = "applications.json"

def read_db() -> List[dict]:
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)
    
def write_db(data: List[dict]):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

def get_next_id() -> int:
    data = read_db()
    if not data:
        return 1
    ids = [item["id"] for item in data if "id" in item]
    if not ids:
        return 1
    return max(ids) + 1