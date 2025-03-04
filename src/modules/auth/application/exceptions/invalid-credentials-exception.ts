import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'

export class InvalidCredentialsException extends BadRequestError {
  constructor(message: string = 'Invalid credentials') {
    super(message)
    this.name = 'InvalidCredentialsException'
  }
}