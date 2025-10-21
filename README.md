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
- index.js # Entry point
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