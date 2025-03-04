import { Controller, Post, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common'

import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'

import { type LoginPayload, loginPayloadSchema } from '@/modules/auth/adapters/dtos/login-payload'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'

import { LoginUseCase } from '@/modules/auth/application/login/login-use-case'

@Controller('auth')
export class LoginController {
  constructor(
    private login: LoginUseCase
  ) {}

  @Post('login')
  @ValidateWith(loginPayloadSchema)
  async invoke(@Body() body: LoginPayload) {
    try {
      const tokens = await this.login.dispatch(body)
      return { tokens }
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw new BadRequestException(error.message)
      }

      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}