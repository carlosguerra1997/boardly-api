import { Board } from '@/modules/board/domain/board'

interface BoardItemReadView {
  id: string
  name: string
  description: string
}

export const boardSerialize = (item: Board): BoardItemReadView =>  {
  return {
    id: item.getId(),
    name: item.getName(),
    description: item.getDescription()
  }
}