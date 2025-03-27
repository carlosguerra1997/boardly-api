import { Controller, Get, InternalServerErrorException, Query } from '@nestjs/common'

import { Result } from '@/common/presentation/result'

import { BoardListUseCase } from '@/modules/board/application/lister/board-list-use-case'
import { type BoardQueryPayload } from '@/modules/board/application/lister/board-query-payload'
import { BoardListView } from '@/modules/board/presentation/board-list-view'

@Controller('v1')
export class BoardListController {
  constructor(
    private lister: BoardListUseCase
  ) {}

  @Get('boards')
  async invoke(@Query() query: BoardQueryPayload): Promise<Result> {
    try {
      const response = await this.lister.dispatch(query)
      const result = new BoardListView(response)
      return result
    } catch(error) {
      throw new InternalServerErrorException()
    }
  }
}