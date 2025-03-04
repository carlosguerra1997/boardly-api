import { randomUUID } from 'crypto'

import { IdGenerator } from '@/common/domain/identity/id-generator.interface'

export class CryptoIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID()
  }
}