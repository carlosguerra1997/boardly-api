import { Controller, Post, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common'

import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'
import { Result } from '@/common/presentation/result'

import { LoginUseCase } from '@/modules/auth/application/login/login-use-case'
import { type LoginPayload, loginPayloadSchema } from '@/modules/auth/application/login/login-payload'

@Controller()
export class LoginController {
  constructor(
    private login: LoginUseCase
  ) {}

  @Post('login')
  @ValidateWith(loginPayloadSchema)
  async invoke(@Body() body: LoginPayload): Promise<Result> {
    try {
      const { accessToken, refreshToken } = await this.login.dispatch(body)
      return Result.success({ accessToken, refreshToken })
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestException(error.message)
      }

      throw new InternalServerErrorException()
    }
  }
}