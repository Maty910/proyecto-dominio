# Proyecto Dominio, Backend y Frontend — Sistema de Reservas de hotel con Arquitectura Limpia

Este proyecto implementa un sistema full-stack de gestión de reservas de hotel, siguiendo principios de arquitectura limpia (Clean Architecture) y Test-Driven Development (TDD). El foco está en la separación de capas, la testabilidad y la independencia del dominio respecto a frameworks o infraestructura externa. Se usó Tailwind para los estilos.

## Estructura del Proyecto

El proyecto se divide en tres capas principales:

**domain/** → Contiene toda la lógica de negocio (entidades, casos de uso, repositorios en memoria, errores de dominio y servicios).
- Sin dependencias externas, completamente testeable.

**apps/backend/** → Capa de infraestructura con Express.js, que expone los casos de uso como endpoints REST.

**apps/frontend/** → Interfaz de usuario con React + Vite que consume la API del backend.

## Tecnologías Utilizadas

### Backend
- Node.js + TypeScript
- Express.js
- bcrypt.js (hashing de contraseñas)
- jsonwebtoken (autenticación JWT)
- Vitest (testing)

### Frontend
- React 18
- Vite
- TypeScript
- Storybook (Visual TDD)
- Vitest + React Testing Library

### Principios Aplicados
- Clean Architecture
- Test-Driven Development (TDD)
- SOLID principles

## Arquitectura

```
proyecto-dominio/
├── domain/
│   ├── src/
│   │   ├── entities/
│   │   ├── services/
│   │   ├── use-cases/
│   │   ├── errors/
│   │   └── tests/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── middlewares/
│   │   │   └── index.ts
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── stories/
│       │   └── types/
│       └── .storybook/
├── package.json
└── README.md
```

## Instalación

**Prerrequisitos:**
- Node.js v16 o superior
- pnpm

**1. Clonar el repositorio**
```bash
git clone https://github.com/Maty910/proyecto-dominio.git
cd proyecto-dominio
```

**2. Instalar dependencias**
```bash
pnpm install
```

## Ejecutar el Proyecto

### Backend

```bash
# Modo desarrollo
pnpm run dev:backend

# El servidor se levanta en: http://localhost:3000
```

### Frontend

```bash
# Modo desarrollo
pnpm run dev:frontend

# La aplicación se levanta en: http://localhost:5173
```

### Storybook (Visual TDD)

```bash
# Ejecutar Storybook
pnpm run storybook

# Storybook se ejecuta en: http://localhost:6006
```

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

La autenticación se maneja mediante JSON Web Tokens (JWT). Cada usuario debe registrarse y luego autenticarse para obtener un token. Ese token se incluye en los headers de las peticiones protegidas:

```
Authorization: Bearer <token>
```

El middleware `authMiddleware` valida el token y añade el usuario autenticado a `req.user`.

### Roles de Usuario

**user**: Puede gestionar sus propias reservas.

**admin**: Puede gestionar todas las reservas del sistema.

## Casos de Uso

### Autenticación
- **RegisterUserUseCase**: Registra un nuevo usuario con contraseña hasheada.
- **AuthenticateUserUseCase**: Valida credenciales y genera un JWT.

### Gestión de Reservas
- **CreateReservationUseCase**: Crea una reserva si las fechas son válidas y no se solapan.
- **UpdateReservationUseCase**: Actualiza completamente una reserva existente.
- **PatchReservationUseCase**: Actualiza parcialmente una reserva.
- **GetReservationsByRoomUseCase**: Lista reservas por habitación.
- **DeleteReservationUseCase**: Permite eliminar reservas (solo admin o dueño).

## Características del Frontend

- Sistema de autenticación completo (registro, login, gestión de sesión)
- CRUD completo de reservas
- Validación de fechas y solapamientos
- Componentes documentados en Storybook
- Diseño responsive
- Arquitectura limpia con separación de responsabilidades

## Flujo de Comunicación

```
Frontend (React) → API Services → HTTP/REST → Backend (Express) → Use Cases → Domain Logic
```

El frontend se comunica con el backend mediante servicios HTTP que consumen los endpoints REST.

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

## Decisiones de Diseño

**Independencia del Dominio**
Se priorizó la independencia del dominio, evitando dependencias directas con Express, React o JWT en la lógica de negocio.

**Repositorios en Memoria**
Se optó por repositorios en memoria para simplificar las pruebas, manteniendo las interfaces `UserRepository` y `ReservationRepository` listas para una futura integración con bases de datos reales.

**Visual TDD con Storybook**
Se implementó Storybook para desarrollar componentes de forma aislada, permitiendo documentación visual automática y testing de estados y variantes antes de la integración.

**Separación Frontend/Backend**
El frontend y backend se ejecutan de forma independiente en puertos diferentes, permitiendo desarrollo paralelo y facilitando el escalado.

El enfoque permitió separar claramente las reglas de negocio del entorno técnico, cumpliendo los principios de Clean Architecture.

# Reflexiones 

Durante el proceso de desarrollo, aplicar **arquitectura limpia** y **TDD (Test Driven Development)** me ayudó a tener el código más ordenado, con responsabilidades bien separadas y fácil de extender. Al principio me costó acostumbrarme a esta nueva manera de pensar, primero los tests y luego la implementación. Pero con la práctica empece a notar que me daba más seguridad al aplicar cambios o refactorizar. 

Algo que me fue difícil fue definir los límites entre las capas y entender qué debía ir en cada una. Me resultó difícil decidir donde ubicar cierta lógica pero me ayudé con las clases y el material de las mismas.

Después tuve cierta dificultad con el manejo de la autenticación con JWT y probar los endpoints en Postman. Pero pude resolverlo y repasé como gestionar la seguridad de la API y proteger endpoints.

Cuando creí que había terminado, me dí cuenta que me falta probar el rol de admin en Postman. Lo probé sin problemas y repasé la lógica que implementé. Me dí cuenta que puedo agregar nuevas funcionalidades sin romper nada y de manera segura. TDD ayuda mucho a eso. Me deja tranquilo ver los tests pasar al agregar una nueva funcionalidad o una refactorización.

En cuanto al frontend, me gustó mucho usar storybook. Tuve dificultades para hacerlo funcionar al comienzo ya que era la primera vez que lo utilizaba. Pero al final me pareció una herramienta muy útil y cómoda de usar

## Autor

**Matías** - [@Maty910](https://github.com/Maty910)
