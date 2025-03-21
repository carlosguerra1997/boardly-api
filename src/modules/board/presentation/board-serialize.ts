import { BoardResponse } from '@/modules/board/application/response/board-response'

interface BoardItemReadView {
  id: string
  name: string
  description: string
  visibility: string
  status: string
}

export const boardSerialize = (item: BoardResponse): BoardItemReadView =>  {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    visibility: item.visibility,
    status: item.status
  }
}