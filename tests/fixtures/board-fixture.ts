import { Board } from '@/modules/board/domain/board'

export const getBoardFixtures = (): Board[] => {
  const boards: Board[] = []

  const boardOne = new Board(
    'board-id-1',
    'Testing board 1',
    'This is a description for testing board 1',
    'active',
    1742384328
  )

  const boardTwo = new Board(
    'board-id-2',
    'Testing board 2',
    '',
    'active',
    1724374253
  )

  boards.push(boardOne)
  boards.push(boardTwo)

  return boards
}