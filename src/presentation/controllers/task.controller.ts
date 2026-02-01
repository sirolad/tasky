import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateTaskUseCase,
  ListTasksUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  AssignUserToTaskUseCase,
} from '../../application/use-cases';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto, TaskFilterDto } from '../dtos';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly assignUserToTaskUseCase: AssignUserToTaskUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.createTaskUseCase.execute(createTaskDto.title, createTaskDto.description);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiOkResponse({ type: [TaskResponseDto] })
  findAll(@Query() filterDto: TaskFilterDto) {
    return this.listTasksUseCase.execute(filterDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiOkResponse({ type: TaskResponseDto })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }

  @Post(':id/assign/:userId')
  @ApiOperation({ summary: 'Assign a user to a task' })
  @ApiOkResponse({ type: TaskResponseDto })
  assign(@Param('id') id: string, @Param('userId') userId: string) {
    return this.assignUserToTaskUseCase.execute(id, userId);
  }
}
