import { CreateTaskUseCase } from './create-task.use-case';
import { ITaskRepository, IUserRepository } from '../../../domain/repositories';
import { Task, TaskStatus, User } from '../../../domain/entities';
import { ResourceNotFoundException } from '../../../domain/exceptions';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: jest.Mocked<ITaskRepository>;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<ITaskRepository>;
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<IUserRepository>;
    createTaskUseCase = new CreateTaskUseCase(taskRepository, userRepository);
  });

  it('should create a task', async () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const savedTask = new Task('1', title, description, TaskStatus.OPEN);
    taskRepository.save.mockResolvedValue(savedTask);

    const result = await createTaskUseCase.execute(title, description);

    expect(result).toEqual({ task: savedTask, user: null });
    void expect(taskRepository.save).toHaveBeenCalled();
  });

  it('should create a task with an assigned user', async () => {
    const title = 'Test Task';
    const userId = 'user-1';
    const user = new User(userId, 'John Doe', 'john@example.com');
    const savedTask = new Task('1', title, null, TaskStatus.OPEN, userId);

    userRepository.findById.mockResolvedValue(user);
    taskRepository.save.mockResolvedValue(savedTask);

    const result = await createTaskUseCase.execute(title, undefined, userId);

    expect(result).toEqual({ task: savedTask, user });
    void expect(userRepository.findById).toHaveBeenCalledWith(userId);
    void expect(taskRepository.save).toHaveBeenCalled();
  });

  it('should throw ResourceNotFoundException if assigned user does not exist', async () => {
    const title = 'Test Task';
    const userId = 'non-existent-user';

    userRepository.findById.mockResolvedValue(null);

    await expect(
      createTaskUseCase.execute(title, undefined, userId),
    ).rejects.toThrow(ResourceNotFoundException);

    void expect(userRepository.findById).toHaveBeenCalledWith(userId);
    void expect(taskRepository.save).not.toHaveBeenCalled();
  });
});
