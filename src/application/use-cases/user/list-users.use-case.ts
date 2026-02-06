import { IUserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { IListUsersUseCase } from '../use-case.interfaces';

export class ListUsersUseCase implements IListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
