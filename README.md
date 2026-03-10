📘 README — Frontend

Appointment Management System — Web Client

Frontend application developed with React to consume the REST API of the appointment management system.

🛠️ Tech Stack

React

Vite

Tailwind CSS

React Router

Fetch API

🏗️ Arquitecture

Simplified structure:

```
src/
|── assets/         # Static assets
│── components/     # Reusable components
│── config/         # Configuration (API URL, constants)
│── context/        # Context API (global state, auth)
│── hooks/          # Custom hooks
│── pages/          # Main viewa
│── services/       # API comunication
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

Clients

Services

Appointments

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
