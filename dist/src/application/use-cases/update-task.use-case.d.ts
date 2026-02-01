import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
export declare class UpdateTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: ITaskRepository);
    execute(id: string, data: Partial<{
        title: string;
        description: string;
        status: TaskStatus;
    }>): Promise<Task>;
}
