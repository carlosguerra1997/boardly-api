import { Board } from '@/modules/board/domain/board'
import { BoardStatus, BoardStatusType } from '@/modules/board/domain/board-status'
import { BoardVisibility } from '@/modules/board/domain/board-visibility'

export const getBoardFixtures = (): Board[] => {
  const visibility = getBoardVisibilityFixture()

  const activeStatus = getBoardStatusFixture()
  const archivedStatus = getBoardStatusFixture('archived')

  const boardOne = new Board(
    'board-id-1',
    'Testing board 1',
    'This is a description for testing board 1',
    visibility,
    activeStatus,
    Date.now()
  )

  const boardTwo = new Board(
    'board-id-2',
    'Testing board 2',
    '',
    visibility,
    archivedStatus,
    new Date('2025-01-01').getTime()
  )

  return [ boardOne, boardTwo ]
}

const getBoardVisibilityFixture = (): BoardVisibility => {
  return new BoardVisibility('private')
}

const getBoardStatusFixture = (status: BoardStatusType = 'active'): BoardStatus => {
  return new BoardStatus(status)
}