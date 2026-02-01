import { ITaskRepository, IUserRepository } from '../../domain/repositories';
import { Task, TaskStatus, User } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    title: string,
    description?: string,
    assignedToId?: string,
  ): Promise<{ task: Task; user: User | null }> {
    let user: User | null = null;
    if (assignedToId) {
      user = await this.userRepository.findById(assignedToId);
      if (!user) {
        throw new NotFoundException(`User with ID "${assignedToId}" not found`);
      }
    }

    const task = new Task(
      randomUUID(),
      title,
      description ?? null,
      TaskStatus.OPEN,
      assignedToId,
    );
    const savedTask = await this.taskRepository.save(task);
    return { task: savedTask, user };
  }
}
