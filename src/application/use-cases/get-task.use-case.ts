import { ITaskRepository } from '../../domain/repositories';
import { Task } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
