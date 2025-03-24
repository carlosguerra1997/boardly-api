import { Board } from '@/modules/board/domain/board'

interface BoardItemReadView {
  id: string
  name: string
  description: string
  visibility: string
  status: string
}

export const boardSerialize = (item: Board): BoardItemReadView =>  {
  return {
    id: item.getId(),
    name: item.getName(),
    description: item.getDescription(),
    visibility: item.getVisibility().getValue(),
    status: item.getStatus().getValue()
  }
}