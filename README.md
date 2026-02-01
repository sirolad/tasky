# Tasky - Task Management API

A robust task management backend built with **NestJS**, adhering to **Clean Architecture** principles.

## 🏗️ Architecture

The project is structured into layers to ensure separation of concerns and maintainability:

*   **Domain** (`src/domain/`): Core business logic, entities (`Task`, `User`), and repository interfaces. No external dependencies.
    *   `entities/` - Domain models with business rules
    *   `repositories/` - Repository interfaces (implementation-agnostic)

*   **Application** (`src/application/`): Use cases that coordinate domain logic and infrastructure.
    *   `use-cases/task/` - Task-related use cases (CreateTask, UpdateTask, DeleteTask, etc.)
    *   `use-cases/user/` - User-related use cases (CreateUser, ListUsers)

*   **Infrastructure** (`src/infrastructure/`): Technical implementations and external concerns.
    *   `repositories/` - Prisma-based repository implementations
    *   `filters/` - Global exception filters
    *   `interceptors/` - Response transformation interceptors
    *   `prisma/` - Database service and configuration

*   **Presentation** (`src/presentation/`): HTTP layer with REST API endpoints.
    *   `controllers/` - REST API controllers (TaskController, UserController)
    *   `dtos/task/` - Task-related Data Transfer Objects
    *   `dtos/user/` - User-related Data Transfer Objects

## �️ Tech Stack

*   **Framework**: NestJS (TypeScript)
*   **ORM**: Prisma
*   **Database**: SQLite
*   **Validation**: Class-validator & Class-transformer
*   **API Docs**: Swagger / OpenAPI 3.0
*   **Containerization**: Docker & Docker Compose

## �🚀 Key Features

*   **Clean Architecture**: Deep separation between business rules and technical implementation.
*   **API Versioning**: Global URI-based versioning (defaulting to `/v1`).
*   **Global Response Envelope**: All successful responses are wrapped in a `{ data: ... }` object via a global interceptor.
*   **Relational Data**: Tasks automatically include assigned user details where applicable.
*   **Dynamic Exception Filter**: Unified error handling mapping Prisma errors and HttpExceptions to clear, standardized responses.
*   **Swagger Docs**: Comprehensive API documentation with DTO examples.

## 🛠️ Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm

### Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment**:
    ```bash
    cp .env.example .env
    ```
3.  **Database (SQLite)**:
    Initialize and run migrations:
    ```bash
    npx prisma migrate dev
    ```
4.  **Seed Data**:
    ```bash
    npx prisma db seed
    ```
5.  **Run Application**:
    ```bash
    npm run start:dev
    ```

### 🐳 Docker Setup

Run the entire stack using Docker Compose:

```bash
docker-compose up --build
```
The API will be available at `http://localhost:3000/v1` and Swagger at `http://localhost:3000/api`.

## 🧪 Testing

The project includes a comprehensive test suite covering unit and integration scenarios:

*   **Unit Tests**: `npm run test`
*   **E2E Tests**: `npm run test:e2e` (Integrated flow for tasks and assignments)
*   **Test Coverage**: `npm run test:cov`
*   **Watch Mode**: `npm run test:watch`

### Test Coverage
*   Domain entities with business logic validation
*   Use cases for task and user operations
*   Global exception filter
*   End-to-end API flows

## 📁 Project Structure

```
tasky/
├── src/
│   ├── domain/
│   │   ├── entities/        # Task, User domain models
│   │   └── repositories/    # Repository interfaces
│   ├── application/
│   │   └── use-cases/       # Business logic orchestration
│   │       ├── task/        # Task-related use cases
│   │       └── user/        # User-related use cases
│   ├── infrastructure/
│   │   ├── repositories/    # Prisma implementations
│   │   ├── filters/         # Exception handling
│   │   ├── interceptors/    # Response transformation
│   │   └── prisma/          # Database service
│   └── presentation/
│       ├── controllers/     # REST API controllers
│       └── dtos/            # Data Transfer Objects
│           ├── task/        # Task DTOs
│           └── user/        # User DTOs
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # Database migrations
│   └── seed.ts              # Seed data script
└── test/                    # E2E tests
```

## 📖 API Documentation

Once the application is running, access the interactive Swagger documentation at:
[http://localhost:3000/api](http://localhost:3000/api)

### Available Endpoints

**Tasks** (`/v1/tasks`)
*   `POST /v1/tasks` - Create a new task
*   `GET /v1/tasks` - List all tasks (with optional filtering by status and assignee)
*   `GET /v1/tasks/:id` - Get a specific task by ID
*   `PATCH /v1/tasks/:id` - Update a task (title, description, or status)
*   `DELETE /v1/tasks/:id` - Delete a task
*   `POST /v1/tasks/:id/assign/:userId` - Assign a user to a task

**Users** (`/v1/users`)
*   `POST /v1/users` - Create a new user
*   `GET /v1/users` - List all users

### Example Requests

**Create a Task**
```bash
curl -X POST http://localhost:3000/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement Authentication",
    "description": "Add JWT-based authentication",
    "assignedToId": "user-uuid-here"
  }'
```

**List Tasks with Filters**
```bash
curl "http://localhost:3000/v1/tasks?status=IN_PROGRESS&assignedToId=user-uuid-here"
```

**Create a User**
```bash
curl -X POST http://localhost:3000/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com"
  }'
```

### Response Format

All successful responses are wrapped in a standardized envelope:
```json
{
  "data": {
    "id": "uuid",
    "title": "Task title",
    ...
  }
}
```

## 🛠️ Development Commands

*   `npm run start:dev` - Start development server with hot-reload
*   `npm run start:debug` - Start with debug mode
*   `npm run build` - Build for production
*   `npm run start:prod` - Run production build
*   `npm run lint` - Run ESLint
*   `npm run format` - Format code with Prettier
*   `npm run test` - Run unit tests
*   `npm run test:e2e` - Run end-to-end tests
*   `npm run test:cov` - Generate test coverage report
*   `npm run depcruise` - Validate Clean Architecture boundaries
*   `npm run depcruise:archi` - Generate architecture diagram (requires Graphviz)

## 🏛️ Architecture Validation

This project enforces **Clean Architecture** principles using dependency-cruiser. The architecture boundaries are automatically validated to ensure:

- ✅ Domain layer remains pure (no external dependencies)
- ✅ Application layer only depends on Domain
- ✅ Presentation layer doesn't directly access Infrastructure
- ✅ No circular dependencies
- ✅ Proper separation of concerns

Run `npm run depcruise` to validate the architecture. This check runs automatically in CI/CD.

For detailed architecture guidelines, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Developer

This project was developed by [Sirolad](https://github.com/sirolad).
