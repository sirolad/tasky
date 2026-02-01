import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Task } from '../../domain/entities/task.entity';
export declare class AssignUserToTaskUseCase {
    private readonly taskRepository;
    private readonly userRepository;
    constructor(taskRepository: ITaskRepository, userRepository: IUserRepository);
    execute(taskId: string, userId: string): Promise<Task>;
}
