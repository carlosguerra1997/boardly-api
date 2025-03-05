import { Inject, Injectable } from '@nestjs/common'

import { Hasher } from '@/common/domain/identity/hasher'

import { CacheStored } from '@/common/domain/cache/cache-stored'

import { InvalidCredentialsException } from '@/modules/auth/application/exceptions/invalid-credentials-exception'
import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt-token-generator.service'
import { LoginPayload } from '@/modules/auth/adapters/dtos/login-payload'
import { TokenGenerator } from '@/common/domain/identity/token-generator'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(CacheStored) private cacheRepository: CacheStored,
    @Inject(Hasher) private hasher: Hasher,
    @Inject(TokenGenerator) private jwtService: JwtService,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {}

  async dispatch(payload: LoginPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const { email, password } = payload

    const user = await this.checkUserExist(email)
    await this.checkIsValidPassword(user, password)

    const { accessToken, refreshToken } = await this.jwtService.generate(user.getId())
    await this.cacheRepository.set(`${user.getId()}:refreshToken`, refreshToken)

    return { accessToken, refreshToken }
  }

  private async checkUserExist(email: string): Promise<User> {
    const user = await this.userRepo.obtainByEmail(email)
    if (!user) {
      throw new InvalidCredentialsException()
    }

    return user
  }

  private async checkIsValidPassword(user: User, password: string): Promise<void> {
    const isValidPassword = await this.hasher.compare(user.getPassword(), password)
    if (!isValidPassword) {
      throw new InvalidCredentialsException()
    }
  }
}