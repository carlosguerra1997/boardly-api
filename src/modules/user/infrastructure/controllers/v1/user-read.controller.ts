import { Controller, Get, InternalServerErrorException, NotFoundException, Param, UseGuards } from '@nestjs/common'

import { NotFoundError } from '@/common/domain/identity/exception/not-found-error'
import { Result } from '@/common/domain/identity/result'

import { JwtAccessTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-access-token.guard'

import { UserRead } from '@/modules/user/application/reader/user-read'
import { UserReadView } from '@/modules/user/presentation/v1/user-read-view'

@Controller('v1/user')
export class UserReadController {
  constructor(
    private reader: UserRead
  ) {}

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard)
  async invoke(@Param('id') id: string): Promise<Result> {
    try {
      const user = await this.reader.dispatch(id)
      const result = new UserReadView(user)
      return result
    } catch (error) {
      console.log('Pero aqui no entro')

      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      }

      throw new InternalServerErrorException()
    }
  }
}