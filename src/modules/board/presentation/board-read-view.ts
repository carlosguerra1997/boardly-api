import { Result } from '@/common/domain/identity/result'

import { Board } from '@/modules/board/domain/board'
import { boardSerialize } from '@/modules/board/presentation/board-serialize'

export class BoardReadView extends Result {
  constructor(board: Board) {
    super(Result.successMessage)
    this.data = boardSerialize(board)
  }
}