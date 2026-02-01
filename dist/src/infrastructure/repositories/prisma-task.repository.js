"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTaskRepository = void 0;
const common_1 = require("@nestjs/common");
const task_entity_1 = require("../../domain/entities/task.entity");
const prisma_service_1 = require("../prisma/prisma.service");
let PrismaTaskRepository = class PrismaTaskRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const row = await this.prisma.task.findUnique({ where: { id } });
        if (!row)
            return null;
        return this.mapToDomain(row);
    }
    async findAll(filters) {
        const rows = await this.prisma.task.findMany({
            where: filters?.status ? { status: filters.status } : {},
        });
        return rows.map(this.mapToDomain);
    }
    async save(task) {
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
    async delete(id) {
        await this.prisma.task.delete({ where: { id } });
    }
    mapToDomain(row) {
        return new task_entity_1.Task(row.id, row.title, row.description, row.status, row.assignedToId, row.createdAt, row.updatedAt);
    }
};
exports.PrismaTaskRepository = PrismaTaskRepository;
exports.PrismaTaskRepository = PrismaTaskRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTaskRepository);
//# sourceMappingURL=prisma-task.repository.js.map