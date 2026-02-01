import { ListTasksUseCase } from './list-tasks.use-case';
import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus, User } from '../../domain/entities';

describe('ListTasksUseCase', () => {
  let listTasksUseCase: ListTasksUseCase;
  let taskRepository: jest.Mocked<ITaskRepository>;

  beforeEach(() => {
    taskRepository = {
      findAll: jest.fn(),
    } as any;
    listTasksUseCase = new ListTasksUseCase(taskRepository);
  });

  it('should list all tasks when no filters are provided', async () => {
    const tasks = [
      new Task('1', 'Task 1', null, TaskStatus.OPEN, null, new Date(), new Date()),
    ];
    taskRepository.findAll.mockResolvedValue(tasks);

    const result = await listTasksUseCase.execute();

    expect(result).toEqual(tasks);
    expect(taskRepository.findAll).toHaveBeenCalledWith(undefined);
  });

  it('should filter tasks by status', async () => {
    const filters = { status: TaskStatus.IN_PROGRESS };
    taskRepository.findAll.mockResolvedValue([]);

    await listTasksUseCase.execute(filters);

    expect(taskRepository.findAll).toHaveBeenCalledWith(filters);
  });

  it('should filter tasks by status, userId and title search', async () => {
    const filters = { status: TaskStatus.OPEN, userId: 'user-1', title: 'Search' };
    taskRepository.findAll.mockResolvedValue([]);

    await listTasksUseCase.execute(filters);

    expect(taskRepository.findAll).toHaveBeenCalledWith(filters);
  });

  it('should include assignedUser in the result when present', async () => {
    const user = new User('user-1', 'John Doe', 'john@example.com');
    const task = new Task('1', 'Task 1', null, TaskStatus.OPEN, 'user-1', new Date(), new Date(), user);
    
    taskRepository.findAll.mockResolvedValue([task]);

    const result = await listTasksUseCase.execute();

    expect(result[0].assignedUser).toEqual(user);
    expect(result[0].assignedToId).toBe('user-1');
  });
});
