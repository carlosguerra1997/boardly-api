import { ListQueryPayload } from '@/common/domain/identity/list/list-query-payload'

export interface BoardQueryPayload extends ListQueryPayload {
  status?: string
  visibility?: string
}