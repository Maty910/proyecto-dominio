# Proyecto Dominio — Sistema de Reservas de hotel con Arquitectura Limpia

Este proyecto implementa un sistema de gestión de reservas de hotel, siguiendo principios de arquitectura limpia (Clean Architecture) y Test-Driven Design (TDD).
El foco está en la separación de capas, la testabilidad y la independencia del dominio respecto a frameworks o infraestructura externa.

# Arquitectura y Tecnologías

El proyecto se divide en dos capas principales:

domain/ → Contiene toda la lógica de negocio (entidades, casos de uso, repositorios en memoria, errores de dominio y serivicios).

Sin dependencias externas, completamente testeable.

apps/backend/ → Capa de infraestructura con Express.js, que expone los casos de uso como endpoints REST.

# Stack técnico:

Node.js + TypeScript

Express.js

bcrypt.js (hashing de contraseñas)

jsonwebtoken (autenticación JWT)

TDD con Vitest

Clean Architecture

# Estructura del repositorio
proyecto-dominio/ <br>
├── domain/ <br>
│   ├── src/ <br>
│   │   ├── entities/ <br>
│   │   ├── services/ <br>
│   │   ├── use-cases/ <br>
│   │   ├── errors/ <br>
│   │   └── tests/ <br>
├── apps/ <br>
│   └── backend/ <br>
│       ├── src/ <br>
│       │   ├── routes/ <br>
│       │   ├── middlewares/ <br>
│       │   └── index.ts <br>
├── package.json <br>
└── README.md <br>

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
Se ultilizó Postman para probar todos los endpoints

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

# Reflexiones 

Durante el proceso de desarrollo, aplicar **arquitectura limpia** y **TDD (Test Driven Development)** me ayudó a tener el código más ordenado, con responsabilidades bien separadas y fácil de extender. Al principio me costó acostumbrarme a esta nueva manera de pensar, primero los tests y luego la implementación. Pero con la práctica empece a notar que me daba más seguridad al aplicar cambios o refactorizar. 

Algo que me fue difícil fue definir los límites entre las capas y entender qué debía ir en cada una. Me resultó difícil decidir donde ubicar cierta lógica pero me ayudé con las clases y el material de las mismas.

Después tuve cierta dificultad con el manejo de la autenticación con JWT y probar los endpoints en Postman. Pero pude resolverlo y repasé como gestionar la seguridad de la API y proteger endpoints.

Cuando creí que había terminado, me dí cuenta que me falta probar el rol de admin en Postman. Lo probé sin problemas y repasé la lógica que implementé. Me dí cuenta que puedo agregar nuevas funcionalidades sin romper nada y de manera segura. TDD ayuda mucho a eso. Me deja tranquilo ver los tests pasar al agregar una nueva funcionalidad o una refactorización.
