import { Inject, Injectable } from '@nestjs/common'

import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardResponse } from '@/modules/board/application/response/board-response'
import { type BoardQueryPayload } from '@/modules/board/application/lister/board-query-payload'
import { ListQuery } from '@/common/domain/identity/list/list-query'

@Injectable()
export class BoardListUseCase {
  private readonly mapping: Partial<BoardQueryPayload> = {
    status: 'status',
    visibility: 'visibility'
  }

  constructor(
    @Inject(BoardRepository) private boardRepo: BoardRepository
  ) {}

  async dispatch(payload: BoardQueryPayload): Promise<BoardResponse[]> {
    const query = ListQuery.parse(payload, this.mapping)
    return []
  }
}