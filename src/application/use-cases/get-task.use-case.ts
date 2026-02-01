import { ITaskRepository } from '../../domain/repositories';
import { Task, User } from '../../domain/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IGetTaskUseCase } from './use-case.interfaces';

@Injectable()
export class GetTaskUseCase implements IGetTaskUseCase {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<{ task: Task; user: User | null }> {
    const result = await this.taskRepository.findById(id);
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }
}
