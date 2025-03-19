import { StoredRepositoryStub } from '@/tests/doubles/persistence/common/stored-repository-stub'

import { ListRepository } from '@/common/domain/identity/list-repository'

export class ListRepositoryStub<T> 
  extends StoredRepositoryStub<T> 
  implements ListRepository<T>
{
  public read: T | null = null

  constructor() {
    super()
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

  async obtainById(id: string): Promise<T | null> {
    this.throwError()

    const item = this.get(id)
    if (!item) {
      return null
    }

    this.read = item
    return this.read
  }

  async obtainByQuery(query?: any): Promise<T[]> {
    return []
  }
}