import { ITaskRepository } from '../../../domain/repositories';
import { Task, TaskStatus, User } from '../../../domain/entities';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IUpdateTaskUseCase } from '../use-case.interfaces';

@Injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(id);
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const { task } = result;

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined)
      task.description = data.description || null;
    if (data.status !== undefined) {
      try {
        task.setStatus(data.status);
      } catch (error) {
        throw new BadRequestException((error as Error).message);
      }
    } else {
      task.updatedAt = new Date();
    }

    result.task = await this.taskRepository.save(task);
    return result;
  }
}
