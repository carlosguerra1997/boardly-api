import { 
  FindManyOptions, 
  FindOperator, 
  FindOptionsOrder, 
  FindOptionsWhere, 
  ILike, 
  ObjectLiteral,
  Repository 
} from 'typeorm'

import { Assembler } from '@/common/domain/identity/assembler'
import { FilterType, ListFilter } from '@/common/domain/identity/list/list-filter'
import { ListRepository } from '@/common/domain/identity/list-repository'
import { ListQuery } from '@/common/domain/identity/list/list-query'

export abstract class PostgresRepository<T, U extends ObjectLiteral> implements ListRepository<T> {
  private options: FindManyOptions<U> = {}

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

  async obtainByQuery(query: ListQuery): Promise<T[]> {
    this.options = {
      skip: query.offset(),
      take: query.limit
    }

    this.addWhere(query)
    this.addSort(query)

    const items = await this.repo.find(this.options)
    const entities = items.map(item => this.assembler.toEntity(item))

    console.log(entities);

    return entities
  }

  async save(element: T): Promise<T> {
    const dbEntity = this.assembler.toDatabase(element)
    await this.repo.save(dbEntity)
    return element
  }

  async remove(element: T): Promise<void> {
    // 
  }

  private addWhere(query: ListQuery): void {
    if (!query.hasFilters()) {
      return
    }

    const where: Record<string, string | FindOperator<string>> = {}
    for (const [, filter] of query.filters) {
      where[filter.name] = this.getFindOperator(filter)
    }

    this.options.where = where as FindOptionsWhere<U>
  }

  private addSort(query: ListQuery): void {
    const order: Record<string, string> = {}
    for (const [, sort] of query.sort) {
      order[sort.name] = sort.order
    }

    this.options.order = order as FindOptionsOrder<U>
  }

  private getFindOperator(filter: ListFilter): string | FindOperator<string> {
    switch(filter.type) {
      case FilterType.LIKE:
        return ILike(`${filter.value}%`)
      case FilterType.EQUAL:
        return filter.value
    }
  }
}