import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'

export class BoardInvalidVisibility extends BadRequestError {
  constructor() {
    super('Invalid board visibility')
  }
}