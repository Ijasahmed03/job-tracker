# main.py - the entry point, whata you run from the terminal creates the FastAPI app and connects all the routes
#from tracker import add_application, list_applications
from fastapi import FastAPI
from applications import router as applications_router

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



# def main():
#     print("Job Tracker CLI")
#     print("----------------")
#     print("1. Add application")
#     print("2. List applications")
#     print("3. List by status")
#     print("4. Exit")

#     choice = input("\nChoose an option: ")

#     if choice == "1":
#         company = input("Company name: ")
#         role = input("Role/Position: ")
#         status = input("Status (applied/interview/offer/rejected): ")
#         date_applied = input("Date applied (DD-MM-YYYY): ")
#         notes = input("Notes (optional, press Enter to skip): ")
#         add_application(company, role, status, date_applied, notes)

#     elif choice == "2":
#         list_applications()

#     elif choice == "3":
#        status = input("Filter by status (applied/interview/offer/rejected): ")
#        list_applications(status_filter=status)

#     elif choice == "4":
#         print("Goodbye!")

#     else:
#         print("Invalid option.")

# if __name__ == "__main__":
#     main()