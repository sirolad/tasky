import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { AssignUserToTaskUseCase } from '../../application/use-cases/assign-user-to-task.use-case';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
export declare class TaskController {
    private readonly createTaskUseCase;
    private readonly listTasksUseCase;
    private readonly updateTaskUseCase;
    private readonly deleteTaskUseCase;
    private readonly assignUserToTaskUseCase;
    constructor(createTaskUseCase: CreateTaskUseCase, listTasksUseCase: ListTasksUseCase, updateTaskUseCase: UpdateTaskUseCase, deleteTaskUseCase: DeleteTaskUseCase, assignUserToTaskUseCase: AssignUserToTaskUseCase);
    create(createTaskDto: CreateTaskDto): Promise<import("../../domain/entities/task.entity").Task>;
    findAll(status?: string): Promise<import("../../domain/entities/task.entity").Task[]>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("../../domain/entities/task.entity").Task>;
    remove(id: string): Promise<void>;
    assign(id: string, userId: string): Promise<import("../../domain/entities/task.entity").Task>;
}
