import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined)
      task.description = data.description || null;
    if (data.status !== undefined) task.status = data.status;
    task.updatedAt = new Date();

    return this.taskRepository.save(task);
  }
}
