# Tasky

This is a Task Management Backend built with NestJS and Clean Architecture.

## Architecture

The project follows Clean Architecture principles:
- **Domain Layer**: Contains entities (`Task`, `User`) and repository interfaces. It's the core of the application and has no external dependencies.
- **Application Layer**: Contains Use Cases that implement business logic by coordinating domain entities and repositories.
- **Infrastructure Layer**: Implements repository interfaces using Prisma and handle external concerns like the database (SQLite) and Docker.
- **Presentation Layer**: Contains REST controllers and DTOs that expose the API.

## Tech Stack
- **Framework**: NestJS
- **ORM**: Prisma (SQLite)
- **Validation**: Class-validator
- **Documentation**: Swagger
- **Containerization**: Docker

## Getting Started

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Setup environment variables:
   ```bash
   cp .env.example .env
   ```
3. Initialize database and run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Seed the database with initial data:
   ```bash
   npx prisma db seed
   ```
5. Start the server:
   ```bash
   npm run start:dev
   ```
4. Access Swagger API documentation at `http://localhost:3000/api`.

### Docker
Start the server using Docker Compose:
```bash
docker-compose up --build
```

## Assumptions
- Uses SQLite for simplicity and ease of setup.
- Assumes `uuid` for unique identifiers.
- Basic user management is included to allow task assignment.

---
