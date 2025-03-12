import { Inject, Injectable } from '@nestjs/common'

import { BoardRepository } from '@/modules/board/domain/board-repository'
import { IdGenerator } from '@/common/domain/identity/id-generator'

import { type BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'
import { BoardRequest } from '@/modules/board/application/request/board-request'
import { BoardResponse } from '@/modules/board/application/response/board-response'

@Injectable()
export class BoardCreateUseCase {
  constructor(
    @Inject(IdGenerator) private idGenerator: IdGenerator,
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(
    payload: BoardCreatePayload, 
    userId: string
  ): Promise<BoardResponse> {
    const id = await this.idGenerator.generate()

    const request = new BoardRequest(id, payload)
    const board = request.make()
    await this.boardRepo.save(board)

    const boardResponse = new BoardResponse(
      board.getId(),
      board.getName(),
      board.getDescription(),
      board.getStatus().getStatus()
    )

    return boardResponse
  }
}