import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { ITaskRepository } from './domain/repositories/task.repository.interface';
import { IUserRepository } from './domain/repositories/user.repository.interface';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { ListTasksUseCase } from './application/use-cases/list-tasks.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { AssignUserToTaskUseCase } from './application/use-cases/assign-user-to-task.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { TaskController } from './presentation/controllers/task.controller';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [],
  controllers: [TaskController, UserController],
  providers: [
    PrismaService,
    {
      provide: ITaskRepository,
      useClass: PrismaTaskRepository,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    CreateTaskUseCase,
    ListTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    AssignUserToTaskUseCase,
    CreateUserUseCase,
  ],
})
export class AppModule {}
