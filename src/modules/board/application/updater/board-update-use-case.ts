import { Inject, Injectable } from '@nestjs/common'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardNotFoundException } from '@/modules/board/application/exceptions/BoardNotFoundException'
import { type BoardUpdatePayload } from '@/modules/board/application/updater/board-update-payload'

@Injectable()
export class BoardUpdateUseCase {
  constructor(
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(boardId: string, payload: BoardUpdatePayload) {
    const { name, description, status } = payload

    const board = await this.checkBoardExist(boardId)
    board.update(
      name,
      description ?? '',
      status,
    )

    await this.boardRepo.save(board)
  }

  private async checkBoardExist(boardId: string): Promise<Board> {
    const board = await this.boardRepo.obtainById(boardId)
    if (!board) {
      throw new BoardNotFoundException()
    }

    return board
  }
}