import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import {
  DomainException,
  ResourceNotFoundException,
  BusinessRuleViolationException,
  ResourceAlreadyExistsException,
} from '../../domain/exceptions';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode: string | undefined;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message =
          (response as { message?: string }).message ??
          JSON.stringify(response);
      } else {
        message = 'An error occurred';
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      switch (exception.code) {
        case 'P2002': // Unique constraint failed
          httpStatus = HttpStatus.CONFLICT;
          message = `Unique constraint failed on the fields: ${(exception.meta?.target as string[])?.join(', ')}`;
          errorCode = 'UNIQUE_CONSTRAINT_FAILED';
          break;
        case 'P2025': // Record to update not found
          httpStatus = HttpStatus.NOT_FOUND;
          message = exception.message || 'Record not found';
          errorCode = 'RECORD_NOT_FOUND';
          break;
        default:
          httpStatus = HttpStatus.BAD_REQUEST;
          message = `Database error: ${exception.message}`;
          errorCode = exception.code;
          break;
      }
    } else if (exception instanceof DomainException) {
      if (exception instanceof ResourceNotFoundException) {
        httpStatus = HttpStatus.NOT_FOUND;
        errorCode = 'RESOURCE_NOT_FOUND';
      } else if (exception instanceof BusinessRuleViolationException) {
        httpStatus = HttpStatus.BAD_REQUEST;
        errorCode = 'BUSINESS_RULE_VIOLATION';
      } else if (exception instanceof ResourceAlreadyExistsException) {
        httpStatus = HttpStatus.CONFLICT;
        errorCode = 'RESOURCE_ALREADY_EXISTS';
      } else {
        httpStatus = HttpStatus.BAD_REQUEST;
      }
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    } else {
      this.logger.error(`Unknown exception: ${String(exception)}`);
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()) as string,
      message,
      ...(errorCode && { errorCode }),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
