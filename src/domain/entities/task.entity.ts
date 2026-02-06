export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  private _title: string;
  private _description: string | null;
  private _status: TaskStatus;
  private _assignedToId: string | null;
  private _updatedAt: Date;

  constructor(
    public readonly id: string,
    title: string,
    description: string | null,
    status: TaskStatus,
    assignedToId: string | null = null,
    public readonly createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this._title = title;
    this._description = description;
    this._status = status;
    this._assignedToId = assignedToId;
    this._updatedAt = updatedAt;
  }

  // Getters
  get title(): string {
    return this._title;
  }
  get description(): string | null {
    return this._description;
  }
  get status(): TaskStatus {
    return this._status;
  }
  get assignedToId(): string | null {
    return this._assignedToId;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business Methods
  updateTitle(title: string): void {
    this._title = title;
    this.touch();
  }

  updateDescription(description: string | null): void {
    this._description = description;
    this.touch();
  }

  assignUser(userId: string): void {
    this._assignedToId = userId;
    this.touch();
  }

  unassignUser(): void {
    this._assignedToId = null;
    this.touch();
  }

  setStatus(newStatus: TaskStatus): void {
    if (this._status === newStatus) return;

    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
      [TaskStatus.OPEN]: [TaskStatus.IN_PROGRESS],
      [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE, TaskStatus.OPEN],
      [TaskStatus.DONE]: [TaskStatus.OPEN],
    };

    if (!validTransitions[this._status].includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${this._status} to ${newStatus}`,
      );
    }

    this._status = newStatus;
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
