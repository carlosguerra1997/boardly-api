import { Injectable } from '@nestjs/common'

import { LoginPayload } from '@/modules/auth/adapters/dtos/login-payload'

import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt.service'

@Injectable()
export class LoginUseCase {
  constructor(
    private jwtSercice: JwtService
  ) {}

  async dispatch(login: LoginPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const { email, password } = login

    const user = ['carlos'].find(user => user === 'carlos')
    if (!user) {
      // Throw exception
    }

    const { accessToken, refreshToken } = await this.jwtSercice.generateTokens({ email, password})
    return { accessToken, refreshToken }
  }
}