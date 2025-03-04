import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

import { CacheStored } from '@/common/domain/cache/cache-stored';
import { RedisClientException } from './redis-client-exception';

@Injectable()
export class RedisClient implements CacheStored {
  private readonly DEFAULT_TTL = 604800
  private client: Redis

  constructor() {
    this.client = new Redis({
      host: 'redis',
      port: 6379
    })
  }

  async set(key: string, value: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    try {
      await this.client.setex(key, ttl, JSON.stringify(value))
    } catch (error: any) {
      throw new RedisClientException(error.message)
    }
  }
  
  async get(key: string): Promise<any | null> {
    
  }

  async del(key: string): Promise<void> {
    
  }
}