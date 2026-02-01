import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories';
import { User } from '../../domain/entities';
import { IListUsersUseCase } from './use-case.interfaces';

@Injectable()
export class ListUsersUseCase implements IListUsersUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
