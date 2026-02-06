import { DomainException } from './domain.exception';

export class ResourceAlreadyExistsException extends DomainException {
  constructor(resource: string, identifier: string) {
    super(`${resource} with identifier ${identifier} already exists`);
  }
}
