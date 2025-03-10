import { Result } from '@/common/domain/identity/result'

import { BoardResponse } from '@/modules/board/application/response/board-response'
import { boardSerialize } from '@/modules/board/presentation/board-serialize'

export class BoardReadView extends Result {
  constructor(board: BoardResponse) {
    super(Result.successMessage)
    this.data = boardSerialize(board)
  }
}