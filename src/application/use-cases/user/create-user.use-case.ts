import { IUserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { randomUUID } from 'crypto';
import { ICreateUserUseCase } from '../use-case.interfaces';
import { ResourceAlreadyExistsException } from '../../../domain/exceptions';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ResourceAlreadyExistsException('User', email);
    }

    const user = new User(randomUUID(), name, email);
    return this.userRepository.save(user);
  }
}
