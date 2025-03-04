import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common'

import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'
import { type RegisterPayload, registerPayloadSchema } from '@/modules/auth/adapters/dtos/register-payload'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'

import { RegisterUseCase } from '@/modules/auth/application/register/register-use-case'
import { Result } from '@/common/domain/identity/result'

@Controller('auth')
export class RegisterController {
  constructor(
		private register: RegisterUseCase
	) {}

  @Post('register')
	@ValidateWith(registerPayloadSchema)
	async invoke(@Body() body: RegisterPayload) {
		try {
			const { accessToken, refreshToken } = await this.register.dispatch(body)
			return Result.success({ accessToken, refreshToken })
		} catch (error: any) {
			if (error instanceof BadRequestError) {
				throw new BadRequestException(error.message)
			}

			throw new InternalServerErrorException(error.message)
		}
	}
}