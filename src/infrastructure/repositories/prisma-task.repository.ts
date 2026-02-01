import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../domain/repositories';
import { Task, TaskStatus, User } from '../../domain/entities';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaTaskRepository implements ITaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Task | null> {
    const row = await this.prisma.task.findUnique({
      where: { id },
      include: { assignedTo: true },
    });
    if (!row) return null;
    return this.mapToDomain(row);
  }

  async findAll(filters?: { status?: string; userId?: string; title?: string }): Promise<Task[]> {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.userId) where.assignedToId = filters.userId;
    if (filters?.title) where.title = { contains: filters.title };

    const rows = await this.prisma.task.findMany({
      where,
      include: { assignedTo: true },
    });
    return rows.map((row) => this.mapToDomain(row));
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
      include: { assignedTo: true },
    });
    return this.mapToDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  private mapToDomain(row: any): Task {
    const task = new Task(
      row.id,
      row.title,
      row.description,
      row.status as TaskStatus,
      row.assignedToId,
      row.createdAt,
      row.updatedAt,
    );

    if (row.assignedTo) {
      task.assignedUser = new User(row.assignedTo.id, row.assignedTo.name, row.assignedTo.email);
    }

    return task;
  }
}
