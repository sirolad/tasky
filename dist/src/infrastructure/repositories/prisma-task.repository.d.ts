import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task } from '../../domain/entities/task.entity';
import { PrismaService } from '../prisma/prisma.service';
export declare class PrismaTaskRepository implements ITaskRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Task | null>;
    findAll(filters?: {
        status?: string;
    }): Promise<Task[]>;
    save(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
    private mapToDomain;
}
