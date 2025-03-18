import { StoredRepository } from "@/common/domain/identity/stored-repository";

export class StoredRepositoryStub<T> implements StoredRepository<T> {
  public stored: T | undefined
  public removed: T | undefined

  protected repositoryData: Map<string, T>

  constructor() {
    this.repositoryData = new Map<string, T>
  }

  async save(element: T): Promise<T> {
    this.stored = element
    return element
  }

  async remove(element: T): Promise<void> {
    this.removed = element  
  }
}