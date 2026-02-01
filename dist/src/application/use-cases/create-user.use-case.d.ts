import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(name: string, email: string): Promise<User>;
}
