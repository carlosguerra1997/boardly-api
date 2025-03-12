import { Injectable } from '@nestjs/common'

import { Board } from '@/modules/board/domain/board'
import { BoardAssembler as IBoardAssembler } from '@/modules/board/domain/board-assembler'
import { BoardStatusType } from '@/modules/board/domain/board-status'

import { BoardSchemaInterface } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'

@Injectable()
export class BoardAssembler implements IBoardAssembler<Board, BoardSchemaInterface> {
  toDatabase(item: Board): BoardSchemaInterface {
    return {
      id: item.getId(),
      name: item.getName(),
      description: item.getDescription(),
      status: item.getStatus().getStatus(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt()
    }
  }

  toEntity(item: BoardSchemaInterface): Board {
    return new Board(
      item.id,
      item.name,
      item.description,
      item.status as BoardStatusType
    )
  }
}