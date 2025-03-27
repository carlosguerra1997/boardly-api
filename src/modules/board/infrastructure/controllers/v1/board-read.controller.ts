import { Controller, Get, InternalServerErrorException, NotFoundException, Param, UseGuards } from '@nestjs/common'

import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'
import { Result } from '@/common/presentation/result'

import { BoardReadUseCase } from '@/modules/board/application/reader/board-read-use-case'

import { JwtAccessTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-access-token.guard'

import { BoardReadView } from '@/modules/board/presentation/board-read-view'

@Controller('v1')
export class BoardReadController {
  constructor(
    private reader: BoardReadUseCase
  ) {}

  @Get('board/:id')
  @UseGuards(JwtAccessTokenGuard)
  async invoke(@Param('id') id: string): Promise<Result> {
    try {
      const response = await this.reader.dispatch(id)
      const result = new BoardReadView(response)
      return result
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }

      throw new InternalServerErrorException
    }
  }
}