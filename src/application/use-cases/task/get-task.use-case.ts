import { ITaskRepository } from '../../../domain/repositories';
import { Task, User } from '../../../domain/entities';
import { IGetTaskUseCase } from '../use-case.interfaces';
import { ResourceNotFoundException } from '../../../domain/exceptions';

export class GetTaskUseCase implements IGetTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(id);
    if (!result) {
      throw new ResourceNotFoundException('Task', id);
    }
    return result;
  }
}
