# Barbershop-Appointments-Management

A full-stack CRUD web application for managing **barbershop services and appointments**.  
Built as a **university project**, it demonstrates modern web app design — authentication, service management, scheduling, and testing — using a clean architecture and dependency injection.

---

## Project Summary

Barbershop VT enables both **users** and **admins** to manage appointments easily:
- **Users** can register, log in, view available services, and book appointments.  
- **Admins** can create, edit, and delete services, view and manage appointments (confirm or cancel).

Both backend and frontend are fully implemented:
- **Backend:** Node.js + Express + Prisma + Awilix (Dependency Injection)  
- **Frontend:** React + Vite + TailwindCSS + Axios + React Router  
- **Database:** SQLite (Prisma ORM)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Validation:** Express-Validator  
- **Testing:** Jest (integration tests) + Postman API collection  

---

## Tech Stack

**Frontend** -> React (Vite), React Router, Axios, TailwindCSS, Framer Motion 
**Backend** -> Node.js, Express.js, Awilix (DI), Prisma ORM 
**Database** -> SQLite
**Testing** -> Jest (Integration) & Postman (E2E) |

---

## Project Structure

### Backend (`/barber-backend`)
src:
- app.js # Express app with DI setup (Awilix)
- index.js # Entry point, Port for server
- container.js # Awilix dependency container
- routes/ # All Express routes
- controllers/ # Controllers (no direct service imports)
- services/ # Business logic
- repositories/ # Database access (via Prisma)
- validators/ # express-validator rules
- prisma/ # Prisma schema & migrations
- tests/ # Jest integration tests

### Frontend (`/`)
src/
- postman/ # Exported collection from postman + test results
- screenshots/ # Screenshots of working website
- components/ # Reusable UI components (Navbar, Footer)
- context/ # AuthContext (login/register state)
- pages/ # Pages (Home, Services, Appointments, Login, Register, ServiceForm)
- services/ # Axios setup
- App.jsx, main.jsx # Router + layout
- index.css # TailwindCSS

---

## How to Run the Project

### Setup & Run the Backend

cd barber-backend

npm install

.env file {
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your_secret_key"
    PORT=4000
}

npx prisma migrate dev

npm run dev

### Setup & Run the Frontend

npm install

npm run dev

## Screenshots

### No user logged in
<img width="1900" height="906" alt="No User-Home1" src="https://github.com/user-attachments/assets/397320b8-de29-4c30-97e8-d8b318a3c55a" />
<img width="1903" height="906" alt="No User-Home2" src="https://github.com/user-attachments/assets/b447f16d-a3bb-410f-82af-43aad0fd5f6a" />
<img width="1903" height="908" alt="No User-Home3" src="https://github.com/user-attachments/assets/3901fc50-e11e-4069-a4d1-772103eb8506" />
<img width="1916" height="909" alt="No User-Services" src="https://github.com/user-attachments/assets/ec4c4b3a-09b7-4bc5-90a8-542321ca5981" />

### Register
<img width="1902" height="906" alt="Register" src="https://github.com/user-attachments/assets/bf0420cc-0646-4488-b8ab-ed13d3344e9a" />

### Login
<img width="1903" height="906" alt="Login" src="https://github.com/user-attachments/assets/f62159a5-5034-408e-8b47-789b6c5cda4a" />

### Admin logged in
<img width="1904" height="911" alt="Admin-Home1" src="https://github.com/user-attachments/assets/046ba795-b385-4e24-97d9-5a27737aeb75" />
<img width="1902" height="911" alt="Admin-Home2" src="https://github.com/user-attachments/assets/ee869fcc-f71e-4390-b070-ae8585916c97" />
<img width="1916" height="909" alt="Admin-Services" src="https://github.com/user-attachments/assets/fae16377-6e23-47c8-b50c-12bd6a76d298" />
<img width="1919" height="914" alt="Admin-Edit service" src="https://github.com/user-attachments/assets/7451e3e3-3b22-4a09-aa13-981744402ba5" />
<img width="1913" height="909" alt="Admin-Add service" src="https://github.com/user-attachments/assets/7f6bdc4b-6a1d-4de0-8ec0-b261413d73d0" />
<img width="1901" height="912" alt="Admin-Appointments" src="https://github.com/user-attachments/assets/919da12b-7583-479d-8ba4-7c39210145ad" />

### User logged in
<img width="1903" height="910" alt="User-Home" src="https://github.com/user-attachments/assets/71bd3235-389d-4e80-a1a4-a65b09b25d06" />
<img width="1913" height="909" alt="User-Services" src="https://github.com/user-attachments/assets/18d4bcc1-fcdf-4f13-a80d-e14847da5596" />
<img width="1902" height="907" alt="User-Appointments" src="https://github.com/user-attachments/assets/d65e6dee-e4a4-408c-96f5-33a9cd11182e" />
