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
      useClass: CreateTaskUseCase,
    },
    {
      provide: IListTasksUseCase,
      useClass: ListTasksUseCase,
    },
    {
      provide: IUpdateTaskUseCase,
      useClass: UpdateTaskUseCase,
    },
    {
      provide: IDeleteTaskUseCase,
      useClass: DeleteTaskUseCase,
    },
    {
      provide: IGetTaskUseCase,
      useClass: GetTaskUseCase,
    },
    {
      provide: IAssignUserToTaskUseCase,
      useClass: AssignUserToTaskUseCase,
    },
    {
      provide: ICreateUserUseCase,
      useClass: CreateUserUseCase,
    },
    {
      provide: IListUsersUseCase,
      useClass: ListUsersUseCase,
    },
  ],
})
export class AppModule {}
