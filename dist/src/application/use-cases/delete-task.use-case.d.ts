import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
export declare class DeleteTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: ITaskRepository);
    execute(id: string): Promise<void>;
}
