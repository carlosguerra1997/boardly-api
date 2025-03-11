import { Board } from '@/modules/board/domain/board'

import { type BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'

export class BoardRequest {
  private id: string
  private name: string
  private description: string

  constructor(
    id: string,
    payload: BoardCreatePayload
  ) {
    this.id  = id
    this.name = payload.name
    this.description = payload.description
  }

  public make(): Board {
    return new Board(
      this.id,
      this.name,
      this.description
    )
  }
}