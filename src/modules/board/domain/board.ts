import { Entity } from '@/common/domain/identity/entity'

import { BoardInvalidVisibility } from '@/modules/board/domain/exception/board-invalid-visibility'
import { BoardNameRequiredException } from '@/modules/board/domain/exception/board-name-required-exception'
import { BoardStatus, BoardStatusType } from '@/modules/board/domain/board-status'
import { BoardVisibility, BoardVisibilityType } from '@/modules/board/domain/board-visibility'



export class Board extends Entity {
  private name: string
  private description: string
  private status: BoardStatus
  private visibility: BoardVisibility

  constructor(
    id: string,
    name: string,
    description: string,
    visibility: BoardVisibility,
    status: BoardStatus,
    createdAt: number = Date.now()
  ) {
    super(id, createdAt)

    this.isValidNameOrFail(name)

    this.name = name
    this.description = description
    this.status = status
    this.visibility = visibility
  }

  public static create(
    id: string,
    name: string,
    description: string,
    visibility: BoardVisibility,
    status: BoardStatus
  ) {
    return new Board(
      id, 
      name, 
      description, 
      visibility,
      status
    )
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

  public getVisibility(): BoardVisibility {
    return this.visibility
  }

  public getStatus(): BoardStatus {
    return this.status
  }
}