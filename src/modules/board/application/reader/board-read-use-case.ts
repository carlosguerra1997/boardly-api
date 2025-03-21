import { Inject, Injectable } from '@nestjs/common'

import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardNotFoundException } from '@/modules/board/application/exceptions/BoardNotFoundException'
import { BoardResponse } from '@/modules/board/application/response/board-response'

@Injectable()
export class BoardReadUseCase {
  constructor(
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(id: string): Promise<BoardResponse> {
    const board = await this.boardRepo.obtainById(id)
    if (!board) {
      throw new BoardNotFoundException()
    }

    const boardResponse = new BoardResponse(
      board.getId(),
      board.getName(),
      board.getDescription(),
      board.getVisibility().getValue(),
      board.getStatus().getValue()
    )

    return boardResponse
  }
}