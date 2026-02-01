import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly userRepository;
    constructor(createUserUseCase: CreateUserUseCase, userRepository: IUserRepository);
    create(createUserDto: CreateUserDto): Promise<import("../../domain/entities/user.entity").User>;
    findAll(): Promise<import("../../domain/entities/user.entity").User[]>;
}
