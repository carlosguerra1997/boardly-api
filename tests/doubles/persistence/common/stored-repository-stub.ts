import { StoredRepository } from '@/common/domain/identity/stored-repository'

export class StoredRepositoryStub<T>
  implements StoredRepository<T> 
{
  public error: string = ''

  public stored: T | undefined
  public removed: T | undefined

  protected repositoryData: Map<string, T>

  constructor() {
    this.repositoryData = new Map<string, T>
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

  protected add(key: string, item: T): void {
    this.repositoryData.set(key, item)
  }

  protected throwError(): void {
    if (!this.error) {
      return
    }

    throw new Error(this.error)
  }
}