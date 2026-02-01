import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { HttpCode, HttpStatus } from '@nestjs/common';
import {
  CreateTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  GetTaskUseCase,
  AssignUserToTaskUseCase,
} from '../../application/use-cases';
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskResponseDto,
  TaskFilterDto,
} from '../dtos';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly assignUserToTaskUseCase: AssignUserToTaskUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.createTaskUseCase.execute(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.assignedToId,
    );
    return this.mapToResponse(result);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiOkResponse({ type: [TaskResponseDto] })
  async findAll(@Query() filterDto: TaskFilterDto) {
    const results = await this.listTasksUseCase.execute(filterDto);
    return results.map((result) => this.mapToResponse(result));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiOkResponse({ type: TaskResponseDto })
  async findOne(@Param('id') id: string) {
    const result = await this.getTaskUseCase.execute(id);
    return this.mapToResponse(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: TaskResponseDto })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const result = await this.updateTaskUseCase.execute(id, updateTaskDto);
    return this.mapToResponse(result);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiNoContentResponse({ description: 'Task deleted successfully' })
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }

  @Post(':id/assign/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign a user to a task' })
  @ApiOkResponse({ type: TaskResponseDto })
  async assign(@Param('id') id: string, @Param('userId') userId: string) {
    const result = await this.assignUserToTaskUseCase.execute(id, userId);
    return this.mapToResponse(result);
  }

  private mapToResponse(result: { task: any; user: any }): TaskResponseDto {
    const { task, user } = result;
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      assignedToId: task.assignedToId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      assignedUser: user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        : undefined,
    };
  }
}
