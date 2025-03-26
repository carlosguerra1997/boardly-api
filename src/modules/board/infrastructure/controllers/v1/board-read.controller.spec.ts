import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardNotFoundException } from '@/modules/board/application/exceptions/BoardNotFoundException'
import { BoardReadUseCase } from '@/modules/board/application/reader/board-read-use-case'

import { BoardReadController } from '@/modules/board/infrastructure/controllers/v1/board-read.controller'

import { BoardReadView } from '@/modules/board/presentation/board-read-view'

import { getBoardFixtures } from '@/tests/fixtures/board-fixture'

describe('Board read controller suite test', () => {
  let controller: BoardReadController
  let readerMock: BoardReadUseCase

  beforeEach(() => {
    readerMock = { 
      dispatch: vi.fn() 
    } as unknown as BoardReadUseCase

    controller = new BoardReadController(readerMock)
  })

  it('Should return a Result instance when board is found', async () => {
    const boardsMock = getBoardFixtures()
    vi.spyOn(readerMock, 'dispatch').mockResolvedValue(boardsMock[0])

    const boardId = 'board-id-1'
    const result = await controller.invoke(boardId)

    const expectedResult = {
      id: 'board-id-1',
      name: 'Testing board 1',
      description: 'This is a description for testing board 1',
      status: 'active',
      visibility: 'private'
    }

    expect(result).toBeInstanceOf(BoardReadView)
    expect(result.data).toEqual(expectedResult)
  })

  it('Shoudl call reader dispatch method with correct board id', async () => {
    const boardsMock = getBoardFixtures()
    vi.spyOn(readerMock, 'dispatch').mockResolvedValue(boardsMock[0])

    const boardId = 'board-id-1'
    await controller.invoke(boardId)

    expect(readerMock.dispatch).toHaveBeenCalledWith(boardId)
    expect(readerMock.dispatch).toHaveBeenCalledTimes(1)
  })

  it('Should throw NotFoundException when board is not found', async () => {
    vi.spyOn(readerMock, 'dispatch').mockRejectedValue(new BoardNotFoundException())

    const boardId = 'board-id-3'
    await controller
      .invoke(boardId)
      .catch(error => {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toBe('Board not found')
      })
  })

  it('Should throw InternalServerErrorException when unexpected error occurs', async () => {
    vi.spyOn(readerMock, 'dispatch').mockRejectedValue(new Error('Unexpected error'))

    const boardId = 'board-id-1'
    await controller
      .invoke(boardId)
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error')
      }
    )
  })
})