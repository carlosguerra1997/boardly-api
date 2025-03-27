import { Result } from '@/common/presentation/result'

import { Board } from '@/modules/board/domain/board'

import { boardSerialize } from '@/modules/board/presentation/board-serialize'

export class BoardListView extends Result {
  constructor(items: Board[]) {
    super(Result.successMessage)
    this.data = items.map(board => boardSerialize(board))
  }
}