import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';
import { PrismaService } from '../prisma/prisma.service';
import { ResourceAlreadyExistsException } from '../../domain/exceptions';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    if (!row) return null;
    return this.mapToDomain(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    if (!row) return null;
    return this.mapToDomain(row);
  }

  async findAll(): Promise<User[]> {
    const rows = await this.prisma.user.findMany();
    return rows.map((row) => this.mapToDomain(row));
  }

  async save(user: User): Promise<User> {
    let row;
    try {
      row = await this.prisma.user.upsert({
        where: { id: user.id },
        update: {
          name: user.name,
          email: user.email,
        },
        create: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ResourceAlreadyExistsException('User', user.email);
      }
      throw error;
    }
    return this.mapToDomain(row);
  }

  private mapToDomain(row: Prisma.UserGetPayload<Record<string, never>>): User {
    return new User(row.id, row.name, row.email);
  }
}
