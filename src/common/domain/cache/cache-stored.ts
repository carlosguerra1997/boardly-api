export interface CacheStored {
  set(key: string, value: any, ttl?: number): Promise<void>
  get(key: string): Promise<string | null>
  del(key: string): Promise<void>
}

export const CacheStored = Symbol('CacheStored')