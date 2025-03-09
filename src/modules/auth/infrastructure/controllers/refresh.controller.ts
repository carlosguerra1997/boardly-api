import { Controller, Post, UseGuards, Req, UnauthorizedException, Inject, InternalServerErrorException } from '@nestjs/common'

import { UnauthorizedError } from '@/common/domain/identity/exception/unauthorized-error'

import { RefreshUserCase } from '@/modules/auth/application/refresh/refresh-use-case'

import { JwtRefreshTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-refresh-token.guard'
import { Result } from '@/common/domain/identity/result'

@Controller()
export class RefreshController {
  constructor(
    private readonly refresher: RefreshUserCase
  ) {}

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  async invoke(@Req() request: any): Promise<Result> {
    try {
      const userId = request.user.userId
      const refreshToken = request.cookies.refreshToken

      const accessToken = await this.refresher.dispatch(userId, refreshToken) 

      const result = Result.success({ accessToken })
      return result
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException()
      }

      throw new InternalServerErrorException()
    }
  }
}