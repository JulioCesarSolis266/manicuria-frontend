📘 README — Frontend

Appointment Management System — Web Client

Frontend application developed with React to consume the REST API of the appointment management system.

🌐 Live Demo
https://nagatosoft-turnos.vercel.app/

📖 Project Overview

This application is the frontend client of an appointment management system designed for small service businesses.
It allows administrators to manage users, clients, services, and appointments through a secure interface with role-based access.

🛠️ Tech Stack

React
Vite
Tailwind CSS
React Router

State Management
React Context API

API Communication
Fetch API

🏗️ Architecture

Simplified structure:

```
src/
|── assets/         # Static assets
│── components/     # Reusable components
│── config/         # Configuration (API URL, constants)
│── context/        # Context API (global state, auth)
│── hooks/          # Custom hooks
│── pages/          # Main views
│── services/       # API communication
│── App.jsx         # Route definitions
│── index.css       # Global styles
└── main.jsx        # Entry point
index.html          # Vite base template
```

🔐 Authentication

Login using credentials

Receiving JWT from the backend

Session persistence

Private route protection

📦 Features

Full CRUD for:

Users

Clients

Services

Appointments

Role-based system:

Admin: manages users.

User: manages clients, services and appointments

Responsive interface

Forms with validations

State management and protected navigation

🌐 Environment Variables

VITE_API_URL=

⚙️ Local Installation

git clone https://github.com/JulioCesarSolis266/manicuria-frontend

cd frontend

npm install

npm run dev

🚀 Deploy

Vercel

🔮 Future Improvements

Refactor to TypeScript

Better organization of responsibilities

Tailwind styles optimization

Improved user experience

Backend repository:
https://github.com/JulioCesarSolis266/manicuria-backend
