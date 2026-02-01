import { ITaskRepository, IUserRepository } from '../../domain/repositories';
import { Task } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AssignUserToTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(taskId: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    task.assignedToId = userId;
    task.updatedAt = new Date();

    return this.taskRepository.save(task);
  }
}
