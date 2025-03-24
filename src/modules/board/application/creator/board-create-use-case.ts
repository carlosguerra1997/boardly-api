import { Inject, Injectable } from '@nestjs/common'

import { IdGenerator } from '@/common/domain/identity/id-generator'
import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'
import { BoardStatus } from '@/modules/board/domain/board-status'
import { BoardVisibility } from '@/modules/board/domain/board-visibility'

import { type BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'

@Injectable()
export class BoardCreateUseCase {
  constructor(
    @Inject(IdGenerator) private idGenerator: IdGenerator,
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(
    payload: BoardCreatePayload, 
    userId: string
  ): Promise<Board> {
    const { name, description, visibility } = payload
    const id = await this.idGenerator.generate()

    const board = Board.create(
      id,
      name,
      description ?? '',
      new BoardVisibility(visibility),
      new BoardStatus('active')
    )
    
    await this.boardRepo.save(board)
    return board
  }
}