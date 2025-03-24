import { Inject, Injectable } from '@nestjs/common'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

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

  async dispatch(payload: BoardQueryPayload): Promise<Board[]> {
    const query = ListQuery.parse(payload, this.mapping)
    const boards = await this.boardRepo.obtainByQuery(query)
    return boards
  }
}