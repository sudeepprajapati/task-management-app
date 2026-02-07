# Task Management Web Application

A modern full-stack **Task Management Web Application** built as part of a **Full Stack Development Internship Skill Assessment**.

The application allows users to **register, log in, and manage their own tasks** securely with a clean, modern UI inspired by Vercel-style design principles.

---

## Features

### Core Features
- User authentication (Register & Login)
- Create, view, update, and delete tasks
- Task fields:
  - Title
  - Description
  - Status (Pending / In-Progress / Completed)
- User-specific task management (users can only access their own tasks)
- Responsive and modern dark UI

### Bonus Features
- JWT-based authentication
- Protected API routes
- Edit task page
- Modern UI system built with Tailwind CSS (no UI libraries)
- Clean API response & error handling structure

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS v4.1
- Context API for authentication
- Fetch API for server communication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)

### Database
- MongoDB (MongoDB Atlas)

---

## Authentication Flow

- Users register and log in using email and password
- On successful login, a JWT token is returned
- The token is stored on the client and sent with every protected request
- Backend middleware verifies the token and attaches the user context
- All task operations are scoped to the authenticated user

---

## 🔗 API Endpoints

### Auth

## 🔐 Authentication Flow

- Users register and log in using email and password
- On successful login, a JWT token is returned
- The token is stored on the client and sent with every protected request
- Backend middleware verifies the token and attaches the user context
- All task operations are scoped to the authenticated user

---
## 🔗 API Endpoints

### Auth

- **POST** `/api/auth/register` → Register a new user  
- **POST** `/api/auth/login` → Login user  

---

### Tasks (Protected)

- **GET** `/api/tasks` → Get all user tasks  
- **POST** `/api/tasks` → Create a new task  
- **GET** `/api/tasks/:id` → Get a single task  
- **PUT** `/api/tasks/:id` → Update a task  
- **DELETE** `/api/tasks/:id` → Delete a task  

---

## ⚙️ Setup Instructions (Local)

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)

---

### Backend Setup

```bash
cd backend
npm install

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- MongoDB (local instance or MongoDB Atlas)

---

Create a `.env` file inside the `backend` folder and add the following:

```env
PORT=3000
MONGODB_URI=mongodb_connection_string
JWT_SECRET=devsecret

The backend API will be available at:

--- 
### Frontend Setup

Navigate to the frontend directory and install dependencies:

cd frontend
npm install
Create a .env file inside the frontend folder and add:

```env
VITE_API_URL=http://localhost:3000/api

Start the frontend application:

npm run dev
The frontend will run at:

http://localhost:5173