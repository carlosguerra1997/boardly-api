import { Body, Controller, InternalServerErrorException, Param, Put } from '@nestjs/common'

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
      throw new InternalServerErrorException()
    }
  }
}