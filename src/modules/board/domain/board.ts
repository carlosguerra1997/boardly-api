import { Entity } from '@/common/domain/identity/entity'

import { BoardStatus, BoardStatusType } from '@/modules/board/domain/board-status'
import { BoardNameRequiredException } from '@/modules/board/domain/exception/board-name-required-exception'

export class Board extends Entity {
  private name: string
  private description: string
  private status: BoardStatus

  constructor(
    id: string,
    name: string,
    description: string,
    status: BoardStatusType = 'active',
    createdAt: number = Date.now()
  ) {
    super(id, createdAt)

    this.isValidNameOrFail(name)

    this.name = name
    this.description = description
    this.status = new BoardStatus(status)
  }

  public static create(
    id: string,
    name: string,
    description: string
  ) {
    return new Board(id, name, description)
  }

  public update(
    name: string,
    description: string,
    status: BoardStatusType
  ) {
    this.name = name
    this.description = description
    this.status = new BoardStatus(status)
    this.setUpdatedAt(Date.now())
  }

  private isValidNameOrFail(name: string): void {
    if (!name || !name.trim().length) {
      throw new BoardNameRequiredException()
    }
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