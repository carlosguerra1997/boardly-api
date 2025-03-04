import { Injectable } from '@nestjs/common'

import { CacheStored } from '@/common/domain/cache/cache-stored'

@Injectable()
export class RedisAuth {
  constructor(private readonly client: CacheStored) {}

  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.client.set(`${userId}:refreshToken`, refreshToken, 3000)
  }
}