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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../domain/entities/user.entity");
const prisma_service_1 = require("../prisma/prisma.service");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const row = await this.prisma.user.findUnique({ where: { id } });
        if (!row)
            return null;
        return this.mapToDomain(row);
    }
    async findByEmail(email) {
        const row = await this.prisma.user.findUnique({ where: { email } });
        if (!row)
            return null;
        return this.mapToDomain(row);
    }
    async findAll() {
        const rows = await this.prisma.user.findMany();
        return rows.map(this.mapToDomain);
    }
    async save(user) {
        const row = await this.prisma.user.upsert({
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
        return this.mapToDomain(row);
    }
    mapToDomain(row) {
        return new user_entity_1.User(row.id, row.name, row.email);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map