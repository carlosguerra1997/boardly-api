import { randomUUID } from 'crypto'

import { IdGenerator } from '@/common/domain/identity/id-generator'

export class CryptoIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID()
  }
}