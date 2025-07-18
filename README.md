# 🩺 MediTrack Backend (NestJS)

This is the backend service for the MediTrack Admin Dashboard, built using **NestJS**. It provides RESTful APIs to manage patients, medications, and their treatment assignments.

---

## 🚀 Backend Features (NestJS)

### ✅ Scalable Architecture & Folder Structure
Used a clean and modular folder structure including:

- `controllers/`
- `services/`
- `DTOs/`
- `common/`
- `utils/`
- `types/`

Followed consistent and descriptive naming conventions across the codebase.

---

### ✅ CRUD APIs
Implemented full CRUD operations for the following entities:

- **Patients**: name, date of birth
- **Medications**: name, dosage, frequency
- **Assignments**: assign medication to patient with start date and number of days

---

### ✅ Custom Treatment Logic
Created a reusable utility function `calculateRemainingDays` in the `utils` folder.

- Helps maintain cleaner code and avoids repetition throughout the application.

---

### ✅ Validations
Used `class-validator` to ensure:

- Required fields are present  
- Proper date formats are used  
- Duplicate medication entries are prevented  
- Prevents assigning the same active medication to a patient more than once  

---

### ✅ Error Handling
- Added a global exception filter to handle and format all API errors consistently.

---

### ✅ Unit Testing
- Wrote unit tests to verify the treatment calculation logic.  
- Covered all possible cases and edge scenarios to ensure correctness.



## 🗃️ Database: SQLite

This project uses **SQLite** as a lightweight and file-based relational database. It's ideal for local development and quick deployments without needing a full database server.


---






## 🛠️ Getting Started

### 1. Clone the Repository


git clone https://github.com/your-username/meditrack-backend.git
cd mediTrack_Backend

Install Dependencies
npm install



Environment Setup
Create a .env file at the root of the project:
PORT=8080


Run the Server
npm run start:dev


Running Tests
npm run test