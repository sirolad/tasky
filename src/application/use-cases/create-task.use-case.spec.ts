import { CreateTaskUseCase } from './create-task.use-case';
import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus } from '../../domain/entities';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as any;
    createTaskUseCase = new CreateTaskUseCase(taskRepository);
  });

  it('should create a task', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const savedTask = new Task('1', title, description, TaskStatus.OPEN);
    taskRepository.save.mockResolvedValue(savedTask);

    const result = await createTaskUseCase.execute(title, description);

    expect(result).toEqual(savedTask);
    expect(taskRepository.save).toHaveBeenCalled();
  });
});
