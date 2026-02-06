import { ITaskRepository } from '../../../domain/repositories';
import { Task, TaskStatus, User } from '../../../domain/entities';
import { IUpdateTaskUseCase } from '../use-case.interfaces';
import {
  ResourceNotFoundException,
  BusinessRuleViolationException,
} from '../../../domain/exceptions';

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(id);
    if (!result) {
      throw new ResourceNotFoundException('Task', id);
    }

    const { task } = result;

    if (data.title !== undefined) task.updateTitle(data.title);
    if (data.description !== undefined)
      task.updateDescription(data.description || null);
    if (data.status !== undefined) {
      try {
        task.setStatus(data.status);
      } catch (error) {
        throw new BusinessRuleViolationException((error as Error).message);
      }
    }

    result.task = await this.taskRepository.save(task);
    return result;
  }
}
