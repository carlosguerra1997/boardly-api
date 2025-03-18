import { StoredRepositoryStub } from '@/tests/doubles/persistence/common/stored-repository-stub'

import { ListRepository } from '@/common/domain/identity/list-repository'

export class ListRepositoryStub<T> 
  extends StoredRepositoryStub<T> 
  implements ListRepository<T>
{
  constructor() {
    super()
  }

  async obtainById(id: string): Promise<T | null> {
    return null
  }

  async obtainByQuery(query?: any): Promise<T[]> {
    return []
  }
}