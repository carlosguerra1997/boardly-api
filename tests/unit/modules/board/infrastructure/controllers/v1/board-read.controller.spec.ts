import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { beforeEach, describe, expect, it } from 'vitest'

import { BoardReadUseCase } from '@/modules/board/application/reader/board-read-use-case'
import { BoardReadController } from '@/modules/board/infrastructure/controllers/v1/board-read.controller'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'

describe('Board read controller suite test', () => {
  let repo: BoardRepositoryStub
  let creator: BoardReadUseCase
  let controller: BoardReadController

  beforeEach(() => {
    repo = new BoardRepositoryStub()
    creator = new BoardReadUseCase(repo)
    controller = new BoardReadController(creator)
  })

  it('Should return the board', async () => {
    const result = await controller.invoke('board-id-1')

    expect(result.message).toBe('success')
    expect(result.data.name).toBe('Testing board 1')
    expect(result.data.description).toBe('This is a description for testing board 1')
  })

  it('Should throw NotFoundException when Board ID not found', async () => {
    await controller
      .invoke('board-id-3')
      .catch(error => {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toBe('Board not found')
      })
  })

  it('Should throw InternalServerException when unexpected error', async () => {
    repo.error = 'Unexpected error'
  
    await controller
      .invoke('board-id-1')
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error')
      })
  })
})
