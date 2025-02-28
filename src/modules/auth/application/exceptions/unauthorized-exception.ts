import { UnauthorizedError } from '@/common/domain/identity/exception/unauthorized-error'

export class UnauthorizedException extends UnauthorizedError {
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedException'
  }
}