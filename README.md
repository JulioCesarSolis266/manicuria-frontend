📘 README — Frontend

Sistema de Gestión de Turnos — Cliente Web

Aplicación frontend desarrollada en React para consumir la API REST del sistema de gestión de turnos.

🛠️ Stack Tecnológico

React

Vite

Tailwind CSS

React Router

Fetch API

🏗️ Arquitectura

Estructura simplificada:

```
src/
|── assets/         # Recursos estáticos
│── components/     # Componentes reutilizables
│── config/         # Configuración (API URL, constantes)
│── context/        # Context API (estado global, auth)
│── hooks/          # Custom hooks
│── pages/          # Vistas principales
│── services/       # Comunicación con la API
│── App.jsx         # Definición de rutas
│── index.css       # Estilos globales
└── main.jsx        # Punto de entrada
index.html          # Template base de Vite
```

🔐 Autenticación

Login mediante credenciales

Recepción de JWT desde backend

Persistencia de sesión

Protección de rutas privadas

📦 Funcionalidades

CRUD completo de:

Clientes

Servicios

Turnos

Interfaz responsive

Formularios con validaciones

Manejo de estados y navegación protegida

🌐 Variables de Entorno

VITE_API_URL=

⚙️ Instalación Local

git clone <https://github.com/JulioCesarSolis266/manicuria-frontend>

cd frontend

npm install

npm run dev

🚀 Deploy

Vercel

🔮 Mejoras Futuras

Refactor a TypeScript

Mejor organización de responsabilidades

Optimización de estilos Tailwind

Mejora en experiencia de usuario

Repositorio del backend <https://github.com/JulioCesarSolis266/manicuria-backend>
