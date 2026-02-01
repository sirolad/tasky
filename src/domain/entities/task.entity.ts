import { User } from './user.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public assignedToId: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public assignedUser?: User,
  ) {}
}
