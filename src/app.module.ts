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
  CreateTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  AssignUserToTaskUseCase,
  CreateUserUseCase,
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
    CreateTaskUseCase,
    ListTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskUseCase,
    AssignUserToTaskUseCase,
    CreateUserUseCase,
  ],
})
export class AppModule {}
