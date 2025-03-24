import { Inject, Injectable } from '@nestjs/common'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardNotFoundException } from '@/modules/board/application/exceptions/BoardNotFoundException'

@Injectable()
export class BoardReadUseCase {
  constructor(
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(id: string): Promise<Board> {
    const board = await this.boardRepo.obtainById(id)
    if (!board) {
      throw new BoardNotFoundException()
    }

    return board
  }
}