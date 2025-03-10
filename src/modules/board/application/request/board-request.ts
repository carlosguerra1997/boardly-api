import { Board } from '@/modules/board/domain/board'

export class BoardRequest {
  constructor() {}

  public static create(
    id: string,
    name: string,
    description: string
  ) {
    return new Board(
      id,
      name,
      description
    )
  }
}