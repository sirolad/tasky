import { ITaskRepository } from '../../../domain/repositories';
import { Task, User } from '../../../domain/entities';
import { IListTasksUseCase } from '../use-case.interfaces';

export class ListTasksUseCase implements IListTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(filters?: {
    status?: string;
    userId?: string;
    title?: string;
  }): Promise<{ task: Task; user: User | null }[]> {
    return this.taskRepository.findAll(filters);
  }
}
