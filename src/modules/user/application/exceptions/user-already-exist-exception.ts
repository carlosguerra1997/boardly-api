import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'

export class UserAlreadyExistException extends BadRequestError {
  constructor(message: string = 'Username or email not valid.') {
    super(message)
    this.name = 'UserAlreadyExistException'
  }
}