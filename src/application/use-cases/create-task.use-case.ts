import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus } from '../../domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(title: string, description?: string, assignedToId?: string): Promise<Task> {
    const task = new Task(
      randomUUID(),
      title,
      description ?? null,
      TaskStatus.OPEN,
      assignedToId,
    );
    return this.taskRepository.save(task);
  }
}
