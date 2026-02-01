import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task } from '../../domain/entities/task.entity';
export declare class ListTasksUseCase {
    private readonly taskRepository;
    constructor(taskRepository: ITaskRepository);
    execute(filters?: {
        status?: string;
    }): Promise<Task[]>;
}
