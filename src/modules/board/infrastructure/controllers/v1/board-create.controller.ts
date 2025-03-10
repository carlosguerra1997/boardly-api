import { Body, Controller, InternalServerErrorException, NotFoundException, Post, Req, UseGuards } from '@nestjs/common'
import { type Request } from 'express'

import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'
import { Result } from '@/common/domain/identity/result'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'

import { JwtAccessTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-access-token.guard'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'
import { type BoardCreatePayload, boardPayloadValidationSchema } from '@/modules/board/application/creator/board-create-payload'
import { BoardReadView } from '@/modules/board/presentation/board-read-view'
import { UserResponse } from '@/modules/user/application/response/user-response'


@Controller('v1')
export class BoardCreateController {
  constructor(
    private creator: BoardCreateUseCase
  ) {}

  @Post('board')
  @ValidateWith(boardPayloadValidationSchema)
  @UseGuards(JwtAccessTokenGuard)
  async invoke(
    @Body() body: BoardCreatePayload, 
    @Req() req: Request
  ): Promise<Result> {
    try {
      const user = req?.user as UserResponse
      const board = await this.creator.dispatch(body, user.id)
      const result = new BoardReadView(board)
      return result      
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException()
      }
      
      throw new InternalServerErrorException()
    }
  }
}