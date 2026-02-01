import { Task, User } from '../entities';

export interface ITaskRepository {
  findById(id: string): Promise<{ task: Task; user: User | null } | null>;
  findAll(filters?: {
    status?: string;
    userId?: string;
    title?: string;
  }): Promise<{ task: Task; user: User | null }[]>;
  save(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const ITaskRepository = 'ITaskRepository';
