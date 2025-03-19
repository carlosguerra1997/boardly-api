import { StoredRepository } from '@/common/domain/identity/stored-repository'

import { ErrorRepositoryStub } from '@/tests/doubles/common/error-repository-stub'

export class StoredRepositoryStub<T>
  extends ErrorRepositoryStub
  implements StoredRepository<T> 
{
  public stored: T | undefined
  public removed: T | undefined

  protected repositoryData: Map<string, T>

  constructor() {
    super()

    this.repositoryData = new Map<string, T>
  }

  protected add(key: string, item: T): void {
    this.repositoryData.set(key, item)
  }

  async save(element: T): Promise<T> {
    this.throwError()
    this.stored = element
    return element
  }

  async remove(element: T): Promise<void> {
    this.throwError()
    this.removed = element  
  }
}