import { ListQuery } from '@/common/domain/identity/list/list-query'
import { StoredRepository } from '@/common/domain/identity/stored-repository'

export interface ListRepository<T> extends StoredRepository<T> {
  obtainById(id: string): Promise<T | null>
  obtainByQuery(query: ListQuery): Promise<T[]>
}