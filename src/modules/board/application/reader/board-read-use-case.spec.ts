import { beforeEach, describe, expect, it } from 'vitest'

import { BoardNotFoundException } from '@/modules/board/application/exceptions/BoardNotFoundException'
import { BoardReadUseCase } from '@/modules/board/application/reader/board-read-use-case'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'

describe('board-read-use-case test suite', () => {
  let repo: BoardRepositoryStub
  let reader: BoardReadUseCase

  beforeEach(() => {
    repo = new BoardRepositoryStub()
    reader = new BoardReadUseCase(repo)
  })

  it('Should retrieve a board successfully when it exists', async () => {
    repo.get(BoardRepositoryStub.BOARD_ID_1)

    const board = await reader.dispatch(BoardRepositoryStub.BOARD_ID_1)
    
    expect(board).not.toBeNull()
    expect(board.getId()).toBe(BoardRepositoryStub.BOARD_ID_1)
    expect(board.getName()).toBe('Testing board 1')
  })

  it('Should throw BoardNotFoundException when board does not exist', async () => {
    await reader.dispatch('non-existing-id')
      .catch(error => {
        expect(error).toBeInstanceOf(BoardNotFoundException)
        expect(error.message).toBe('Board not found')
      })
  })
})