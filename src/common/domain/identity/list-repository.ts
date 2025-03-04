import { StoredRepository } from '@/common/domain/identity/stored-repository'

export interface ListRepository<T> extends StoredRepository<T> {
  obtainById(id: string): Promise<T>
  obtainByQuery(query?: any): Promise<T[]>
}