export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Task {
    readonly id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    assignedToId: string | null;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(id: string, title: string, description: string | null, status: TaskStatus, assignedToId: string | null, createdAt: Date, updatedAt: Date);
}
