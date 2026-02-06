import { ITaskRepository, IUserRepository } from '../../../domain/repositories';
import { Task, User } from '../../../domain/entities';
import { IAssignUserToTaskUseCase } from '../use-case.interfaces';
import { ResourceNotFoundException } from '../../../domain/exceptions';

export class AssignUserToTaskUseCase implements IAssignUserToTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    taskId: string,
    userId: string,
  ): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(taskId);
    if (!result) {
      throw new ResourceNotFoundException('Task', taskId);
    }

    const { task } = result;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundException('User', userId);
    }

    task.assignUser(userId);

    await this.taskRepository.save(task);
    return { task, user };
  }
}
