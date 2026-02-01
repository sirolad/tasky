"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./infrastructure/prisma/prisma.service");
const prisma_task_repository_1 = require("./infrastructure/repositories/prisma-task.repository");
const prisma_user_repository_1 = require("./infrastructure/repositories/prisma-user.repository");
const task_repository_interface_1 = require("./domain/repositories/task.repository.interface");
const user_repository_interface_1 = require("./domain/repositories/user.repository.interface");
const create_task_use_case_1 = require("./application/use-cases/create-task.use-case");
const list_tasks_use_case_1 = require("./application/use-cases/list-tasks.use-case");
const update_task_use_case_1 = require("./application/use-cases/update-task.use-case");
const delete_task_use_case_1 = require("./application/use-cases/delete-task.use-case");
const assign_user_to_task_use_case_1 = require("./application/use-cases/assign-user-to-task.use-case");
const create_user_use_case_1 = require("./application/use-cases/create-user.use-case");
const task_controller_1 = require("./presentation/controllers/task.controller");
const user_controller_1 = require("./presentation/controllers/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [task_controller_1.TaskController, user_controller_1.UserController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: task_repository_interface_1.ITaskRepository,
                useClass: prisma_task_repository_1.PrismaTaskRepository,
            },
            {
                provide: user_repository_interface_1.IUserRepository,
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            create_task_use_case_1.CreateTaskUseCase,
            list_tasks_use_case_1.ListTasksUseCase,
            update_task_use_case_1.UpdateTaskUseCase,
            delete_task_use_case_1.DeleteTaskUseCase,
            assign_user_to_task_use_case_1.AssignUserToTaskUseCase,
            create_user_use_case_1.CreateUserUseCase,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map