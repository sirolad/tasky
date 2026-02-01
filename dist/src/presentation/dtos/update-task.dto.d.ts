import { TaskStatus } from '../../domain/entities/task.entity';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}
