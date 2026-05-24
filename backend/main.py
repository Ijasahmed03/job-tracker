# main.py - the entry point, whata you run from the terminal

from tracker import add_application, list_applications

def main():
    print("Job Tracker CLI")
    print("----------------")
    print("1. Add application")
    print("2. List applications")
    print("3. Exit")

    choice = input("\nChoose an option: ")

    if choice == "1":
        company = input("Company name: ")
        role = input("Role/Position: ")
        status = input("Status (applied/interview/offer/rejected): ")
        date_applied = input("Date applied (DD-MM-YYYY): ")
        notes = input("Notes (optional, press Enter to skip): ")
        add_application(company, role, status, date_applied, notes)

    elif choice == "2":
        list_applications()

    elif choice == "3":
        print("Goodbye!")

    else:
        print("Invalid option.")

if __name__ == "__main__":
    main()