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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_task_use_case_1 = require("../../application/use-cases/create-task.use-case");
const list_tasks_use_case_1 = require("../../application/use-cases/list-tasks.use-case");
const update_task_use_case_1 = require("../../application/use-cases/update-task.use-case");
const delete_task_use_case_1 = require("../../application/use-cases/delete-task.use-case");
const assign_user_to_task_use_case_1 = require("../../application/use-cases/assign-user-to-task.use-case");
const create_task_dto_1 = require("../dtos/create-task.dto");
const update_task_dto_1 = require("../dtos/update-task.dto");
let TaskController = class TaskController {
    createTaskUseCase;
    listTasksUseCase;
    updateTaskUseCase;
    deleteTaskUseCase;
    assignUserToTaskUseCase;
    constructor(createTaskUseCase, listTasksUseCase, updateTaskUseCase, deleteTaskUseCase, assignUserToTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.listTasksUseCase = listTasksUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.assignUserToTaskUseCase = assignUserToTaskUseCase;
    }
    create(createTaskDto) {
        return this.createTaskUseCase.execute(createTaskDto.title, createTaskDto.description);
    }
    findAll(status) {
        return this.listTasksUseCase.execute({ status });
    }
    update(id, updateTaskDto) {
        return this.updateTaskUseCase.execute(id, updateTaskDto);
    }
    remove(id) {
        return this.deleteTaskUseCase.execute(id);
    }
    assign(id, userId) {
        return this.assignUserToTaskUseCase.execute(id, userId);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new task' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all tasks' }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a task' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a task' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/assign/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a user to a task' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "assign", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('tasks'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [create_task_use_case_1.CreateTaskUseCase,
        list_tasks_use_case_1.ListTasksUseCase,
        update_task_use_case_1.UpdateTaskUseCase,
        delete_task_use_case_1.DeleteTaskUseCase,
        assign_user_to_task_use_case_1.AssignUserToTaskUseCase])
], TaskController);
//# sourceMappingURL=task.controller.js.map