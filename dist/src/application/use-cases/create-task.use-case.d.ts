import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task } from '../../domain/entities/task.entity';
export declare class CreateTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: ITaskRepository);
    execute(title: string, description?: string): Promise<Task>;
}
