import { Injectable } from '@nestjs/common'

import { Board } from '@/modules/board/domain/board'
import { BoardAssembler as IBoardAssembler } from '@/modules/board/domain/board-assembler'
import { BoardStatus, type BoardStatusType } from '@/modules/board/domain/board-status'
import { BoardVisibility, type BoardVisibilityType } from '@/modules/board/domain/board-visibility'

import { BoardSchemaInterface } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'

@Injectable()
export class BoardAssembler implements IBoardAssembler<Board, BoardSchemaInterface> {
  toDatabase(item: Board): BoardSchemaInterface {
    const description = item.getDescription() ?? null

    return {
      id: item.getId(),
      name: item.getName(),
      description: description,
      visibility: item.getVisibility().getValue(),
      status: item.getStatus().getValue(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt()
    }
  }

  toEntity(item: BoardSchemaInterface): Board {
    const description = item.description ?? ''
    const status = new BoardStatus(item.status as BoardStatusType)
    const visibility = new BoardVisibility(item.visibility as BoardVisibilityType)

    return new Board(
      item.id,
      item.name,
      description,
      visibility,
      status,
      item.createdAt
    )
  }
}