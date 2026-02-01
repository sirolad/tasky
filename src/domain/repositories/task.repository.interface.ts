import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>;
  findAll(filters?: { status?: string }): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const ITaskRepository = 'ITaskRepository';
