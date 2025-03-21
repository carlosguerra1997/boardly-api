import { Board } from '@/modules/board/domain/board'
import { BoardStatus } from '@/modules/board/domain/board-status'
import { BoardVisibility } from '@/modules/board/domain/board-visibility'

export const getBoardFixtures = (): Board[] => {
  const boards: Board[] = []

  const visibility = getBoardVisibilityFixture()
  const status = getBoardStatusFixture()

  const boardOne = new Board(
    'board-id-1',
    'Testing board 1',
    'This is a description for testing board 1',
    visibility,
    status,
    1742384328
  )

  const boardTwo = new Board(
    'board-id-2',
    'Testing board 2',
    '',
    visibility,
    status,
    1724374253
  )

  boards.push(boardOne)
  boards.push(boardTwo)

  return boards
}

const getBoardVisibilityFixture = (): BoardVisibility => {
  return new BoardVisibility('private')
}

const getBoardStatusFixture = (): BoardStatus => {
  return new BoardStatus('active')
}