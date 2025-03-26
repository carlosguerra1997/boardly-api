import { InternalServerErrorException } from '@nestjs/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'

import { BoardCreateController } from '@/modules/board/infrastructure/controllers/v1/board-create.controller'

import { BoardReadView } from '@/modules/board/presentation/board-read-view'

import { BoardPayloadMother } from '@/tests/mothers/board-payload-mother'
import { requestFixture } from '@/tests/fixtures/request-fixture'
import { getBoardFixtures } from '@/tests/fixtures/board-fixture'

describe('Board create controller test suite', () => {
  let controller: BoardCreateController
  let creatorMock: BoardCreateUseCase

  beforeEach(() => {
    creatorMock = {
      dispatch: vi.fn()
    } as unknown as BoardCreateUseCase

    controller = new BoardCreateController(creatorMock)
  })
  
  it('Should receive a BoardPayload and return a Result', async () => {
    const payload = BoardPayloadMother.create()
    const boardMock = getBoardFixtures()[0]

    vi.spyOn(creatorMock, 'dispatch').mockResolvedValue(boardMock)
    const result = await controller.invoke(payload, requestFixture)

    expect(result.message).toBe('success')
    expect(creatorMock.dispatch).toHaveBeenCalledWith(payload, 'test-id')
    expect(creatorMock.dispatch).toHaveBeenCalledTimes(1)
    expect(result).toBeInstanceOf(BoardReadView)
    expect(result.data.name).toBe('Testing board 1')
  })

  it('Should throw InternalServerException if use case throws unexpected error', async () => {
    const payload = BoardPayloadMother.create()

    vi
      .spyOn(creatorMock, 'dispatch')
      .mockRejectedValue(new Error('Unexpected error'))

    await controller
      .invoke(payload, requestFixture)
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error') 
      })
  })
})