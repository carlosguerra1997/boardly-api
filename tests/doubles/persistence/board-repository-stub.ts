import { ListRepositoryStub } from '@/tests/doubles/persistence/common/list-repository-stub'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { IdGeneratorStub } from '@/tests/doubles/common/id-generator-stub'
import { getBoardFixtures } from '@/tests/fixtures/board-fixture'

export class BoardRepositoryStub
  extends ListRepositoryStub<Board>
  implements BoardRepository
{
  public static readonly BOARD_ID = 'board-id'

  public idGenerator: IdGeneratorStub

  constructor() {
    super()

    this.idGenerator = new IdGeneratorStub()
    this.makeData(getBoardFixtures())
  }

  protected makeData(boards: Board[]): void {
    for (const board of boards) {
      this.add(board.getId(), board)
    }
  }
}