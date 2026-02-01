import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task } from '../../domain/entities/task.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(filters?: { status?: string }): Promise<Task[]> {
    return this.taskRepository.findAll(filters);
  }
}
