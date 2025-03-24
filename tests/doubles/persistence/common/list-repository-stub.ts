import { StoredRepositoryStub } from '@/tests/doubles/persistence/common/stored-repository-stub'


import { FilterType } from '@/common/domain/identity/list/list-filter'
import { ListRepository } from '@/common/domain/identity/list-repository'
import { ListQuery } from '@/common/domain/identity/list/list-query'

export class ListRepositoryStub<T> 
  extends StoredRepositoryStub<T> 
  implements ListRepository<T>
{

  public list: T[] = []
  public read: T | null = null
  public query: ListQuery;

  constructor() {
    super()
    this.query = new ListQuery()
  }

  async obtainById(id: string): Promise<T | null> {
    this.throwError()

    const item = this.get(id)
    if (!item) {
      return null
    }

    this.read = item
    return this.read
  }

  async obtainByQuery(query: ListQuery): Promise<T[]> {
    this.throwError()
    this.query = query

    this.sort()
    if (query.hasFilters()) {
      this.filter()
    }
    
    return this.list
  }

  public get(key: string, add: boolean = false): T | null {
    const item = this.repositoryData.get(key)

    if (!item) {
      return null
    }

    if (add) {
      this.read = item
    }

    return item
  }

  public all(): void {
    const data: T[] = Array.from(this.repositoryData.values())
    this.list = data
  }

  private sort(): void {
    for (const [, field] of this.query.sort) {
      const { name, order } = field

      this.list.sort((a: any, b: any) => {
        const aValue = a[name]
        const bValue = b[name]

        if (order === 'asc') {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
        }
        
        if (order === 'desc') {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
        }

        return 0
      })
    }
  }

  private filter(): void {
    const queryValues = Array.from(this.query.filters.values())

    this.list = this.list.filter(item => {
      return queryValues.every(filter => {
        const { name, value, type } = filter
        const itemValue = this.getPropertyValue(item, name)

        if (type === FilterType.LIKE) {
          return itemValue.includes(value)
        }

        return itemValue === value
      })
    })
  }

  private getPropertyValue(item: any, name: string): any {
    const property = item[name]

    if (typeof property === 'string') {
      return property
    }

    return property[name]
  }
}