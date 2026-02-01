import { ITaskRepository } from '../../domain/repositories';
import { Task, User } from '../../domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { IListTasksUseCase } from './task-use-cases.interface';

@Injectable()
export class ListTasksUseCase implements IListTasksUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(filters?: {
    status?: string;
    userId?: string;
    title?: string;
  }): Promise<{ task: Task; user: User | null }[]> {
    return this.taskRepository.findAll(filters);
  }
}
