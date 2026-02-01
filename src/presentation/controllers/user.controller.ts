import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  ICreateUserUseCase,
  IListUsersUseCase,
} from '../../application/use-cases';
import { CreateUserDto, UserResponseDto } from '../dtos';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserUseCase)
    private readonly createUserUseCase: ICreateUserUseCase,
    @Inject(IListUsersUseCase)
    private readonly listUsersUseCase: IListUsersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(
      createUserDto.name,
      createUserDto.email,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: [UserResponseDto] })
  findAll() {
    return this.listUsersUseCase.execute();
  }
}
