export interface CacheStored {
  set(key: string, value: any, ttl?: number): Promise<void>
  get(key: string): Promise<any | null>
  del(key: string): Promise<void>
}

export const CacheStored = Symbol('CacheStored')