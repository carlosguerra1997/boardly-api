import { BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'

export class BoardPayloadMother {
  static create(overrides?: Partial<BoardCreatePayload>): BoardCreatePayload {
    return {
      name: 'Testing board',
      description: 'This is a testing board',
      visibility: 'private',
      ...overrides
    }
  }

  static withEmptyName(): BoardCreatePayload {
    return this.create({ name: '' })
  }
}