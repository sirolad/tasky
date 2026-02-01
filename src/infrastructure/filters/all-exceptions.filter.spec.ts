import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { Prisma } from '@prisma/client';

interface MockHttpAdapter {
  reply: jest.Mock;
  getRequestUrl: jest.Mock;
}

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  const mockHttpAdapter: MockHttpAdapter = {
    reply: jest.fn(),
    getRequestUrl: jest.fn().mockReturnValue('/test'),
  };

  beforeAll(() => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: HttpAdapterHost,
          useValue: {
            httpAdapter: mockHttpAdapter,
          },
        },
      ],
    }).compile();

    filter = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  const mockArgumentsHost = {
    switchToHttp: () => ({
      getRequest: () => ({}),
      getResponse: () => ({}),
    }),
  } as ArgumentsHost;

  it('should handle Prisma P2002 error as 409 Conflict', () => {
    const exception: Prisma.PrismaClientKnownRequestError =
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '1.0',
        meta: { target: ['title'] },
      });

    filter.catch(exception, mockArgumentsHost);

    expect(mockHttpAdapter.reply).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        statusCode: HttpStatus.CONFLICT,
        errorCode: 'UNIQUE_CONSTRAINT_FAILED',
      }),
      HttpStatus.CONFLICT,
    );
  });

  it('should handle general Error as 500 Internal Server Error', () => {
    const exception = new Error('Something went wrong');

    filter.catch(exception, mockArgumentsHost);

    expect(mockHttpAdapter.reply).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
});
