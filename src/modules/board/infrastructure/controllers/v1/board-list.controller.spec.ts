import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardListUseCase } from '@/modules/board/application/lister/board-list-use-case'

import { BoardListController } from '@/modules/board/infrastructure/controllers/v1/board-list.controller'

import { BoardListView } from '@/modules/board/presentation/board-list-view'

import { getBoardFixtures } from '@/tests/fixtures/board-fixture'
import { BoardQueryPayload } from '@/modules/board/application/lister/board-query-payload'
import { InternalServerErrorException } from '@nestjs/common'

describe('Board list controller test suite', () => {
  let controller: BoardListController
  let listerMock: BoardListUseCase

  beforeEach(() => {
    listerMock = {
      dispatch: vi.fn()
    } as unknown as BoardListUseCase

    controller = new BoardListController(listerMock)
  })

  it('Should return a list of boards', async () => {
    const boardsMock = getBoardFixtures()
    vi.spyOn(listerMock, 'dispatch')
      .mockResolvedValue(boardsMock)

    const result = await controller.invoke({})

    expect(listerMock.dispatch).toHaveBeenCalled()
    expect(result).toBeInstanceOf(BoardListView)
    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(2)
    expect(result.data[1].name).toBe('Testing board 2')
  })

  it('Should call lister dispatch function with correct query parameters', async () => {
    const boardsMock = getBoardFixtures()
    vi.spyOn(listerMock, 'dispatch')
      .mockResolvedValue(boardsMock)

    const query: BoardQueryPayload = { status: 'active', visibility: 'private' }
    await controller.invoke(query)

    expect(listerMock.dispatch).toHaveBeenCalledWith(query)
  })

  it('Should throw InternalServerException if use case throws unexpected error', async () => {  
    vi.spyOn(listerMock, 'dispatch')
      .mockRejectedValue(new Error('Unexpected error'))

    await controller.invoke({})
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error') 
      })
  })
})