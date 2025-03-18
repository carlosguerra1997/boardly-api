import { type Request } from 'express'
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common'

import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'
import { Result } from '@/common/domain/identity/result'

import { JwtAccessTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-access-token.guard'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'
import { type BoardCreatePayload, boardCreatePayloadValidationSchema } from '@/modules/board/application/creator/board-create-payload'
import { UserResponse } from '@/modules/user/application/response/user-response'

import { BoardReadView } from '@/modules/board/presentation/board-read-view'

@Controller('v1')
export class BoardCreateController {
  constructor(
    private creator: BoardCreateUseCase
  ) {}

  @Post('board')
  @HttpCode(HttpStatus.CREATED)
  @ValidateWith(boardCreatePayloadValidationSchema)
  @UseGuards(JwtAccessTokenGuard)
  async invoke(
    @Body() body: BoardCreatePayload, 
    @Req() req: Request
  ): Promise<Result> {
    const user = req?.user as UserResponse

    try {
      const board = await this.creator.dispatch(body, user.id)
      const result = new BoardReadView(board)
      return result      
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestException(error.message)
      }
      
      throw new InternalServerErrorException()
    }
  }
}