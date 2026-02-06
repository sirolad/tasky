import { ITaskRepository } from '../../../domain/repositories';
import { IDeleteTaskUseCase } from '../use-case.interfaces';
import { ResourceNotFoundException } from '../../../domain/exceptions';

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new ResourceNotFoundException('Task', id);
    }
    await this.taskRepository.delete(id);
  }
}
