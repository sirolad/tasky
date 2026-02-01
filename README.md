# Tasky - Task Management API

A robust task management backend built with **NestJS**, adhering to **Clean Architecture** principles.

## 🏗️ Architecture

The project is structured into layers to ensure separation of concerns and maintainability:

*   **Domain**: Core business logic, entities (`Task`, `User`), and repository interfaces. No external dependencies.
*   **Application**: Use cases (e.g., `CreateTask`, `AssignUser`) that coordinate domain logic and infrastructure.
*   **Infrastructure**: Data persistence (Prisma with SQLite), global filters, and external service implementations.
*   **Presentation**: REST Controllers, DTOs (with Swagger documentation), and interceptors.

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

## 📖 API Documentation

Once the application is running, access the interactive Swagger documentation at:
[http://localhost:3000/api](http://localhost:3000/api)

---

## Developer

This project was developed by [Sirolad](https://github.com/sirolad).
