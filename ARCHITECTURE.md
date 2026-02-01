# Architecture Guidelines

This project follows **Clean Architecture** principles to ensure maintainability, testability, and independence from frameworks and external dependencies.

## 📐 Architecture Layers

The codebase is organized into four distinct layers, each with specific responsibilities:

### 1. Domain Layer (`src/domain/`)
**Core business logic - NO external dependencies**

- **Entities** (`entities/`): Core business models with validation rules
  - `Task`: Task entity with status transitions
  - `User`: User entity
- **Repository Interfaces** (`repositories/`): Contracts for data access
  - `ITaskRepository`
  - `IUserRepository`

**Rules:**
- ✅ Can depend on: Nothing (pure business logic)
- ❌ Cannot depend on: Application, Infrastructure, Presentation layers
- ❌ Cannot depend on: External frameworks, databases, HTTP

### 2. Application Layer (`src/application/`)
**Use cases and business workflows**

- **Use Cases** (`use-cases/`): Application-specific business logic
  - `task/`: Task-related use cases (Create, Update, Delete, List, Get, Assign)
  - `user/`: User-related use cases (Create, List)

**Rules:**
- ✅ Can depend on: Domain layer (entities, repository interfaces)
- ❌ Cannot depend on: Infrastructure, Presentation layers
- ❌ Cannot depend on: Database implementations, HTTP, DTOs

### 3. Infrastructure Layer (`src/infrastructure/`)
**Technical implementation details**

- **Repositories** (`repositories/`): Prisma-based repository implementations
- **Filters** (`filters/`): Global exception handling
- **Interceptors** (`interceptors/`): Response transformation
- **Prisma** (`prisma/`): Database service

**Rules:**
- ✅ Can depend on: Domain layer (to implement interfaces)
- ✅ Can depend on: External libraries (Prisma, database drivers)
- ❌ Cannot depend on: Application, Presentation layers

### 4. Presentation Layer (`src/presentation/`)
**HTTP API and external communication**

- **Controllers** (`controllers/`): REST API endpoints
- **DTOs** (`dtos/`): Data Transfer Objects
  - `task/`: Task-related DTOs
  - `user/`: User-related DTOs

**Rules:**
- ✅ Can depend on: Application layer (use cases)
- ✅ Can depend on: Domain layer (entities for type definitions)
- ❌ Cannot depend on: Infrastructure layer (repositories, database)

## 🚨 Enforcing Architecture Rules

We use **dependency-cruiser** to automatically validate architecture boundaries. This prevents accidental violations of Clean Architecture principles.

### Running Architecture Validation

```bash
# Validate architecture (runs in CI/CD)
npm run depcruise

# Generate visual dependency graph
npm run depcruise:graph

# Generate architecture layer diagram
npm run depcruise:archi
```

### What Gets Validated

The following violations will **fail the build**:

1. ❌ Domain depending on Application/Infrastructure/Presentation
2. ❌ Application depending on Infrastructure/Presentation
3. ❌ Presentation depending on Infrastructure directly
4. ❌ Circular dependencies
5. ❌ Using spec files in production code
6. ❌ Using devDependencies in production code

### Example Violations

**❌ BAD: Use case importing repository implementation**
```typescript
// src/application/use-cases/create-task.use-case.ts
import { PrismaTaskRepository } from '../../infrastructure/repositories/prisma-task.repository';
// ❌ Application cannot depend on Infrastructure!
```

**✅ GOOD: Use case depending on repository interface**
```typescript
// src/application/use-cases/create-task.use-case.ts
import { ITaskRepository } from '../../domain/repositories';
// ✅ Application depends on Domain interfaces
```

**❌ BAD: Controller importing repository**
```typescript
// src/presentation/controllers/task.controller.ts
import { PrismaTaskRepository } from '../../infrastructure/repositories/prisma-task.repository';
// ❌ Presentation cannot depend on Infrastructure!
```

**✅ GOOD: Controller using use cases**
```typescript
// src/presentation/controllers/task.controller.ts
import { ICreateTaskUseCase } from '../../application/use-cases';
// ✅ Presentation depends on Application use cases
```

## 🔄 Dependency Flow

```
┌──────────────────────────────────────────┐
│          Presentation Layer              │
│     (Controllers, DTOs, HTTP)            │
└────────────────┬─────────────────────────┘
                 │
                 │ depends on
                 ▼
┌──────────────────────────────────────────┐
│          Application Layer               │
│         (Use Cases, Workflows)           │
└────────────────┬─────────────────────────┘
                 │
                 │ depends on
                 ▼
┌──────────────────────────────────────────┐
│            Domain Layer                  │
│  (Entities, Business Rules, Interfaces)  │
└──────────────────────────────────────────┘
                 ▲
                 │ implements
                 │
┌────────────────┴─────────────────────────┐
│        Infrastructure Layer              │
│   (Database, External Services, etc.)    │
└──────────────────────────────────────────┘
```

## 📝 Contribution Guidelines

### Before Submitting a PR

1. **Run tests**: `npm test && npm run test:e2e`
2. **Validate architecture**: `npm run depcruise`
3. **Check linting**: `npm run lint`
4. **Format code**: `npm run format`

### Adding New Features

1. **Start with Domain**: Define entities and repository interfaces
2. **Implement Use Cases**: Add business logic in Application layer
3. **Add Infrastructure**: Implement repository interfaces
4. **Create Presentation**: Add controllers and DTOs
5. **Wire Dependencies**: Update `app.module.ts` with proper DI

### File Organization

- Keep related files together in domain-specific folders (`task/`, `user/`)
- Use barrel exports (`index.ts`) to simplify imports
- Name files descriptively: `create-task.use-case.ts`, `task.repository.interface.ts`

## 🛡️ Continuous Integration

The CI/CD pipeline automatically:
- ✅ Runs unit tests
- ✅ Runs e2e tests
- ✅ Validates architecture with dependency-cruiser
- ✅ Checks code formatting
- ✅ Runs linting

**Architecture violations will fail the build**, ensuring the Clean Architecture principles are maintained.

## 📚 Learn More

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [NestJS Architecture Best Practices](https://docs.nestjs.com/fundamentals/custom-providers)
- [Dependency Cruiser Documentation](https://github.com/sverweij/dependency-cruiser)

## 🤝 Questions?

If you're unsure about where to place new code or how to structure a feature while maintaining Clean Architecture principles, please:
1. Review this document
2. Check existing code patterns
3. Ask in your PR or open a discussion

**Remember: The architecture boundaries exist to protect the core business logic and ensure long-term maintainability.**
