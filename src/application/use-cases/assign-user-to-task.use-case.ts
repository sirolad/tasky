import { ITaskRepository, IUserRepository } from '../../domain/repositories';
import { Task, User } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssignUserToTaskUseCase } from './task-use-cases.interface';

@Injectable()
export class AssignUserToTaskUseCase implements IAssignUserToTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    taskId: string,
    userId: string,
  ): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(taskId);
    if (!result) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const { task } = result;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    task.assignedToId = userId;
    task.updatedAt = new Date();

    await this.taskRepository.save(task);
    return { task, user };
  }
}
