import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common'

import { BadRequestError } from '@/common/domain/identity/exception/bad-request-error'
import { ValidateWith } from '@/common/infrastructure/decorators/validate-with.decorator'
import { Result } from '@/common/presentation/result'

import { type RegisterPayload, registerPayloadSchema } from '@/modules/auth/application/register/register-payload'
import { RegisterUseCase } from '@/modules/auth/application/register/register-use-case'

@Controller()
export class RegisterController {
  constructor(
		private register: RegisterUseCase
	) {}

  @Post('register')
	@ValidateWith(registerPayloadSchema)
	async invoke(@Body() body: RegisterPayload): Promise<Result> {
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