import { GetTaskUseCase } from './get-task.use-case';
import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus } from '../../domain/entities';
import { NotFoundException } from '@nestjs/common';

describe('GetTaskUseCase', () => {
  let getTaskUseCase: GetTaskUseCase;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    taskRepository = {
      findById: jest.fn(),
    } as any;
    getTaskUseCase = new GetTaskUseCase(taskRepository);
  });

  it('should return a task if it exists', async () => {
    const task = new Task('1', 'Test Task', 'Description', TaskStatus.OPEN);
    const enrichedResult = { task, user: null };
    taskRepository.findById.mockResolvedValue(enrichedResult);

    const result = await getTaskUseCase.execute('1');

    expect(result).toEqual(enrichedResult);
    expect(taskRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if task does not exist', async () => {
    taskRepository.findById.mockResolvedValue(null);

    await expect(getTaskUseCase.execute('999')).rejects.toThrow(
      NotFoundException,
    );
    expect(taskRepository.findById).toHaveBeenCalledWith('999');
  });
});
