import { Inject, Injectable } from '@nestjs/common'

import { IdGenerator } from '@/common/domain/identity/id-generator'

import { type BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'
import { BoardRequest } from '@/modules/board/application/request/board-request'
import { BoardResponse } from '@/modules/board/application/response/board-response'

@Injectable()
export class BoardCreateUseCase {
  constructor(
    @Inject(IdGenerator) private idGenerator: IdGenerator,
  ) {}

  async dispatch(
    payload: BoardCreatePayload, 
    userId: string
  ): Promise<BoardResponse> {
    const { description, name } = payload

    const id = await this.idGenerator.generate()
    const board = BoardRequest.create(id, name, description)

    // Save board to database

    const boardResponse = new BoardResponse(
      board.getId(),
      board.getName(),
      board.getDescription(),
      board.getStatus().getStatus()
    )

    return boardResponse
  }
}