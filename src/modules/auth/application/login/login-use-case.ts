import { Inject, Injectable } from '@nestjs/common'

import { Hasher } from '@/common/domain/identity/hasher.interface'

import { InvalidCredentialsException } from '@/modules/auth/application/exceptions/invalid-credentials-exception'
import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt-token-generator.service'
import { LoginPayload } from '@/modules/auth/adapters/dtos/login-payload'
import { TokenGenerator } from '@/modules/auth/ports/token-generator.interface'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(Hasher) private hasher: Hasher,
    @Inject(TokenGenerator) private jwtService: JwtService,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {}

  async dispatch(payload: LoginPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const { email, password } = payload

    const user = await this.checkUserExist(email)
    const isValidPassword = await this.hasher.compare(user.getPassword(), password)
    if (!isValidPassword) {
      throw new InvalidCredentialsException()
    }

    const { accessToken, refreshToken } = await this.jwtService.generate(user.getId())

    // Setting in Redis the refresh token

    return { accessToken, refreshToken }
  }

  private async checkUserExist(email: string): Promise<User> {
    const user = await this.userRepo.obtainByEmail(email)
    if (!user) {
      throw new InvalidCredentialsException()
    }

    return user
  }
}