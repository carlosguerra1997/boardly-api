import { Body, Controller, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common'

import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'
import { type BoardCreatePayload, boardPayloadValidationSchema } from '@/modules/board/application/creator/board-create-payload'


@Controller('v1')
export class BoardCreateController {
  constructor(
    private creator: BoardCreateUseCase
  ) {}

  @Post('board')
  @ValidateWith(boardPayloadValidationSchema)
  async invoke(@Body() body: BoardCreatePayload) {
    try {
      const board = await this.creator.dispatch(body)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException()
      }
      
      throw new InternalServerErrorException()
    }
  }
}