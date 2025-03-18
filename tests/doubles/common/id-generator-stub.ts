import { IdGenerator } from '@/common/domain/identity/id-generator'

export class IdGeneratorStub implements IdGenerator {
  generate(): string {
    return '123456'
  }
}