# Proyecto Dominio — Sistema de Reservas con Arquitectura Limpia

Este proyecto implementa un sistema de gestión de reservas de hotel, siguiendo principios de arquitectura limpia (Clean Architecture) y Domain-Driven Design (DDD).
El foco está en la separación de capas, la testabilidad y la independencia del dominio respecto a frameworks o infraestructura externa.

# Arquitectura y Tecnologías

El proyecto se divide en dos capas principales:

domain/ → Contiene toda la lógica de negocio (entidades, casos de uso, repositorios en memoria, errores de dominio, etc).

Sin dependencias externas, completamente testeable.

apps/backend/ → Capa de infraestructura con Express.js, que expone los casos de uso como endpoints REST.

Stack técnico:

Node.js + TypeScript

Express.js

bcrypt.js (hashing de contraseñas)

jsonwebtoken (autenticación JWT)

TDD con Jest

Clean Architecture + DDD

# Estructura del repositorio
proyecto-dominio/
├── domain/
│   ├── src/
│   │   ├── entities/
│   │   ├── services/
│   │   ├── use-cases/
│   │   ├── errors/
│   │   └── tests/
├── apps/
│   └── backend/
│       ├── src/
│       │   ├── routes/
│       │   ├── middlewares/
│       │   └── index.ts
├── package.json
└── README.md

# Instalación y ejecución
1. Clonar el repositorio
git clone https://github.com/Maty910/proyecto-dominio.git
cd proyecto-dominio

2. Instalar dependencias
npm install

3. Compilar (si usás TypeScript)
npm run build

4. Ejecutar el backend
npm run dev


El servidor se levanta en:

http://localhost:3000

# Autenticación (JWT)

La autenticación se maneja mediante JSON Web Tokens (JWT).
Cada usuario debe registrarse y luego autenticarse para obtener un token.
Ese token se incluye en los headers de las peticiones protegidas:


El middleware authMiddleware valida el token y añade el usuario autenticado a req.user.

# Casos de uso principales

RegisterUserUseCase: Registra un nuevo usuario con contraseña hasheada.

AuthenticateUserUseCase: Valida credenciales y genera un JWT.

CreateReservationUseCase: Crea una reserva si las fechas son válidas y no se solapan.

UpdateReservationUseCase: Actualiza completamente una reserva existente.

PatchReservationUseCase: Actualiza parcialmente una reserva.

GetReservationsByRoomUseCase: Lista reservas por habitación.

DeleteReservation: Permite eliminar reservas (solo admin o dueño).

# Endpoints principales
## Autenticación

### POST /auth/register

{
  "email": "user@example.com",
  "password": "123456",
  "role": "admin"
}


### POST /auth/login

{
  "email": "user@example.com",
  "password": "123456"
}


## Response

{
  "token": "jwt_token"
}

## Reservas

### GET /reservations

Requiere token

### POST /reservations

{
  "id": "1",
  "roomId": "101",
  "checkInDate": "2025-10-21",
  "checkOutDate": "2025-10-25",
  "status": "confirmed"
}


### PATCH /reservations/:id

{
  "status": "cancelled"
}


### DELETE /reservations/:id

Solo admin o dueño de la reserva.

# Decisiones técnicas y aprendizajes

Se priorizó la independencia del dominio, evitando dependencias directas con Express o JWT en la lógica de negocio.

Se aplicó TDD en los casos de uso del dominio.

Se optó por un repositorio en memoria para simplificar las pruebas, manteniendo la interfaz UserRepository y ReservationRepository listas para una futura integración con bases de datos reales.

El enfoque permitió separar claramente las reglas de negocio del entorno técnico, cumpliendo los principios de Clean Architecture.
