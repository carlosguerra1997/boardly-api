import { Inject, Injectable } from '@nestjs/common'

import { RegisterPayload } from '@/modules/auth/adapters/dtos/register-payload'

import { IdGenerator } from '@/common/domain/identity/id-generator.interface'
import { TokenGenerator } from '@/modules/auth/ports/token-generator.interface'
import { Hasher } from '@/common/domain/identity/hasher.interface'

import { UserRepository } from '@/modules/user/domain/user-repository'

import { UserRequest } from '@/modules/user/application/request/user-request'
import { CacheStored } from '@/common/domain/cache/cache-stored'

import { UserAlreadyExistException } from '@/modules/user/application/exceptions/user-already-exist-exception'

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(Hasher) private hasher: Hasher,
    @Inject(IdGenerator) private idGenerator: IdGenerator,
    @Inject(TokenGenerator) private jwtService: TokenGenerator,
    @Inject(CacheStored) private cacheRepository: CacheStored,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {}

  async dispatch(payload: RegisterPayload): Promise<{ accessToken: string, refreshToken: string }> {
    const { username, email, password } = payload

    await this.checkUserAlreadyExist(username, email)

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hasher.hash(password)

    const user = UserRequest.create(id, username, email, hashedPassword)
    await this.userRepo.save(user)

    const { accessToken, refreshToken } = await this.jwtService.generate(id)
    await this.cacheRepository.set(`${user.getId()}:refreshToken`, refreshToken)

    return { accessToken, refreshToken }
  }

  private async checkUserAlreadyExist(username: string, email: string): Promise<void> {
    const exist = await this.userRepo.searchDuplicate({ username, email })
    if (exist) {
      throw new UserAlreadyExistException()
    }
  }
}