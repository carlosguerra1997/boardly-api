import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'

export class BoardNameRequiredException extends BadRequestError {
  constructor() {
    super('Board name is required')
  }
}