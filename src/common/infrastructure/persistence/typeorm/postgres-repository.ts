import { ObjectLiteral, Repository } from 'typeorm'

import { Assembler } from '@/common/domain/identity/assembler'
import { ListRepository } from '@/common/domain/identity/list-repository'

export abstract class PostgresRepository<T, U extends ObjectLiteral> implements ListRepository<T> {
  protected constructor(
    protected readonly assembler: Assembler<T, U>,
    protected readonly repo: Repository<U>
  ) {}

  async obtainById(id: string): Promise<T> {
    const element: T = null as any
    return element
  }

  async obtainByQuery(query?: any): Promise<T[]> {
    return []
  }

  async save(element: T): Promise<T> {
    const dbEntity = this.assembler.toDatabase(element)
    await this.repo.save(dbEntity)
    return element
  }

  async remove(element: T): Promise<T> {
    return element
  }
}