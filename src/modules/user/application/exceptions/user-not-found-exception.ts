import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'

export class UserNotFoundException extends NotFoundError {
  constructor(message: string = 'User not found') {
    super(message)
    this.name = 'UserNotFoundException'
  }
}