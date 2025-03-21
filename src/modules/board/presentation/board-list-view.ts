import { Result } from '@/common/domain/identity/result'

import { BoardResponse } from '@/modules/board/application/response/board-response'

import { boardSerialize } from '@/modules/board/presentation/board-serialize'

export class BoardListView extends Result {
  constructor(items: BoardResponse[]) {
    super(Result.successMessage)
    this.data = items.map(board => boardSerialize(board))
  }
}