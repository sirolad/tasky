import { Task, TaskStatus, User } from '../../domain/entities';

export interface ICreateTaskUseCase {
  execute(
    title: string,
    description?: string,
    assignedToId?: string,
  ): Promise<{ task: Task; user: User | null }>;
}
export const ICreateTaskUseCase = 'ICreateTaskUseCase';

export interface IListTasksUseCase {
  execute(filters?: {
    status?: string;
    userId?: string;
    title?: string;
  }): Promise<{ task: Task; user: User | null }[]>;
}
export const IListTasksUseCase = 'IListTasksUseCase';

export interface IGetTaskUseCase {
  execute(id: string): Promise<{ task: Task; user: User | null }>;
}
export const IGetTaskUseCase = 'IGetTaskUseCase';

export interface IUpdateTaskUseCase {
  execute(
    id: string,
    data: Partial<{ title: string; description: string; status: TaskStatus }>,
  ): Promise<{ task: Task; user: User | null }>;
}
export const IUpdateTaskUseCase = 'IUpdateTaskUseCase';

export interface IDeleteTaskUseCase {
  execute(id: string): Promise<void>;
}
export const IDeleteTaskUseCase = 'IDeleteTaskUseCase';

export interface IAssignUserToTaskUseCase {
  execute(
    taskId: string,
    userId: string,
  ): Promise<{ task: Task; user: User | null }>;
}
export const IAssignUserToTaskUseCase = 'IAssignUserToTaskUseCase';

export interface ICreateUserUseCase {
  execute(name: string, email: string): Promise<User>;
}
export const ICreateUserUseCase = 'ICreateUserUseCase';
