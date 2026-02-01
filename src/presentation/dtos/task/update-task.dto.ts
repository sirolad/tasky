import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../domain/entities/task.entity';

export class UpdateTaskDto {
  @ApiProperty({ example: 'New title', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'New description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
