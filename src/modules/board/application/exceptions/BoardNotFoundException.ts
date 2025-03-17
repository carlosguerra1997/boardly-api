import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'

export class BoardNotFoundException extends NotFoundError {
  constructor(message: string = 'Board not found') {
    super(message)
    this.name = 'BoardNotFoundException'
  }
} 