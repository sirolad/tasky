import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(title: string, description?: string): Promise<Task> {
    const task = new Task(
      randomUUID(),
      title,
      description || null,
      TaskStatus.OPEN,
      null,
      new Date(),
      new Date(),
    );
    return this.taskRepository.save(task);
  }
}
