import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'

import { Assembler } from '@/common/domain/identity/assembler'
import { ListRepository } from '@/common/domain/identity/list-repository'

export abstract class PostgresRepository<T, U extends ObjectLiteral> implements ListRepository<T> {
  protected constructor(
    protected readonly assembler: Assembler<T, U>,
    protected readonly repo: Repository<U>
  ) {}

  async obtainById(id: string): Promise<T | null> {
    const where: FindOptionsWhere<U> = { id } as any
    const item = await this.repo.findOne({ where })

    if (null === item) {
      return null
    }

    const entity = this.assembler.toEntity(item)
    return entity
  }

  async obtainByQuery(query?: any): Promise<T[]> {
    return []
  }

  async save(element: T): Promise<T> {
    const dbEntity = this.assembler.toDatabase(element)
    await this.repo.save(dbEntity)
    return element
  }

  async remove(element: T): Promise<void> {
    // 
  }
}