"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["OPEN"] = "OPEN";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["DONE"] = "DONE";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
class Task {
    id;
    title;
    description;
    status;
    assignedToId;
    createdAt;
    updatedAt;
    constructor(id, title, description, status, assignedToId, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignedToId = assignedToId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map