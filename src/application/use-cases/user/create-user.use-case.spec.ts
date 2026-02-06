import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { ResourceAlreadyExistsException } from '../../../domain/exceptions';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<IUserRepository>;
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user successfully', async () => {
    const user = new User('1', 'Test User', 'test@example.com');
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockResolvedValue(user);

    const result = await createUserUseCase.execute('Test User', 'test@example.com');

    expect(result).toEqual(user);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.save).toHaveBeenCalled();
  });

  it('should throw ResourceAlreadyExistsException if user already exists', async () => {
    const existingUser = new User('1', 'Test User', 'test@example.com');
    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(
      createUserUseCase.execute('Test User', 'test@example.com'),
    ).rejects.toThrow(ResourceAlreadyExistsException);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
