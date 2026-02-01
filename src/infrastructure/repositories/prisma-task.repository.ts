import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus } from '../../domain/entities';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    const row = await this.prisma.task.findUnique({ where: { id } });
    if (!row) return null;
    return this.mapToDomain(row);
  }

  async findAll(filters?: { status?: string }): Promise<Task[]> {
    const rows = await this.prisma.task.findMany({
      where: filters?.status ? { status: filters.status } : {},
    });
    return rows.map(this.mapToDomain);
  }

  async save(task: Task): Promise<Task> {
    const row = await this.prisma.task.upsert({
      where: { id: task.id },
      update: {
        title: task.title,
        description: task.description,
        status: task.status,
        assignedToId: task.assignedToId,
        updatedAt: task.updatedAt,
      },
      create: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        assignedToId: task.assignedToId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
    return this.mapToDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  private mapToDomain(row: any): Task {
    return new Task(
      row.id,
      row.title,
      row.description,
      row.status as TaskStatus,
      row.assignedToId,
      row.createdAt,
      row.updatedAt,
    );
  }
}
