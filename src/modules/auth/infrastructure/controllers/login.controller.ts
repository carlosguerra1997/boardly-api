import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common'

import { type LoginPayload } from '@/modules/auth/adapters/dtos/login-payload'

import { loginPayloadSchema } from '@/modules/auth/adapters/dtos/login-payload-schema'
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
      throw new InternalServerErrorException()
    }
  }
}