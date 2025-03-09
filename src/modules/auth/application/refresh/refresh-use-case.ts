import { Inject, Injectable } from '@nestjs/common'

import { CacheStored } from '@/common/domain/cache/cache-stored'
import { Hasher } from '@/common/domain/identity/hasher'
import { TokenGenerator } from '@/common/domain/identity/token-generator'

import { UnauthorizedException } from '@/modules/auth/application/exceptions/unauthorized-exception'

@Injectable()
export class RefreshUserCase {
  constructor(
    @Inject(CacheStored) private cacheRepository: CacheStored,
    @Inject(Hasher) private hasher: Hasher,
    @Inject(TokenGenerator) private jwtService: TokenGenerator
  ) {} 

  async dispatch(userId: string, refreshToken: string): Promise<string> {
    const storedRefresh = await this.cacheRepository.get(`${userId}:refreshToken`)

    if (!storedRefresh) {
      throw new UnauthorizedException()
    }

    await this.compareRefresh(JSON.parse(storedRefresh), refreshToken)

    const accessToken = await this.jwtService.refresh(userId)
    return accessToken
  }

  private async compareRefresh(storedRefresh: string, refreshToken: string): Promise<void> {
    const isRefreshEqual = await this.hasher.compare(storedRefresh, refreshToken)
    if (!isRefreshEqual) {
      throw new UnauthorizedException()
    }
  }
}