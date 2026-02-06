import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './infrastructure/config/config.validation';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import {
  PrismaTaskRepository,
  PrismaUserRepository,
} from './infrastructure/repositories';
import { ITaskRepository, IUserRepository } from './domain/repositories';
import {
  CreateUserUseCase,
  CreateTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  AssignUserToTaskUseCase,
  ListUsersUseCase,
  ICreateTaskUseCase,
  IListTasksUseCase,
  IUpdateTaskUseCase,
  IDeleteTaskUseCase,
  IGetTaskUseCase,
  IAssignUserToTaskUseCase,
  ICreateUserUseCase,
  IListUsersUseCase,
} from './application/use-cases';
import { TaskController, UserController } from './presentation/controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
  ],
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
    {
      provide: ICreateTaskUseCase,
      useFactory: (taskRepo: ITaskRepository, userRepo: IUserRepository) =>
        new CreateTaskUseCase(taskRepo, userRepo),
      inject: [ITaskRepository, IUserRepository],
    },
    {
      provide: IListTasksUseCase,
      useFactory: (taskRepo: ITaskRepository) => new ListTasksUseCase(taskRepo),
      inject: [ITaskRepository],
    },
    {
      provide: IUpdateTaskUseCase,
      useFactory: (taskRepo: ITaskRepository) =>
        new UpdateTaskUseCase(taskRepo),
      inject: [ITaskRepository],
    },
    {
      provide: IDeleteTaskUseCase,
      useFactory: (taskRepo: ITaskRepository) =>
        new DeleteTaskUseCase(taskRepo),
      inject: [ITaskRepository],
    },
    {
      provide: IGetTaskUseCase,
      useFactory: (taskRepo: ITaskRepository) => new GetTaskUseCase(taskRepo),
      inject: [ITaskRepository],
    },
    {
      provide: IAssignUserToTaskUseCase,
      useFactory: (taskRepo: ITaskRepository, userRepo: IUserRepository) =>
        new AssignUserToTaskUseCase(taskRepo, userRepo),
      inject: [ITaskRepository, IUserRepository],
    },
    {
      provide: ICreateUserUseCase,
      useFactory: (userRepo: IUserRepository) =>
        new CreateUserUseCase(userRepo),
      inject: [IUserRepository],
    },
    {
      provide: IListUsersUseCase,
      useFactory: (userRepo: IUserRepository) => new ListUsersUseCase(userRepo),
      inject: [IUserRepository],
    },
  ],
})
export class AppModule {}
