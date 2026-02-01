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
    public assignedToId: string | null = null,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}

  setStatus(newStatus: TaskStatus): void {
    if (this.status === newStatus) return;

    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
      [TaskStatus.OPEN]: [TaskStatus.IN_PROGRESS],
      [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE, TaskStatus.OPEN],
      [TaskStatus.DONE]: [TaskStatus.OPEN],
    };

    if (!validTransitions[this.status].includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${this.status} to ${newStatus}`,
      );
    }

    this.status = newStatus;
    this.updatedAt = new Date();
  }
}
