import { Body, Controller, InternalServerErrorException, NotFoundException, Param, Put } from '@nestjs/common'

import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'
import { Result } from '@/common/domain/identity/result'

import { BoardUpdateUseCase } from '@/modules/board/application/updater/board-update-use-case'
import { type BoardUpdatePayload } from '@/modules/board/application/updater/board-update-payload'

@Controller('v1')
export class BoardUpdateController {
  constructor(
    private updater: BoardUpdateUseCase
  ) {}

  @Put('board/:id')
  async invoke(
    @Param('id') id: string,
    @Body() body: BoardUpdatePayload
  ): Promise<Result> {
    try {
      await this.updater.dispatch(id, body)

      return Result.success()
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }


      throw new InternalServerErrorException()
    }
  }
}