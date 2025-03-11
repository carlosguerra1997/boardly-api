import { Inject, Injectable } from '@nestjs/common'

import { RegisterPayload } from '@/modules/auth/application/register/register-payload'

import { CacheStored } from '@/common/domain/cache/cache-stored'
import { IdGenerator } from '@/common/domain/identity/id-generator'
import { TokenGenerator } from '@/common/domain/identity/token-generator'
import { Hasher } from '@/common/domain/identity/hasher'

import { UserRepository } from '@/modules/user/domain/user-repository'

import { UserRequest } from '@/modules/user/application/request/user-request'

import { UserAlreadyExistException } from '@/modules/user/application/exceptions/user-already-exist-exception'

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(CacheStored) private cacheRepository: CacheStored,
    @Inject(Hasher) private hasher: Hasher,
    @Inject(IdGenerator) private idGenerator: IdGenerator,
    @Inject(TokenGenerator) private jwtService: TokenGenerator,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {}

  async dispatch(payload: RegisterPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const { username, email, password } = payload

    await this.checkUserAlreadyExist(username, email)

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hasher.hash(password)

    const request = new UserRequest(id, username, email, hashedPassword)
    const user = request.make()

    await this.userRepo.save(user)

    const { accessToken, refreshToken } = await this.jwtService.generate(id)
    const refreshHashed = await this.hasher.hash(refreshToken)
    await this.cacheRepository.set(`${user.getId()}:refreshToken`, refreshHashed)

    return { accessToken, refreshToken }
  }

  private async checkUserAlreadyExist(username: string, email: string): Promise<void> {
    const exist = await this.userRepo.searchDuplicate({ username, email })
    if (exist) {
      throw new UserAlreadyExistException()
    }
  }
}