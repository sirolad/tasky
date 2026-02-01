import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../../domain/entities';
import { UserResponseDto } from './user-response.dto';

export class TaskResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'Implement Clean Architecture' })
  title: string;

  @ApiProperty({
    example: 'Structure the project correctly',
    required: false,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.OPEN })
  status: TaskStatus;

  @ApiProperty({ example: 'user-uuid-456', required: false, nullable: true })
  assignedToId: string | null;

  @ApiPropertyOptional({ type: UserResponseDto })
  assignedUser?: UserResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
