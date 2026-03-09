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

<img width="1918" height="906" alt="No User-Home1" src="https://github.com/user-attachments/assets/ac3a31fe-bdc2-49d4-a87f-ea8e20d551c5" />
<img width="1917" height="908" alt="No User-Services" src="https://github.com/user-attachments/assets/16b5387f-29a9-46bb-9437-6c7dcf9c71d2" />

### Register
<img width="1919" height="909" alt="Register" src="https://github.com/user-attachments/assets/f88bd45c-3135-40ef-9f9d-64cdc982c621" />


### Login
<img width="1918" height="909" alt="Login" src="https://github.com/user-attachments/assets/ffd446d2-926c-480b-81b9-efca9f514bd2" />


### Admin logged in

<img width="1918" height="907" alt="Admin-Home1" src="https://github.com/user-attachments/assets/06664b86-691a-4a3d-b927-d43427edc8c6" />
<img width="1918" height="910" alt="Admin-Home2" src="https://github.com/user-attachments/assets/4caf0c00-512e-4ec3-8e15-e29aafac919f" />
<img width="1918" height="906" alt="Admin-Services" src="https://github.com/user-attachments/assets/ac908ec4-1f58-4f44-b842-0af9d93e2996" />
<img width="1919" height="909" alt="Admin-Edit service" src="https://github.com/user-attachments/assets/3cc9c7e3-5409-46bf-8eb2-c3ac15b8a5bb" />
<img width="1919" height="904" alt="Admin-Add service" src="https://github.com/user-attachments/assets/adcadcb0-6620-4d9d-bbbf-e2c16b352a64" />
<img width="1918" height="907" alt="Admin-Appointments" src="https://github.com/user-attachments/assets/1d8add2f-0d08-46ea-9bc7-2f16f08debe9" />




### User logged in
<img width="1919" height="905" alt="User-Home" src="https://github.com/user-attachments/assets/9315828b-6e5b-4695-9a68-17cfd9422cba" />
<img width="1918" height="908" alt="User-Services" src="https://github.com/user-attachments/assets/2a905f23-0cc7-44e6-90c4-9ec88f2ed1ad" />
<img width="1919" height="908" alt="User-Appointments" src="https://github.com/user-attachments/assets/d99da07a-d7b4-4155-8ea7-64204d49d02e" />

