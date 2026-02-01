import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement Clean Architecture' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Structure the project with entities, use cases, and repositories',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'user-uuid-123', required: false })
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}
