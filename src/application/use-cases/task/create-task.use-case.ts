import { ITaskRepository, IUserRepository } from '../../../domain/repositories';
import { Task, TaskStatus, User } from '../../../domain/entities';
import { randomUUID } from 'crypto';
import { ICreateTaskUseCase } from '../use-case.interfaces';
import { ResourceNotFoundException } from '../../../domain/exceptions';

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
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
        throw new ResourceNotFoundException('User', assignedToId);
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
