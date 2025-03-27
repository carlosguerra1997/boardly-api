import { ListRepositoryStub } from '@/tests/doubles/persistence/common/list-repository-stub'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { getBoardFixtures } from '@/tests/fixtures/board-fixture'

export class BoardRepositoryStub
  extends ListRepositoryStub<Board>
  implements BoardRepository
{
  public static readonly BOARD_ID_1 = 'board-id-1'
  public static readonly BOARD_ID_2 = 'board-id-2'

  constructor() {
    super()
    this.makeData(getBoardFixtures())
  }

  protected makeData(boards: Board[]): void {
    for (const board of boards) {
      this.add(board.getId(), board)
    }
  }
}