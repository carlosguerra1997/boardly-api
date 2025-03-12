import { Entity } from '@/common/domain/identity/entity'

import { BoardStatus, BoardStatusType } from '@/modules/board/domain/board-status'

export class Board extends Entity {
  private name: string
  private description: string
  private status: BoardStatus

  constructor(
    id: string,
    name: string,
    description: string,
    status: BoardStatusType = 'active'
  ) {
    super(id)

    this.name = name
    this.description = description
    this.status = new BoardStatus(status)
  }

  public getName(): string {
    return this.name
  }

  public getDescription(): string {
    return this.description
  }

  public getStatus(): BoardStatus {
    return this.status
  }
}