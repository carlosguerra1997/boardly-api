import { ListRepositoryStub } from '@/tests/doubles/persistence/common/list-repository-stub'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

export class BoardRepositoryStub
  extends ListRepositoryStub<Board>
  implements BoardRepository
{
  constructor() {
    super()
  }
}