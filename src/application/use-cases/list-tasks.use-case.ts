import { ITaskRepository } from '../../domain/repositories';
import { Task, User } from '../../domain/entities';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListTasksUseCase {
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
